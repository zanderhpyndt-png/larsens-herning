import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { gallery } from "@/data/site";

const spanClass = {
  lg: "md:col-span-2 md:row-span-2 aspect-square",
  md: "aspect-[4/3]",
  sm: "aspect-square",
  tall: "md:row-span-2 aspect-[3/4] md:aspect-auto",
};

export default function Gallery() {
  const [active, setActive] = useState(null);
  const [flashKey, setFlashKey] = useState(0);

  const open = (i) => {
    setActive(i);
    setFlashKey((k) => k + 1);
  };
  const close = () => setActive(null);
  const next = () => {
    setFlashKey((k) => k + 1);
    setActive((a) => (a + 1) % gallery.length);
  };
  const prev = () => {
    setFlashKey((k) => k + 1);
    setActive((a) => (a - 1 + gallery.length) % gallery.length);
  };

  useEffect(() => {
    if (active === null) return;
    const handle = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <section
      id="galleri"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="gallery-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div>
            <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
              Galleri
            </div>
            <h2 className="font-display text-4xl md:text-6xl tracking-tight text-neutral-50">
              Et glimt af <span className="italic text-amber-400">aftenen</span>
            </h2>
          </div>
          <p className="text-neutral-400 max-w-sm font-light">
            Regnvåde gader, glødende neon og chokolade i closeup — atmosfæren fanget på film.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {gallery.map((item, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => open(i)}
              className={`relative overflow-hidden rounded-2xl group ${spanClass[item.span]}`}
              data-testid={`gallery-item-${i}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] bg-black/90 backdrop-blur-lg flex items-center justify-center p-6"
            onClick={close}
            data-testid="gallery-lightbox"
          >
            {/* Camera flash */}
            <div
              key={flashKey}
              className="absolute inset-0 bg-white flash-overlay pointer-events-none"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Luk"
              className="absolute top-6 right-6 w-11 h-11 glass-light rounded-full flex items-center justify-center text-white hover:bg-white/15 transition z-10"
              data-testid="lightbox-close"
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Forrige"
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-11 h-11 glass-light rounded-full flex items-center justify-center text-white hover:bg-white/15 transition z-10"
              data-testid="lightbox-prev"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Næste"
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-11 h-11 glass-light rounded-full flex items-center justify-center text-white hover:bg-white/15 transition z-10"
              data-testid="lightbox-next"
            >
              <ChevronRight size={20} />
            </button>

            <motion.div
              key={active}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={gallery[active].src}
                alt={gallery[active].alt}
                className="w-full h-full max-h-[85vh] object-contain rounded-2xl"
              />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] uppercase tracking-eyebrow text-neutral-300">
                <span>{gallery[active].alt}</span>
                <span>
                  {active + 1} / {gallery.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
