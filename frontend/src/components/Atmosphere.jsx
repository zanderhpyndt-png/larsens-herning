import { motion } from "framer-motion";
import { Coffee, Wine, Sparkles } from "lucide-react";
import { images } from "@/data/site";

export default function Atmosphere() {
  return (
    <section
      id="atmosfaere"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="atmosphere-section"
    >
      <div className="light-leak bg-amber-500/15 w-[600px] h-[600px] top-[-100px] left-[-100px]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-14 md:gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-6">
            Atmosfæren
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-neutral-50 leading-[1.05]">
            En <span className="italic text-amber-400 text-glow-amber">skjult hygge-perle</span> midt i Herning
          </h2>
          <p className="mt-7 text-base md:text-xl text-neutral-300 font-light leading-relaxed max-w-lg">
            Hvor folk mødes over kaffe, søde sager og gode vibes. Et sted der føles som et lommerum væk fra byen — varmt, dæmpet og personligt.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            {[
              { icon: Coffee, label: "Late-night kaffe" },
              { icon: Wine, label: "Kuraterede vine" },
              { icon: Sparkles, label: "Unikke fund" },
            ].map((item, i) => (
              <div
                key={i}
                className="glass-light rounded-2xl p-4 text-center hover:border-amber-400/40 transition-all duration-300"
              >
                <item.icon className="text-amber-400 mx-auto mb-2" size={20} />
                <div className="text-[11px] uppercase tracking-wider text-neutral-300">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10">
            <img
              src={images.atmosphere}
              alt="Atmospheric interior of LARSEN cafe at night"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950/40 via-transparent to-amber-500/10" />
          </div>
          {/* Floating quote card */}
          <div className="absolute -bottom-8 -left-4 md:-left-12 max-w-xs glass rounded-2xl p-5 md:p-6">
            <div className="font-display italic text-lg md:text-xl text-neutral-100 leading-snug">
              "Det føles som at træde ind i en helt anden by."
            </div>
            <div className="text-[10px] uppercase tracking-eyebrow text-amber-400/80 mt-3">
              — Gæst i Herning
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
