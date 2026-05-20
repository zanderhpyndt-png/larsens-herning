// Centralized content & image map sourced from design_guidelines.json

export const images = {
  hero: "https://static.prod-images.emergentagent.com/jobs/d62b975d-86f1-4678-9c0e-112ebe16abbd/images/a87a31f1a689480fceb9227d7aba4d316d6d5738c16fc0cfa72e68ba3d752239.png",
  atmosphere: "https://static.prod-images.emergentagent.com/jobs/d62b975d-86f1-4678-9c0e-112ebe16abbd/images/b1f1a9fea453649b2334005cd58945b7f673a32168c36aea8439e79dc6c20822.png",
  chocolateWine: "https://static.prod-images.emergentagent.com/jobs/d62b975d-86f1-4678-9c0e-112ebe16abbd/images/099455278eba5fe613ce0d4afbfef4f836daff75c2ace2bd6e8684aaa177d354.png",
  beer: "https://images.pexels.com/photos/5659492/pexels-photo-5659492.jpeg",
  giftBasket: "https://images.pexels.com/photos/27393960/pexels-photo-27393960.jpeg",
  iceCream: "https://images.unsplash.com/photo-1766739347473-0036db7a8828",
  // Real LARSEN photos
  storefrontReal: "https://customer-assets.emergentagent.com/job_larsen-herning/artifacts/2nurby33_image.png",
  visitDenmark: "https://gdkfiles.visitdenmark.com/files/471/320316_Larsen-Herning-City---Foto-Herning-City---1024x576.jpg",
  voresBy: "https://assets.vorescdn.dk/vores-by/f2735d82-6f81-4e95-9180-4efd9103f901.jpg",
  // Generated cinematic portrait
  torbenPortrait: "/torben-portrait.jpg",
  // Cinematic accent shots
  gallery1: "https://static.prod-images.emergentagent.com/jobs/d62b975d-86f1-4678-9c0e-112ebe16abbd/images/bfdc18306883d10e3293029c17af0faf49a6d4bba3be4641e8a60f4fe451f1e2.png",
  gallery2: "https://images.pexels.com/photos/30749922/pexels-photo-30749922.jpeg",
  gallery3: "https://images.pexels.com/photos/66234/praline-chocolates-chocolate-chocolatier-66234.jpeg",
  gallery4: "https://images.unsplash.com/photo-1736154578145-3a57d1c4c9f8",
};

export const products = [
  {
    id: "chokolade",
    title: "Gourmet Chokolade",
    description: "Håndplukkede pralineer og bonbons fra Europas fineste chocolatiers.",
    image: images.chocolateWine,
    tag: "Bedst sælgende",
  },
  {
    id: "specialøl",
    title: "Specialøl",
    description: "Et nøje kurateret udvalg af mørke, stærke og lokale bryggerier.",
    image: images.beer,
    tag: "Lokalt udvalg",
  },
  {
    id: "vin",
    title: "Vin & Spiritus",
    description: "Naturvine, single malts og sjældne flasker til den gode aften.",
    image: images.gallery4,
    tag: "Kuraterede flasker",
  },
  {
    id: "is",
    title: "Is & Søde Sager",
    description: "Lokal kvalitetsis, lakrids og søde fristelser hele dagen.",
    image: images.iceCream,
    tag: "Daglig kølig favorit",
  },
  {
    id: "gavekurve",
    title: "Gavekurve",
    description: "Personligt sammensatte kurve — perfekte til vært, kollega eller dig selv.",
    image: images.giftBasket,
    tag: "Skreddersyet",
  },
];

export const reviews = [
  { quote: "Mega hyggeligt sted", author: "Sofie K.", rating: 5 },
  { quote: "Virkelig god service", author: "Mads H.", rating: 5 },
  { quote: "Perfekt til en rolig kaffe", author: "Line P.", rating: 5 },
  { quote: "Fantastisk udvalg af vin og chokolade", author: "Anders B.", rating: 5 },
  { quote: "En af Hernings hyggeligste butikker", author: "Camilla J.", rating: 5 },
];

export const gallery = [
  { src: images.voresBy, alt: "LARSEN butikken udefra", span: "lg" },
  { src: images.gallery1, alt: "Glowing orange neon sign", span: "md" },
  { src: images.gallery3, alt: "Macro praline chocolates", span: "sm" },
  { src: images.gallery2, alt: "Warm street cafe at night", span: "tall" },
  { src: images.chocolateWine, alt: "Chocolate and wine pairing", span: "md" },
  { src: images.gallery4, alt: "Wine bottle dark aesthetic", span: "sm" },
];

export const openingHours = [
  { day: "Mandag — Søndag", hours: "10:00 — 22:00" },
  { day: "Alle årets dage", hours: "Vi har altid åbent" },
];

export const socials = {
  facebook: "https://www.facebook.com/LarsenHerningCity",
  instagram: "#",
};

export const navLinks = [
  { id: "produkter", label: "Produkter" },
  { id: "atmosfaere", label: "Atmosfære" },
  { id: "om-os", label: "Om os" },
  { id: "anmeldelser", label: "Anmeldelser" },
  { id: "galleri", label: "Galleri" },
  { id: "kontakt", label: "Kontakt" },
];
