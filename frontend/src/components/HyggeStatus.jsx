import { useEffect, useState } from "react";

function getStatus() {
  const h = new Date().getHours();
  if (h >= 6 && h < 11) return { label: "Roligt morgenkaffe ☕", color: "text-amber-300", dot: "bg-amber-300" };
  if (h >= 11 && h < 15) return { label: "Rolig stemning lige nu ☕", color: "text-amber-300", dot: "bg-amber-300" };
  if (h >= 15 && h < 18) return { label: "Eftermiddagshygge 🍷", color: "text-amber-400", dot: "bg-amber-400" };
  if (h >= 18 && h < 22) return { label: "Aftenstemning ✨", color: "text-orange-400", dot: "bg-orange-400" };
  if (h >= 22 || h < 1) return { label: "Sene timer hygge 🌙", color: "text-orange-300", dot: "bg-orange-300" };
  return { label: "Vi sover lige nu 💤", color: "text-neutral-400", dot: "bg-neutral-500" };
}

export default function HyggeStatus() {
  const [status, setStatus] = useState(getStatus());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const reveal = setTimeout(() => setVisible(true), 2200);
    const tick = setInterval(() => setStatus(getStatus()), 60_000);
    return () => {
      clearTimeout(reveal);
      clearInterval(tick);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "6rem",
        right: "1.5rem",
        zIndex: 40,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 700ms cubic-bezier(0.22,1,0.36,1), transform 700ms cubic-bezier(0.22,1,0.36,1)",
      }}
      className="hidden md:flex items-center gap-2.5 glass rounded-full px-4 py-2.5"
      data-testid="hygge-status"
    >
      <span className="relative flex h-2 w-2">
        <span className={`absolute inset-0 ${status.dot} rounded-full animate-ping opacity-75`} />
        <span className={`relative ${status.dot} rounded-full h-2 w-2`} />
      </span>
      <span className={`text-[11px] uppercase tracking-eyebrow ${status.color}`}>
        {status.label}
      </span>
    </div>
  );
}
