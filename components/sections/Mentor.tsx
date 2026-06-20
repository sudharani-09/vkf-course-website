"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";
import CmsImage from "@/components/CmsImage";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Mentor() {
  const { settings, mentorCredentials } = useCms();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section id="mentor" className="section-gap" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.97 }}
            animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.55, ease }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="absolute -inset-3 rounded-3xl border border-white/5 pointer-events-none"
            />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] group">
              <CmsImage src={settings.mentor_image_url} alt={settings.mentor_name} fill
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.35, duration: 0.45, ease }}
              className="absolute -bottom-5 -right-4 md:-right-8 glass-dark rounded-2xl px-5 py-4 border border-white/10"
            >
              <p className="font-display font-semibold text-pure-white text-xl leading-tight">
                {settings.mentor_name.split(" ")[0]}<br />
                <span className="text-silver/80">{settings.mentor_name.split(" ").slice(1).join(" ")}</span>
              </p>
              <p className="font-inter text-[10px] text-taupe tracking-wide mt-1">Wedding Filmmaker</p>
            </motion.div>
          </motion.div>

          <div className="pt-8 md:pt-0">
            <FadeUp delay={0.1}>
              <SectionLabel>Your Mentor</SectionLabel>
              <SectionHeading className="mt-5 mb-3">
                Meet Your<br />Mentor
              </SectionHeading>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.45, ease }}
                className="font-display italic text-silver/80"
                style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)" }}
              >
                {settings.mentor_name}
              </motion.p>
            </FadeUp>

            <FadeUp delay={0.2} className="mt-5">
              <p className="font-inter text-base text-taupe leading-relaxed mb-4">{settings.mentor_bio_1}</p>
              <p className="font-inter text-base text-taupe leading-relaxed">{settings.mentor_bio_2}</p>
            </FadeUp>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {mentorCredentials.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.25 + i * 0.05, duration: 0.45, ease }}
                  whileHover={{ x: 5, backgroundColor: "rgba(253,253,253,0.06)" }}
                  className="glass rounded-xl px-4 py-3 flex items-center gap-3 transition-colors duration-200 cursor-default"
                >
                  <span className="text-lg">{c.icon}</span>
                  <span className="font-inter text-xs text-silver/70">{c.label}</span>
                </motion.div>
              ))}
            </div>

            <FadeUp delay={0.6} className="mt-8">
              <a href={settings.instagram_url}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-3 font-inter text-sm text-pure-white border border-white/15 px-6 py-3 rounded-xl hover:border-white/40 hover:bg-white/4 hover:gap-5 transition-all duration-300 group">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="opacity-60">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow on Instagram
                <span className="opacity-0 group-hover:opacity-60 transition-opacity text-xs">↗</span>
              </a>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
