import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSound() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hinted, setHinted] = useState(false);

  useEffect(() => {
    const audio = new Audio("/cafe-ambient.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    // Subtle hint after loader fades
    const t = setTimeout(() => setHinted(true), 2500);
    const t2 = setTimeout(() => setHinted(false), 8000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const fadeTo = (target, duration = 700) => {
    const audio = audioRef.current;
    if (!audio) return;
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      audio.volume = start + (target - start) * t;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHinted(false);
    if (!playing) {
      try {
        await audio.play();
        setPlaying(true);
        fadeTo(0.35, 900);
      } catch (e) {
        // autoplay or load issue; ignore silently
      }
    } else {
      fadeTo(0, 500);
      setTimeout(() => audio.pause(), 520);
      setPlaying(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center gap-3" data-testid="ambient-sound">
      <AnimatePresence>
        {hinted && !playing && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="glass rounded-full px-4 py-2 text-[11px] uppercase tracking-eyebrow text-amber-300 hidden sm:block"
          >
            Tænd café-stemningen
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={toggle}
        aria-label={playing ? "Stop café-lyd" : "Afspil café-lyd"}
        className={`relative w-12 h-12 rounded-full glass flex items-center justify-center text-amber-300 hover:text-amber-200 hover:border-amber-400/40 transition-all duration-300 ${
          playing ? "box-glow-amber" : ""
        }`}
        data-testid="ambient-sound-toggle"
      >
        <AnimatePresence mode="wait">
          {playing ? (
            <motion.span
              key="on"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Volume2 size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="off"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <VolumeX size={18} />
            </motion.span>
          )}
        </AnimatePresence>

        {playing && (
          <>
            <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping" />
            <span className="absolute -inset-2 rounded-full border border-amber-400/20" />
          </>
        )}
      </button>
    </div>
  );
}
