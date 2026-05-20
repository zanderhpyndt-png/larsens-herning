import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, MapPin } from "lucide-react";
import { images } from "@/data/site";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax transforms for glow + image
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const glowX = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 0.4]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden flex items-end md:items-center"
      data-testid="hero-section"
    >
      {/* Background image with parallax */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <img
          src={images.visitDenmark}
          alt="LARSEN Herning City facade om aftenen"
          className="w-full h-[115%] object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-950/60 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/40 to-neutral-950/20" />
        <motion.div
          className="absolute inset-0 bg-neutral-950"
          style={{ opacity: overlayOpacity }}
        />
        <div className="rain" />
      </motion.div>

      {/* Floating amber glow with parallax */}
      <motion.div
        className="absolute right-[5%] top-[30%] light-leak bg-amber-500/30 w-[400px] h-[400px]"
        style={{ y: glowY, x: glowX }}
      />
      <motion.div
        className="absolute left-[-100px] top-[60%] light-leak bg-orange-600/20 w-[500px] h-[500px]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -180]) }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-32 md:py-0 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 1.6 }}
          className="max-w-3xl"
        >
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-eyebrow text-amber-400/90 mb-6">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 box-glow-amber pulse-glow" />
              Bredgade 48 · Herning
            </span>
            <span className="inline-flex items-center glass-light rounded-full px-3 py-1 text-[10px] tracking-[0.25em] text-amber-300" data-testid="since-2020-badge">
              ✦ Since 2020
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-neutral-50"
            data-testid="hero-title"
          >
            Hernings{" "}
            <span className="italic text-amber-400 text-glow-amber">hyggeligste</span>
            <br />
            spot <span className="text-amber-400">✨</span>
          </h1>

          <p className="mt-7 text-base md:text-xl text-neutral-300 max-w-xl font-light leading-relaxed">
            Vin, chokolade, café og gode aftener samlet ét sted —
            en skjult perle i hjertet af Herning.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo("kontakt")}
              className="group inline-flex items-center justify-center gap-2 bg-amber-500 text-neutral-950 rounded-full px-8 py-4 font-medium tracking-wide hover:bg-amber-400 transition-all duration-300 box-glow-amber"
              data-testid="hero-cta-visit"
            >
              <MapPin size={18} />
              Besøg LARSEN
            </button>
            <button
              onClick={() => scrollTo("produkter")}
              className="inline-flex items-center justify-center gap-2 glass-light text-neutral-100 rounded-full px-8 py-4 font-medium tracking-wide hover:bg-white/10 hover:border-amber-400/40 transition-all duration-300"
              data-testid="hero-cta-menu"
            >
              Se menu & favoritter
              <ArrowDown size={16} className="group-hover:translate-y-0.5 transition" />
            </button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-neutral-500"
        >
          <span className="text-[10px] uppercase tracking-eyebrow mb-3">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={16} className="text-amber-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
