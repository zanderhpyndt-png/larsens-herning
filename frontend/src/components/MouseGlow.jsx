import { useEffect, useState } from "react";

export default function MouseGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const handle = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[1] mix-blend-screen transition-transform duration-300 ease-out"
      style={{
        left: pos.x - 250,
        top: pos.y - 250,
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.06) 30%, transparent 70%)",
        borderRadius: "9999px",
        filter: "blur(40px)",
      }}
      data-testid="mouse-glow"
    />
  );
}
