import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { subscribeNewsletter, submitContact } from "@/lib/api";

export default function ContactNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const onSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribing(true);
    try {
      await subscribeNewsletter(email);
      toast.success("Tak! Du er nu på listen ✨");
      setEmail("");
    } catch (err) {
      toast.error("Kunne ikke tilmelde. Tjek e-mailen og prøv igen.");
    } finally {
      setSubscribing(false);
    }
  };

  const onContact = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Udfyld venligst alle felter.");
      return;
    }
    setSending(true);
    try {
      await submitContact(form);
      toast.success("Beskeden er sendt — vi vender tilbage snarest 💌");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      toast.error("Noget gik galt. Prøv igen om et øjeblik.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="kontakt"
      className="relative py-28 md:py-40 overflow-hidden"
      data-testid="contact-section"
    >
      <div className="light-leak bg-amber-500/20 w-[500px] h-[500px] top-[10%] left-[-50px]" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16">
          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="glass rounded-[2rem] p-8 md:p-12"
            data-testid="newsletter-card"
          >
            <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
              Nyhedsbrev
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-neutral-50 leading-[1.05]">
              Få inviteringer til <span className="italic text-amber-400">smagninger & events</span>
            </h3>
            <p className="mt-4 text-neutral-400 font-light max-w-md">
              Få besked om nye flasker, sæsonchokolade og hyggelige aftener før alle andre.
            </p>

            <form onSubmit={onSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="din@email.dk"
                  className="w-full glass-light rounded-full pl-12 pr-5 py-4 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/60 transition"
                  data-testid="newsletter-email-input"
                />
              </div>
              <button
                type="submit"
                disabled={subscribing}
                className="btn-vibrate inline-flex items-center justify-center gap-2 bg-amber-500 text-neutral-950 rounded-full px-7 py-4 font-medium hover:bg-amber-400 transition-all duration-300 box-glow-amber disabled:opacity-60"
                data-testid="newsletter-submit-btn"
              >
                {subscribing ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Tilmeld
              </button>
            </form>
            <p className="mt-4 text-[11px] uppercase tracking-eyebrow text-neutral-500">
              Ingen spam · afmeld når som helst
            </p>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="glass rounded-[2rem] p-8 md:p-12"
            data-testid="contact-card"
          >
            <div className="text-xs uppercase tracking-eyebrow text-amber-400/80 mb-5">
              Skriv til os
            </div>
            <h3 className="font-display text-3xl md:text-5xl text-neutral-50 leading-[1.05]">
              Privat event eller <span className="italic text-amber-400">gavekurv?</span>
            </h3>

            <form onSubmit={onContact} className="mt-8 space-y-4" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Dit navn"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full glass-light rounded-2xl px-5 py-4 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/60 transition"
                  data-testid="contact-name-input"
                />
                <input
                  type="email"
                  required
                  placeholder="E-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full glass-light rounded-2xl px-5 py-4 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/60 transition"
                  data-testid="contact-email-input"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="Fortæl os om dine ønsker..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full glass-light rounded-2xl px-5 py-4 text-neutral-100 placeholder:text-neutral-500 focus:outline-none focus:border-amber-400/60 transition resize-none"
                data-testid="contact-message-input"
              />
              <button
                type="submit"
                disabled={sending}
                className="btn-vibrate inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-amber-500 text-neutral-950 rounded-full px-8 py-4 font-medium hover:bg-amber-400 transition-all duration-300 box-glow-amber disabled:opacity-60"
                data-testid="contact-submit-btn"
              >
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                Send besked
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
