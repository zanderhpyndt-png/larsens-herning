import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { images } from "@/data/site";

const LETTERS = ["L", "A", "R", "S", "E", "N"];

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-neutral-950 overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
          }}
          data-testid="loader"
        >
          {/* Photographic intro: storefront fades in */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <img
              src={images.visitDenmark}
              alt=""
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-neutral-950/50 to-neutral-950" />
          </motion.div>

          {/* Film scratch overlay */}
          <div className="absolute inset-0 film-scratch opacity-30" />

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.7)_90%)]" />

          {/* Centerpiece */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Eyebrow text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-[10px] uppercase tracking-[0.5em] text-amber-400/80 mb-6"
            >
              Bredgade 48 · Herning
            </motion.div>

            {/* Letter-by-letter reveal */}
            <div className="flex items-baseline overflow-hidden" data-testid="loader-logo">
              {LETTERS.map((letter, i) => (
                <span
                  key={i}
                  className="font-display text-6xl md:text-8xl text-amber-400 text-glow-amber inline-block"
                  style={{
                    animation: `letterRise 0.7s cubic-bezier(0.22,1,0.36,1) ${0.1 + i * 0.07}s both`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            {/* Hand-stamp underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}
              className="origin-left h-[2px] w-32 bg-amber-400/80 mt-4"
              style={{ filter: "drop-shadow(0 0 8px rgba(245,158,11,0.6))" }}
            />

            {/* Footer line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-5 text-[10px] uppercase tracking-[0.4em] text-neutral-400"
            >
              Siden 2020
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
