import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          data-testid="loader"
        >
          <div className="absolute inset-0 light-leak bg-amber-500/20 w-[600px] h-[600px] m-auto" />
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <div className="font-display text-6xl md:text-8xl tracking-tight text-amber-400 text-glow-amber neon-flicker">
                LARSEN
              </div>
              <div className="mt-3 text-xs tracking-eyebrow uppercase text-neutral-500">
                Herning City
              </div>
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 180 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
