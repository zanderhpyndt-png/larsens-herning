import { useMemo } from "react";

export default function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 1 + Math.random() * 2.5,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" data-testid="particles">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: "rgba(245,158,11,0.7)",
            borderRadius: "9999px",
            opacity: p.opacity,
            filter: "blur(0.5px)",
            boxShadow: "0 0 8px rgba(245,158,11,0.55)",
            animation: `floatUp ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
