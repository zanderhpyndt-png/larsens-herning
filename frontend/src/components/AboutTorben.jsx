import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { images } from "@/data/site";

const milestones = [
  { year: "2020", text: "Startet af Torben Larsen" },
  { year: "Shop-i-shop", text: "Café · vin · chokolade · specialvarer" },
  { year: "Hver dag", text: "Personlig service & lokale vibes" },
];

export default function AboutTorben() {
  return (
    <section
      id="om-os"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="about-section"
    >
      {/* Soft orange glow behind the portrait */}
      <div className="light-leak bg-amber-500/30 w-[600px] h-[600px] top-[10%] left-[5%]" />
      <div className="light-leak bg-orange-500/15 w-[500px] h-[500px] bottom-[5%] right-[5%]" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 md:gap-16 items-center relative z-10">
        {/* Portrait / image */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative">
            {/* Glow halo */}
            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-amber-500/40 via-orange-500/20 to-transparent blur-2xl" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-amber-400/20">
              <img
                src={images.torbenPortrait}
                alt="Torben Larsen — ejer af LARSEN Herning City"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Warm cinematic overlay + film grain */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,158,11,0.18),transparent_60%)] mix-blend-overlay" />
              <div
                className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
                }}
              />
            </div>

            {/* Floating signature card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.4 }}
              className="absolute -bottom-6 -right-4 md:-right-10 glass rounded-2xl p-5 md:p-6 max-w-[260px]"
              data-testid="torben-signature-card"
            >
              <div className="text-[10px] uppercase tracking-eyebrow text-amber-400/80 mb-2">
                Ejer & vært
              </div>
              <div className="font-display text-2xl text-neutral-50">Torben Larsen</div>
              <div className="text-xs text-neutral-400 mt-1">Siden 2020 · Bredgade 48</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-7"
        >
          <div className="flex items-center gap-3 text-xs uppercase tracking-eyebrow text-amber-400/80 mb-6">
            <Sparkles size={14} className="text-amber-400" />
            <span>Mød Torben</span>
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-neutral-50 leading-[1.02]">
            Et sted skabt af{" "}
            <span className="italic text-amber-400 text-glow-amber">en lokal drøm</span>
          </h2>

          <p className="mt-7 text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
            LARSEN blev startet af <span className="text-neutral-100">Torben Larsen i 2020</span> som et hyggeligt samlingspunkt i Herning — et shop-i-shop koncept med café, vin, chokolade og specialvarer, drevet med personlig service og ægte lokale vibes.
          </p>

          {/* Cinematic quote */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 relative glass rounded-3xl p-7 md:p-10 max-w-2xl"
            data-testid="torben-quote"
          >
            <Quote className="text-amber-400/40 absolute -top-3 -left-2" size={36} />
            <blockquote className="font-display italic text-2xl md:text-3xl text-neutral-50 leading-snug">
              "LARSEN skulle føles som et sted man havde lyst til at komme tilbage til — ikke bare handle i."
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="h-px w-8 bg-amber-400" />
              <span className="text-[11px] uppercase tracking-eyebrow text-amber-400/80">
                Torben Larsen · Ejer
              </span>
            </figcaption>
          </motion.figure>

          {/* Milestones */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
                className="glass-light rounded-2xl p-5 hover:border-amber-400/40 transition-all duration-300"
                data-testid={`milestone-${i}`}
              >
                <div className="font-display text-2xl text-amber-400">{m.year}</div>
                <div className="mt-2 text-xs text-neutral-400 leading-relaxed">{m.text}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
