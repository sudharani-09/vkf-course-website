"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

type Reel = { url: string; title: string; sub: string; thumb: string };

function VideoCard({ reel, idx, hoveredIdx, onHover, onLeave }: {
  reel: Reel;
  idx: number;
  hoveredIdx: number | null;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isHovered = hoveredIdx === idx;
  const isDeemphasized = hoveredIdx !== null && !isHovered;

  return (
    <motion.a
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.06, ease }}
      animate={{
        scale: isHovered ? 1.08 : isDeemphasized ? 0.96 : 1,
        y: isHovered ? -12 : 0,
        opacity: isDeemphasized ? 0.55 : 1,
        zIndex: isHovered ? 10 : 1,
      }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      className="relative flex-shrink-0 w-[75vw] max-w-[260px] md:w-full rounded-3xl overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "9/16",
        background: "#1a1a1a",
        boxShadow: isHovered ? "0 30px 80px rgba(0,0,0,0.7)" : "0 8px 30px rgba(0,0,0,0.4)",
        transition: "box-shadow 0.4s ease",
      }}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url('${reel.thumb}')`,
          filter: isHovered ? "brightness(0.9)" : "brightness(0.65)",
          transform: isHovered ? "scale(1.05)" : "scale(1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/20" />

      {/* Play button with pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <motion.div
            animate={isHovered ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="w-14 h-14 rounded-full flex items-center justify-center border border-white/30"
            style={{ background: "rgba(253,253,253,0.12)", backdropFilter: "blur(12px)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
          {/* Pulse ring */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full border border-white/20"
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </div>
      </div>

      {/* Bottom title — slides up on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <motion.div
          animate={{ y: isHovered ? 0 : 8, opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.4, ease }}
        >
          <p className="font-inter text-[10px] tracking-[0.2em] uppercase text-silver/60 mb-1"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>{reel.sub}</p>
          <p className="font-display font-semibold text-pure-white text-lg"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>{reel.title}</p>
        </motion.div>
      </div>

      {/* Border glow on hover */}
      <div className={`absolute inset-0 rounded-3xl border transition-colors duration-400 ${isHovered ? "border-white/20" : "border-white/5"}`} />
    </motion.a>
  );
}

export default function VideoTestimonials() {
  const { instagramReels } = useCms();
  const REELS: Reel[] = instagramReels.map((r) => ({
    url: r.url,
    title: r.title,
    sub: r.sub,
    thumb: r.thumb_url,
  }));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideTo = (dir: "prev" | "next") => {
    const next = dir === "next"
      ? Math.min(activeSlide + 1, REELS.length - 1)
      : Math.max(activeSlide - 1, 0);
    setActiveSlide(next);
    const card = scrollRef.current?.querySelectorAll(".reel-card")[next] as HTMLElement;
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section id="video-testimonials" className="section-gap overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Video Testimonials</SectionLabel>
          <SectionHeading className="mt-5">
            What Students<br />
            <em className="font-light italic text-silver">Say</em>
          </SectionHeading>
          <p className="font-inter text-base text-taupe mt-5 max-w-lg mx-auto leading-relaxed">
            Real experiences from students who transformed their wedding filmmaking, editing and color grading skills.
          </p>
        </FadeUp>

        {/* Desktop — 4 column grid */}
        <div className="hidden md:grid grid-cols-4 gap-5 max-w-[1400px] mx-auto">
          {REELS.map((r, i) => (
            <VideoCard key={i} reel={r} idx={i}
              hoveredIdx={hoveredIdx}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* Tablet — 2 column */}
        <div className="hidden sm:grid md:hidden grid-cols-2 gap-5">
          {REELS.map((r, i) => (
            <VideoCard key={i} reel={r} idx={i}
              hoveredIdx={hoveredIdx}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>

        {/* Mobile — slider */}
        <div className="sm:hidden">
          <div
  ref={scrollRef}
  className="flex overflow-x-auto py-4"
  style={{
    scrollSnapType: "x mandatory",
    scrollbarWidth: "none",
  }}
>
            {REELS.map((r, i) => (
              <div
                 key={i}
                    className="reel-card snap-center flex justify-center min-w-full"
                >
                <VideoCard reel={r} idx={i} hoveredIdx={hoveredIdx}
                  onHover={() => setHoveredIdx(i)} onLeave={() => setHoveredIdx(null)} />
              </div>
            ))}
          </div>

          {/* Mobile arrows */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button onClick={() => slideTo("prev")}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-silver hover:border-white/40 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12L6 8l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="flex gap-2">
              {REELS.map((_, i) => (
                <button key={i} onClick={() => { setActiveSlide(i); slideTo(i < activeSlide ? "prev" : "next"); }}
                  className={`rounded-full transition-all duration-300 ${i === activeSlide ? "w-5 h-1.5 bg-pure-white" : "w-1.5 h-1.5 bg-white/20"}`} />
              ))}
            </div>
            <button onClick={() => slideTo("next")}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-silver hover:border-white/40 transition-colors">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
