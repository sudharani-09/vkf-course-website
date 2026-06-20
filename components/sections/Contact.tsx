"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const { settings } = useCms();
  const [form, setForm] = useState({ name: "", phone: "", email: "", enquiry: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again or contact us on WhatsApp.");
        return;
      }
      setSent(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="section-gap">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Contact</SectionLabel>
            <SectionHeading className="mt-5">
              Get in<br />
              <em className="font-light italic text-silver">Touch</em>
            </SectionHeading>
            <p className="font-inter text-base text-taupe mt-5 max-w-md mx-auto">
              {settings.contact_subtitle}
            </p>
          </FadeUp>

          <FadeUp delay={0.1} className="max-w-xl mx-auto">
            <div className="glass rounded-3xl p-7 md:p-8">
              <h3 className="font-display font-semibold text-pure-white text-2xl mb-7">Send an Enquiry</h3>
              {sent ? (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center py-10">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="font-inter text-pure-white text-base">Thanks! We&apos;ll get back to you soon.</p>
                  <button onClick={() => { setSent(false); setError(""); }}
                    className="font-inter text-xs text-taupe mt-5 hover:text-pure-white transition-colors">
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { id: "name" as const, label: "Full Name", type: "text", ph: "Your full name" },
                    { id: "phone" as const, label: "Phone Number", type: "tel", ph: "+91 XXXXX XXXXX" },
                    { id: "email" as const, label: "Email Address", type: "email", ph: "you@email.com" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label className="font-inter text-[10px] tracking-[0.25em] text-taupe uppercase block mb-1.5">{f.label}</label>
                      <input type={f.type} placeholder={f.ph} required
                        value={form[f.id]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                        className="input-field" />
                    </div>
                  ))}
                  <div>
                    <label className="font-inter text-[10px] tracking-[0.25em] text-taupe uppercase block mb-1.5">Your Enquiry</label>
                    <textarea placeholder="Tell us about yourself and what you'd like to know..." rows={4} required
                      value={form.enquiry} onChange={(e) => setForm({ ...form, enquiry: e.target.value })}
                      className="input-field resize-none" />
                  </div>
                  {error && (
                    <p className="font-inter text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}
                  <motion.button type="submit" disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full bg-pure-white text-deep-black font-inter font-semibold text-sm py-4 rounded-xl hover:bg-silver transition-colors disabled:opacity-50 mt-2">
                    {loading ? "Sending…" : "Send Message"}
                  </motion.button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="font-display font-semibold text-pure-white text-xl">{settings.hero_title}</p>
            <p className="font-inter text-xs text-taupe mt-1 tracking-[0.2em] uppercase">{settings.footer_tagline}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-6">
            <a href={`tel:${settings.phone_display.replace(/\s/g, "")}`}
              className="font-inter text-xs text-taupe hover:text-pure-white transition-colors flex items-center gap-2">
              <span>📞</span> {settings.phone_display}
            </a>
            <a href={`https://wa.me/${settings.whatsapp_number}`} target="_blank" rel="noopener noreferrer"
              className="font-inter text-xs text-taupe hover:text-pure-white transition-colors flex items-center gap-2">
              <span>💬</span> WhatsApp
            </a>
            <a href={settings.instagram_url} target="_blank" rel="noopener noreferrer"
              className="font-inter text-xs text-taupe hover:text-pure-white transition-colors flex items-center gap-2">
              <span>📸</span> Instagram
            </a>
            <a href={`mailto:${settings.email}`}
              className="font-inter text-xs text-taupe hover:text-pure-white transition-colors flex items-center gap-2">
              <span>✉️</span> Email
            </a>
          </div>

          <p className="font-inter text-xs text-taupe text-center">
            © {new Date().getFullYear()} {settings.hero_title}. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
