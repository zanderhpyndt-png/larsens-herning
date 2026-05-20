import { motion } from "framer-motion";
import { MapPin, Clock, Phone } from "lucide-react";
import { openingHours } from "@/data/site";

export default function LocationHours() {
  return (
    <section
      id="lokation"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="location-section"
    >
      <div className="light-leak bg-orange-500/15 w-[500px] h-[500px] top-[20%] right-[-100px]" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mb-14 md:mb-20"
        >
          <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
            Find os
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-neutral-50 leading-tight">
            Bredgade 48, <span className="italic text-amber-400">Herning</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 md:gap-8">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-3 relative rounded-3xl overflow-hidden border border-white/10 min-h-[420px]"
            data-testid="map-container"
          >
            <iframe
              title="LARSEN Herning Map"
              src="https://www.google.com/maps?q=Bredgade+48,+7400+Herning,+Denmark&output=embed"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: "invert(92%) hue-rotate(180deg) brightness(0.95) contrast(0.9)",
                minHeight: "420px",
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-amber-400/10 rounded-3xl" />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="glass rounded-3xl p-7 md:p-8" data-testid="address-card">
              <div className="flex items-center gap-3 text-amber-400 mb-4">
                <MapPin size={18} />
                <span className="text-xs uppercase tracking-eyebrow">Adresse</span>
              </div>
              <div className="font-display text-2xl md:text-3xl text-neutral-50 leading-tight">
                Bredgade 48
                <br />
                7400 Herning
              </div>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Bredgade+48,+7400+Herning"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-sm text-neutral-300 hover:text-amber-400 transition-colors"
                data-testid="directions-link"
              >
                Få rutevejledning →
              </a>
            </div>

            <div className="glass rounded-3xl p-7 md:p-8" data-testid="hours-card">
              <div className="flex items-center gap-3 text-amber-400 mb-5">
                <Clock size={18} />
                <span className="text-xs uppercase tracking-eyebrow">Åbningstider</span>
              </div>
              <ul className="space-y-3">
                {openingHours.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between text-sm border-b border-white/5 pb-3 last:border-none last:pb-0"
                  >
                    <span className="text-neutral-300">{h.day}</span>
                    <span className="text-neutral-100 font-medium tabular-nums">{h.hours}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 pt-5 border-t border-white/5 text-[11px] uppercase tracking-eyebrow text-neutral-500">
                Altid åben — alle årets dage
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
