# LARSEN — Herning City Landing Page

## Original Problem Statement
Cinematic boutique-hospitality landing page for LARSEN Herning City (Bredgade 48). Dark mode, warm orange neon glow, glassmorphism, Apple-style animations, rainy Copenhagen night vibe, ambient particles, mouse glow, Scandinavian luxury.

## User Choices Confirmed
- Unsplash + real LARSEN photos
- Google Maps iframe embed
- Real opening hours (10–22 alle årets dage)
- Real Facebook URL: facebook.com/LarsenHerningCity
- Backend with newsletter + contact persistence

## Architecture
- **Backend (FastAPI + Motor)**: `/api/newsletter`, `/api/contact`, `/api/status`
- **Frontend (React 19 + framer-motion + Tailwind)**: 
  - `pages/Landing.jsx` — composition
  - `components/`: Loader, Header, Hero, StoryHighlights, TonightAtLarsen, Products, Atmosphere, AboutTorben, Reviews, Gallery (lightbox+flash), LocationHours, ContactNewsletter, Footer, MouseGlow, Particles, AmbientSound, HyggeStatus, HyggeEasterEgg, WeatherSync
  - `lib/api.js`, `lib/vinylCrackle.js`
  - `data/site.js` — content + image catalog
  - `public/cafe-ambient.mp3`, `public/torben-portrait.jpg` (AI-generated)

## Implemented Features (2026-05-20)
### Day 1 — MVP
- Loader with letter-by-letter L·A·R·S·E·N reveal + film scratch + vignette
- Sticky glass header + smooth scroll-spy + mobile menu
- Cinematic hero with parallax background, amber glow, rainy overlay
- "Since 2020" badge in hero
- StoryHighlights (Café/Vin/Chokolade/Gaver/Hygge) with Instagram-style modal
- TonightAtLarsen daily-rotating recommendation
- Products bento grid (5 items)
- Atmosphere split layout
- AboutTorben section with AI-generated cinematic portrait
- Reviews infinite marquee
- Gallery bento grid + lightbox with camera flash
- LocationHours with dark-styled Google Maps
- Newsletter + contact forms (persists to MongoDB)
- Massive footer with "Vi ses hos LARSEN." quote
- Ambient café sound toggle + synthesized vinyl crackle layer
- HyggeStatus floating chip (time-based: morgenkaffe/eftermiddagshygge/aftenstemning/sene timer)
- HyggeEasterEgg: type "hygge" → bass hit + neon flicker + "Du fandt hyggen"
- WeatherSync: Open-Meteo API → adjusts rain intensity, neon brightness, sunset tint, wind drift via CSS data attrs
- Glass cards with condensation/fog overlay (SVG noise)
- btn-vibrate hover wobble on primary CTAs
- AI-generated Torben portrait (Gemini Nano Banana, premium hygge editorial)

## Personas
- Lokal i Herning, turist/Instagram-fan, gave-køber

## Backlog
- **P1**: Real Torben portrait (swap `/public/torben-portrait.jpg`)
- **P1**: Real Instagram URL (currently `#`)
- **P1**: Transactional email on newsletter/contact submit (Resend)
- **P2**: Live Instagram feed (requires Meta Graph API token + business verification)
- **P2**: Admin dashboard for newsletter + contact submissions
- **P2**: Unique index on newsletter.email
- **P2**: prefers-reduced-motion handling
- **P3**: Multi-language (DA + EN)
- **P3**: Product detail pages / e-shop

## Integrations
- Emergent Universal LLM Key in `/app/backend/.env` (used for one-shot Gemini Nano Banana portrait gen via `scripts/generate_torben_portrait.py`)
- Open-Meteo public API (no key, fetched client-side for Herning lat/lon)
- Google Maps embed iframe (no key)
