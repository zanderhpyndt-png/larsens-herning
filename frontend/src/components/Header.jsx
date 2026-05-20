import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div
          className={`flex items-center justify-between rounded-full px-5 md:px-8 py-3 md:py-4 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_8px_40px_rgba(0,0,0,0.6)]" : ""
          }`}
        >
          <button
            onClick={() => handleNav("hero")}
            className="font-display text-2xl md:text-3xl tracking-tight text-amber-400 text-glow-amber"
            data-testid="header-logo"
          >
            LARSEN
          </button>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-sm tracking-wider text-neutral-300 hover:text-amber-400 transition-colors duration-300"
                data-testid={`nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNav("kontakt")}
            className="btn-vibrate hidden md:inline-flex items-center text-xs uppercase tracking-eyebrow text-neutral-100 border border-white/15 rounded-full px-5 py-2 hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
            data-testid="header-visit-btn"
          >
            Besøg
          </button>

          <button
            className="md:hidden text-neutral-200"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-3 glass rounded-3xl p-6 flex flex-col gap-4"
            data-testid="mobile-menu"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-left text-neutral-200 hover:text-amber-400 transition-colors"
                data-testid={`mobile-nav-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
