# LARSEN — Herning City Landing Page

## Original Problem Statement
Build an ultra-modern, cinematic landing page for LARSEN — Herning City (Bredgade 48, Herning, Denmark). A blend of luxury café, gourmet shop and late-night hangout. Sections: Hero, Featured products, Atmosphere, Reviews, Gallery, Location + opening hours, Footer. Aesthetic: dark mode, warm orange neon glow, glassmorphism, Apple-style animations, rainy Copenhagen night vibe, ambient particles, mouse glow, Scandinavian luxury + urban.

## User Choices
- Stock images from Unsplash/Pexels (provided via design_guidelines)
- Embedded Google Maps iframe (no API key)
- Placeholder opening hours (Man–Tor 10–22, Fre–Lør 10–24, Søn 12–20) — to be updated
- `#` placeholders for Instagram & Facebook
- Backend with newsletter + contact form persistence (MongoDB)

## Architecture
- **Backend** (FastAPI + Motor):
  - `POST/GET /api/newsletter` — email subscription (idempotent)
  - `POST/GET /api/contact` — contact messages (name, email, message)
  - `POST/GET /api/status` — health check
- **Frontend** (React 19 + framer-motion + Tailwind + lucide-react + sonner):
  - `pages/Landing.jsx` — composition root
  - `components/`: Loader, MouseGlow, Particles, Header, Hero, Products, Atmosphere, Reviews, Gallery, LocationHours, ContactNewsletter, Footer
  - `data/site.js` — content/image catalog
  - `lib/api.js` — axios wrapper using `REACT_APP_BACKEND_URL`

## What's Implemented (2026-05-20)
- Elegant loader with neon-flicker logo
- Sticky glassmorphism header with smooth scroll-spy + mobile hamburger
- Cinematic hero with rainy overlay + ambient particles + mouse glow
- 5 product cards (chokolade, specialøl, vin, is, gavekurve) with hover zoom
- Atmosphere split layout with floating quote card
- Infinite marquee for 5 customer reviews
- Bento gallery (asymmetric grid)
- Dark-styled Google Maps embed + address + opening hours
- Newsletter signup form (persists to MongoDB, success toast)
- Contact form (persists to MongoDB, success toast)
- Massive footer with social icons + nav + contact info
- 100% test coverage: 9/9 backend, all frontend flows verified

## Personas
- **Lokal i Herning** — vil finde et hyggeligt stamsted og kontakte LARSEN
- **Turist / Instagram-fan** — leder efter æstetik, billeder, location
- **Gave-køber** — vil bestille gavekurv eller specialprodukter

## Backlog
- **P1**: Send transactional email (Resend) when newsletter/contact form submits
- **P1**: Add real opening hours, real social URLs, real contact email
- **P2**: Add unique index on `newsletter.email`
- **P2**: prefers-reduced-motion handling for rain + scroll indicator
- **P2**: Replace stock images with real photography from LARSEN
- **P3**: Product detail pages or e-shop integration
- **P3**: Multi-language (DA + EN)
- **P3**: Instagram feed integration

## Next Tasks
- Collect from user: real opening hours, real social links, real contact email, real photography
- Optional: add admin dashboard to view newsletter subscribers + contact submissions
