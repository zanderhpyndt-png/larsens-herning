import { motion } from "framer-motion";
import { gallery } from "@/data/site";

const spanClass = {
  lg: "md:col-span-2 md:row-span-2 aspect-square",
  md: "aspect-[4/3]",
  sm: "aspect-square",
  tall: "md:row-span-2 aspect-[3/4] md:aspect-auto",
};

export default function Gallery() {
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
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
