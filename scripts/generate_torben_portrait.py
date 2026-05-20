"""One-shot script to generate Torben portrait via Gemini Nano Banana.
Run with: cd /app/backend && python ../scripts/generate_torben_portrait.py
"""
import asyncio
import base64
import os
import sys
from pathlib import Path

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

# Load env from backend/.env
BACKEND_ENV = Path(__file__).resolve().parent.parent / "backend" / ".env"
load_dotenv(BACKEND_ENV)

OUTPUT_PATH = Path(__file__).resolve().parent.parent / "frontend" / "public" / "torben-portrait.jpg"

PROMPT = (
    "Cinematic premium editorial portrait photograph of a friendly Scandinavian shop "
    "owner in his late 40s, warm relaxed natural smile, soft authentic expression, "
    "wearing a casual dark wool sweater or button-up shirt. He is standing inside a "
    "cozy gourmet shop / wine bar at night, slightly off-center composition. "
    "Background is filled with softly out-of-focus shelves of wine bottles, "
    "artisan chocolate boxes and warm ambient bokeh — moody dark interior with "
    "amber neon and tungsten light glowing warmly on his face from the side, "
    "rim light separating him from the dark background. "
    "Shallow depth of field (85mm f/1.4 look), gentle film grain, subtle warm color "
    "grading, slight halation around highlights, deep blacks. "
    "High end Scandinavian luxury hygge aesthetic, reminiscent of Kinfolk magazine "
    "and Aesop campaign photography. Photorealistic, 4k, no text, no logos, no watermark."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        print("ERROR: EMERGENT_LLM_KEY missing in /app/backend/.env", file=sys.stderr)
        sys.exit(1)

    chat = LlmChat(
        api_key=api_key,
        session_id="larsen-torben-portrait",
        system_message="You generate cinematic premium editorial photography.",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"]
    )

    msg = UserMessage(text=PROMPT)
    text, images = await chat.send_message_multimodal_response(msg)
    print(f"Text response: {text[:200] if text else '(none)'}")

    if not images:
        print("ERROR: no image returned", file=sys.stderr)
        sys.exit(2)

    img = images[0]
    print(f"Got image mime: {img['mime_type']} (first 10 chars of data: {img['data'][:10]})")
    image_bytes = base64.b64decode(img["data"])
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_bytes(image_bytes)
    print(f"Saved → {OUTPUT_PATH}  ({len(image_bytes)} bytes)")


if __name__ == "__main__":
    asyncio.run(main())
