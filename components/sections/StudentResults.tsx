"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";
import CmsImage from "@/components/CmsImage";

const ease = [0.16, 1, 0.3, 1] as const;

function StatCell({ stat }: { stat: { value: string; label: string } }) {
  return (
    <div className="flex-shrink-0 w-[220px] sm:w-[260px] md:w-[280px] border-r border-white/5 last:border-r-0 text-center py-8 px-6">
      <p className="font-display font-bold text-pure-white"
        style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
        {stat.value}
      </p>
      <p className="font-inter text-xs tracking-[0.2em] uppercase text-taupe mt-3">{stat.label}</p>
    </div>
  );
}

function StatsMarquee({ stats }: { stats: { value: string; label: string }[] }) {
  const loop = [...stats, ...stats];

  return (
    <div className="relative overflow-hidden border-y border-white/5 rounded-2xl">
      <div className="absolute left-0 inset-y-0 w-12 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0E0E0E, transparent)" }} />
      <div className="absolute right-0 inset-y-0 w-12 md:w-20 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0E0E0E, transparent)" }} />

      <div className="flex w-max stats-marquee">
        {loop.map((stat, i) => (
          <StatCell key={`${stat.label}-${i}`} stat={stat} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ p, idx }: { p: { src: string; batch: string; label: string }; idx: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.06, ease }}
      className="relative overflow-hidden rounded-2xl group cursor-pointer aspect-[4/3]"
    >
      <CmsImage src={p.src} alt={p.label} fill
        sizes="(max-width: 768px) 50vw, 25vw"
        loading="lazy"
        className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-black/50" />
      <div
        className="absolute bottom-0 left-0 w-px bg-pure-white/60 origin-bottom transition-transform duration-700 scale-y-0 group-hover:scale-y-100"
        style={{ height: "40%", left: "20px" }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <p className="font-inter text-[10px] tracking-[0.25em] uppercase text-silver/70 mb-1">{p.batch}</p>
        <p className="font-display font-semibold text-pure-white text-xl">{p.label}</p>
      </div>
    </motion.div>
  );
}

export default function StudentResults() {
  const { stats, studentGallery } = useCms();
  const photos = studentGallery.map((p) => ({ src: p.image_url, batch: p.batch, label: p.label }));
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-15%" });

  return (
    <section id="results" className="section-gap">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="mb-16">
          <SectionLabel>Proof</SectionLabel>
          <SectionHeading className="mt-5">
            Real Students.<br />
            <em className="font-light italic text-silver">Real Progress.</em>
          </SectionHeading>
        </FadeUp>

        <div className="mb-4" ref={lineRef}>
          <motion.div
            className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={lineInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, ease }}
            style={{ transformOrigin: "left" }}
          />
          <StatsMarquee stats={stats} />
          <motion.div
            className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mt-0"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={lineInView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            style={{ transformOrigin: "right" }}
          />
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((p, i) => <PhotoCard key={i} p={p} idx={i} />)}
        </div>
      </div>
    </section>
  );
}
