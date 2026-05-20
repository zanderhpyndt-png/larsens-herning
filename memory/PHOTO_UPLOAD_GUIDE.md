# LARSEN — Photo Swap Guide

When you have real LARSEN photos, drop them into `/app/frontend/public/photos/` and update `/app/frontend/src/data/site.js`. Below is the priority order + style guidance.

## 🎯 What to shoot
iPhone is perfectly fine. Aim for **warm color grading, slight grain, mørke hjørner, lidt blur, overexposed neons, regnvåd refleksion** — not stock-perfect. Imperfections = cinematic.

| Slot | Current image | Replace with |
|---|---|---|
| **AboutTorben** | Real storefront (cropped portrait) | **Portræt af Torben** — warm café lighting, foran hylder/vin/chokolade, afslappet smil, mørk baggrund |
| **Hero** | VisitDenmark facade (real) | **Regnvåd facade om aftenen** — neon glow, refleksioner i asfalten, ingen biler/personer |
| **Atmosphere** | Stock dark cafe interior | **Candid indvendigt aftenfoto** — folk der hygger, varm belysning, blur i kanten |
| **Gallery (6 slots)** | Mix af real + stock | Closeups af **chokolade, vin, kaffe, lakrids, gavekurve**, plus candid hygge-billeder |
| **Stories (Café/Vin/Chokolade/Gaver/Hygge)** | Mix | En karakter-fyldt detail-shot per kategori |
| **Products** | Stock product photography | Egne produkt-closeups med varm color grading |

## 📁 How to swap

1. Place photos in `/app/frontend/public/photos/`. Use clear names:
   - `torben.jpg` → AboutTorben
   - `hero-rainy.jpg` → Hero background
   - `atmosphere-candid.jpg` → Atmosphere image
   - `gallery-1.jpg` … `gallery-6.jpg`
   - `story-cafe.jpg`, `story-vin.jpg`, `story-chokolade.jpg`, `story-gaver.jpg`, `story-hygge.jpg`
   - `product-chokolade.jpg`, `product-vin.jpg`, etc.

2. Edit `/app/frontend/src/data/site.js`:
   ```js
   export const images = {
     hero: "/photos/hero-rainy.jpg",
     atmosphere: "/photos/atmosphere-candid.jpg",
     torben: "/photos/torben.jpg",  // and re-enable in AboutTorben.jsx
     // ...
   };
   ```

3. In `/app/frontend/src/components/AboutTorben.jsx`, change `src={images.storefrontReal}` → `src={images.torben}` once `torben.jpg` exists.

## 🎨 Color grading recipe (optional)
The site already adds: warm radial amber overlay, film grain, vignette, contrast/saturation boost via CSS filter on AboutTorben. So you don't need pre-graded photos — natural warm-tone iPhone shots will look cinematic out of the box.

## 🤖 Hidden AI placeholder
The original AI-generated Torben portrait is kept privately at:
`/app/frontend/public/_private-torben-portrait.jpg`

It is NOT served publicly. Delete it whenever you want, or keep as fallback.
