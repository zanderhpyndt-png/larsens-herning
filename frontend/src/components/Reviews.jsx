import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/site";

export default function Reviews() {
  // Duplicate list for seamless marquee
  const track = [...reviews, ...reviews];

  return (
    <section
      id="anmeldelser"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="reviews-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
            Hvad gæsterne siger
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-neutral-50">
            Stemmer fra <span className="italic text-amber-400">stamgæsterne</span>
          </h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none" />

        <div className="flex gap-6 marquee-track w-max" data-testid="reviews-marquee">
          {track.map((r, i) => (
            <div
              key={i}
              className="w-[320px] md:w-[400px] shrink-0 glass rounded-3xl p-7 md:p-8 hover:border-amber-400/30 transition-colors duration-300"
              data-testid={`review-card-${i}`}
            >
              <Quote className="text-amber-400/40 mb-4" size={28} />
              <p className="font-display italic text-xl md:text-2xl text-neutral-100 leading-snug min-h-[80px]">
                "{r.quote}"
              </p>
              <div className="flex items-center justify-between mt-6 pt-5 border-t border-white/10">
                <div className="text-sm text-neutral-400">{r.author}</div>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, k) => (
                    <Star key={k} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
