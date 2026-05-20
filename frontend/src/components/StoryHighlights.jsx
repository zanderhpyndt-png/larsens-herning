import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Wine, Sparkles, Gift, Heart } from "lucide-react";
import { images } from "@/data/site";

const highlights = [
  {
    id: "cafe",
    label: "Café",
    icon: Coffee,
    image: images.atmosphere,
    title: "Café-stemning",
    body: "Nybrygget kaffe, lune sandwiches og en plads hvor man bare bliver hængende. Vores café er hjertet i butikken.",
  },
  {
    id: "vin",
    label: "Vin",
    icon: Wine,
    image: images.gallery4,
    title: "Vine fra hele verden",
    body: "Naturvine, klassikere og sjældne flasker — håndplukket og smagt igennem. Spørg os om en anbefaling.",
  },
  {
    id: "chokolade",
    label: "Chokolade",
    icon: Sparkles,
    image: images.gallery3,
    title: "Håndlavet chokolade",
    body: "Pralineer, bonbons, lakrids og sæson-specialer. Vi fører kun chokolade vi selv ville give væk.",
  },
  {
    id: "gaver",
    label: "Gaver",
    icon: Gift,
    image: images.giftBasket,
    title: "Gavekurve der ligner en million",
    body: "Vi sammensætter kurve på stedet — fra små venlige hilsner til firma-gaver i kasser.",
  },
  {
    id: "hygge",
    label: "Hygge",
    icon: Heart,
    image: images.storefrontReal,
    title: "Hygge hele året",
    body: "Strikkeaftner, vinsmagninger, fødselsdage og bare-sidde-aftener. Vores dør er åben hver dag.",
  },
];

export default function StoryHighlights() {
  const [active, setActive] = useState(null);
  const story = active !== null ? highlights[active] : null;

  const next = () => setActive((a) => (a + 1) % highlights.length);
  const prev = () => setActive((a) => (a - 1 + highlights.length) % highlights.length);

  return (
    <section
      className="relative py-12 md:py-16"
      data-testid="story-highlights-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-eyebrow text-amber-400/70 mb-6 justify-center">
          <span className="h-px w-8 bg-amber-400/40" />
          Stories
          <span className="h-px w-8 bg-amber-400/40" />
        </div>
        <div className="flex items-center justify-center gap-5 md:gap-9 overflow-x-auto no-scrollbar pb-2">
          {highlights.map((h, i) => (
            <button
              key={h.id}
              onClick={() => setActive(i)}
              className="group flex flex-col items-center gap-2 shrink-0"
              data-testid={`story-highlight-${h.id}`}
            >
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-600 p-[2px] group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full bg-neutral-950" />
                </div>
                <div className="relative w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full overflow-hidden border border-neutral-950">
                  <img
                    src={h.image}
                    alt={h.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/40 to-transparent" />
                  <h.icon
                    size={16}
                    className="absolute bottom-2 right-2 text-amber-300 drop-shadow-[0_0_4px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>
              <span className="text-xs md:text-sm text-neutral-300 group-hover:text-amber-400 transition-colors">
                {h.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story modal */}
      <AnimatePresence>
        {story && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActive(null)}
            data-testid="story-modal"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-md aspect-[9/16] rounded-[2rem] overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/20" />

              {/* Progress bars */}
              <div className="absolute top-4 left-4 right-4 flex gap-1.5">
                {highlights.map((_, i) => (
                  <div key={i} className="flex-1 h-[2px] rounded-full bg-white/20 overflow-hidden">
                    <div
                      className={`h-full ${i === active ? "bg-amber-400 w-full" : i < active ? "bg-white/60 w-full" : "w-0"}`}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActive(null)}
                aria-label="Luk"
                className="absolute top-6 right-6 w-9 h-9 glass-light rounded-full flex items-center justify-center text-white hover:bg-white/20 transition"
                data-testid="story-close"
              >
                <X size={16} />
              </button>

              {/* Tap zones for next/prev */}
              <button
                aria-label="Forrige"
                onClick={prev}
                className="absolute left-0 top-12 bottom-32 w-1/3"
                data-testid="story-prev"
              />
              <button
                aria-label="Næste"
                onClick={next}
                className="absolute right-0 top-12 bottom-32 w-1/3"
                data-testid="story-next"
              />

              {/* Content */}
              <div className="absolute bottom-0 inset-x-0 p-8">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-eyebrow text-amber-300 mb-3">
                  <story.icon size={14} />
                  {story.label}
                </div>
                <h3 className="font-display text-3xl md:text-4xl text-neutral-50 leading-tight">
                  {story.title}
                </h3>
                <p className="mt-4 text-sm text-neutral-300 leading-relaxed">{story.body}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
