import { Instagram, Facebook, MapPin, Mail } from "lucide-react";
import { navLinks } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative bg-neutral-950 border-t border-white/5 overflow-hidden" data-testid="site-footer">
      <div className="light-leak bg-amber-500/10 w-[700px] h-[700px] -top-40 left-1/2 -translate-x-1/2" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-12">
        {/* Massive Logo */}
        <div className="text-center">
          <div className="font-display text-[18vw] md:text-[14rem] leading-none tracking-tight text-amber-400/90 text-glow-amber neon-flicker select-none">
            LARSEN
          </div>
          <div className="text-xs uppercase tracking-eyebrow text-neutral-500 -mt-3 md:-mt-6">
            Herning City · Bredgade 48
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid md:grid-cols-3 gap-10 md:gap-16">
          <div>
            <div className="text-[10px] uppercase tracking-eyebrow text-amber-400/70 mb-4">Følg os</div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 glass-light rounded-full flex items-center justify-center hover:border-amber-400/40 hover:text-amber-400 text-neutral-300 transition"
                data-testid="footer-instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-11 h-11 glass-light rounded-full flex items-center justify-center hover:border-amber-400/40 hover:text-amber-400 text-neutral-300 transition"
                data-testid="footer-facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-eyebrow text-amber-400/70 mb-4">Navigation</div>
            <ul className="space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    className="text-sm text-neutral-300 hover:text-amber-400 transition"
                    data-testid={`footer-nav-${l.id}`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[10px] uppercase tracking-eyebrow text-amber-400/70 mb-4">Kontakt</div>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-1 text-amber-400/80 shrink-0" />
                Bredgade 48, 7400 Herning
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="mt-1 text-amber-400/80 shrink-0" />
                <a href="mailto:hej@larsen-herning.dk" className="hover:text-amber-400 transition" data-testid="footer-email">
                  hej@larsen-herning.dk
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-[11px] uppercase tracking-eyebrow text-neutral-500">
          <span>© {year} LARSEN Herning City · Alle rettigheder forbeholdt</span>
          <span>Lavet med ❤ i Herning</span>
        </div>
      </div>
    </footer>
  );
}
