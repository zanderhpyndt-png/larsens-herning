import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Soft bass hit via Web Audio API
function playBassHit() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(70, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

    // Add a brushy noise tail
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.4, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * 0.25;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.15, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 600;

    osc.connect(gain).connect(ctx.destination);
    noise.connect(filter).connect(noiseGain).connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.4);
    noise.start(now);
    setTimeout(() => ctx.close(), 1600);
  } catch (e) {
    /* noop */
  }
}

const TRIGGER = "hygge";

export default function HyggeEasterEgg() {
  const [active, setActive] = useState(false);
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;
      const next = (buffer + e.key.toLowerCase()).slice(-TRIGGER.length);
      setBuffer(next);
      if (next === TRIGGER) {
        setActive(true);
        playBassHit();
        document.documentElement.classList.add("hygge-flicker");
        setTimeout(() => document.documentElement.classList.remove("hygge-flicker"), 1800);
        setTimeout(() => setActive(false), 2800);
        setBuffer("");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [buffer]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[120] flex items-center justify-center pointer-events-none"
          data-testid="hygge-easter-egg"
        >
          <div className="absolute inset-0 bg-amber-500/10" />
          <div className="relative text-center">
            <div className="font-display italic text-5xl md:text-7xl text-amber-400 text-glow-amber neon-flicker">
              Du fandt hyggen <span className="not-italic">✨</span>
            </div>
            <div className="mt-4 text-[10px] uppercase tracking-[0.4em] text-amber-300/70">
              Hemmelig café-stemning aktiveret
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
