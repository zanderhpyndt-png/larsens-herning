import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const offerings = [
  { emoji: "🍫", label: "Belgisk varm kakao", note: "Mørk, dampende, lavet på Callebaut" },
  { emoji: "🍷", label: "Aftenens vin: Ripasso", note: "Glas eller flaske, perfekt til chokolade" },
  { emoji: "☕", label: "Frisklavet kaffe hele aftenen", note: "Single-origin · langsom bryg" },
  { emoji: "✨", label: "Nye gavekurve i butikken", note: "Håndsamlet · klar til afhentning" },
  { emoji: "🥂", label: "Special: smagning på Amarone", note: "Spørg ved disken — kun i aften" },
  { emoji: "🍪", label: "Friske lakridschokolader", note: "Lige ankommet fra mesteren" },
  { emoji: "🌙", label: "Sene-time menu aktiveret", note: "Sandwich · vaffel · gløgg" },
];

function dailyPick() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const day = Math.floor((now - start) / 86_400_000);
  return offerings[day % offerings.length];
}

export default function TonightAtLarsen() {
  const pick = dailyPick();

  return (
    <section
      className="relative py-16 md:py-24"
      data-testid="tonight-section"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass rounded-[2rem] p-7 md:p-10 overflow-hidden"
          data-testid="tonight-card"
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-10 w-64 h-64 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-20 -left-10 w-64 h-64 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            {/* Status dot + label */}
            <div className="flex items-center gap-3 shrink-0">
              <span className="relative flex h-3 w-3">
                <span className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75" />
                <span className="relative bg-amber-400 rounded-full h-3 w-3 box-glow-amber" />
              </span>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-amber-300/90">
                <Sparkles size={12} />
                Tonight at LARSEN
              </div>
            </div>

            <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-amber-400/30 to-transparent" />

            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl md:text-4xl shrink-0">{pick.emoji}</span>
                <h3 className="font-display text-2xl md:text-4xl text-neutral-50 leading-tight">
                  {pick.label}
                </h3>
              </div>
              <p className="mt-2 text-sm md:text-base text-neutral-400 font-light">
                {pick.note}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
