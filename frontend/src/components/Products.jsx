import { motion } from "framer-motion";
import { products } from "@/data/site";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 },
  }),
};

export default function Products() {
  return (
    <section
      id="produkter"
      className="relative py-28 md:py-40"
      data-testid="products-section"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          custom={0}
          className="max-w-2xl mb-16 md:mb-24"
        >
          <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
            Vores udvalg
          </div>
          <h2 className="font-display text-4xl md:text-6xl tracking-tight text-neutral-50 leading-tight">
            Smag på det <span className="italic text-amber-400">nøje udvalgte</span>
          </h2>
          <p className="mt-5 text-neutral-400 text-base md:text-lg max-w-lg font-light">
            Fra mørk chokolade til naturvine — hvert produkt er valgt for sin smag, sit håndværk og sin historie.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((p, i) => (
            <motion.article
              key={p.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={i + 1}
              className="group relative overflow-hidden rounded-3xl bg-neutral-900/40 border border-white/5 hover:border-amber-400/40 transition-all duration-500"
              data-testid={`product-card-${p.id}`}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 text-[10px] uppercase tracking-eyebrow text-amber-300 glass-light px-3 py-1.5 rounded-full">
                {p.tag}
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
                <h3 className="font-display text-2xl md:text-3xl text-neutral-50 mb-2">
                  {p.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">{p.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
