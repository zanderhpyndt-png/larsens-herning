"""LARSEN Herning - backend API tests.

Covers:
- GET /api/ health
- POST/GET /api/newsletter (valid, invalid, idempotency)
- POST/GET /api/contact (valid, invalid)
- Ensures MongoDB _id is not leaked in any response
"""
import os
import uuid
import pytest
import requests
from pathlib import Path
from dotenv import load_dotenv

# Load frontend .env to get the public backend URL (which is what users hit)
load_dotenv(Path(__file__).resolve().parents[2] / "frontend" / ".env")
BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Health ----------------
class TestHealth:
    def test_root(self, api_client):
        r = api_client.get(f"{API}/", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "LARSEN" in data["message"]
        assert data.get("status") == "online"
        assert "_id" not in data


# ---------------- Newsletter ----------------
class TestNewsletter:
    def test_subscribe_valid(self, api_client):
        email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        r = api_client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert "id" in data
        assert "subscribed_at" in data
        assert "_id" not in data

    def test_subscribe_invalid_email(self, api_client):
        r = api_client.post(f"{API}/newsletter", json={"email": "not-an-email"}, timeout=15)
        assert r.status_code == 422

    def test_subscribe_idempotent(self, api_client):
        email = f"test_dup_{uuid.uuid4().hex[:8]}@example.com"
        r1 = api_client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r1.status_code == 200
        first_id = r1.json()["id"]

        r2 = api_client.post(f"{API}/newsletter", json={"email": email}, timeout=15)
        assert r2.status_code == 200
        assert r2.json()["id"] == first_id
        assert r2.json()["email"] == email

    def test_list_newsletter(self, api_client):
        # Ensure at least one record exists
        email = f"test_list_{uuid.uuid4().hex[:8]}@example.com"
        api_client.post(f"{API}/newsletter", json={"email": email}, timeout=15)

        r = api_client.get(f"{API}/newsletter", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) > 0
        for rec in data:
            assert "_id" not in rec
            assert "id" in rec
            assert "email" in rec
        assert any(rec["email"] == email for rec in data)


# ---------------- Contact ----------------
class TestContact:
    def test_submit_valid(self, api_client):
        payload = {
            "name": "TEST_User",
            "email": f"test_{uuid.uuid4().hex[:8]}@example.com",
            "message": "Hej LARSEN, jeg vil gerne høre om gavekurve.",
        }
        r = api_client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["message"] == payload["message"]
        assert "id" in data and "created_at" in data
        assert "_id" not in data

    def test_submit_invalid_email(self, api_client):
        payload = {"name": "x", "email": "bad", "message": "hi"}
        r = api_client.post(f"{API}/contact", json=payload, timeout=15)
        assert r.status_code == 422

    def test_submit_missing_fields(self, api_client):
        r = api_client.post(f"{API}/contact", json={"name": "x"}, timeout=15)
        assert r.status_code == 422

    def test_list_contact(self, api_client):
        # Ensure at least one record exists
        payload = {
            "name": "TEST_List",
            "email": f"test_list_{uuid.uuid4().hex[:8]}@example.com",
            "message": "list-check",
        }
        api_client.post(f"{API}/contact", json=payload, timeout=15)

        r = api_client.get(f"{API}/contact", timeout=15)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) > 0
        for rec in data:
            assert "_id" not in rec
            assert "id" in rec
        assert any(rec["email"] == payload["email"] for rec in data)
