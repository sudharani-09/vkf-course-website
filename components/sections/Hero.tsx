"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const { settings } = useCms();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2400);
    return () => clearTimeout(timer);
  }, []);


  return (
    <section id="home" className="relative w-full h-screen min-h-[600px] overflow-hidden bg-deep-black">
      {/* Poster + video background */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ duration: 1.2, ease }}
      >
       
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={settings.hero_video_url} type="video/mp4" />
        </video>
        <div className="video-overlay absolute inset-0 z-10" />
        <div className="vignette absolute inset-0 z-20" />
        <div
          className="absolute bottom-0 inset-x-0 h-40 z-20"
          style={{ background: "linear-gradient(to bottom, transparent, #0E0E0E)" }}
        />
      </motion.div>

      {/* Intro curtain */}
      <motion.div
        className="absolute inset-0 z-20 bg-deep-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: introDone ? 0 : 1 }}
        transition={{ duration: 5, ease }}
        style={{ pointerEvents: introDone ? "none" : "auto" }}
      />

      {/* Title + subtitle — always visible, animates on load */}
      <div className="absolute inset-0 z-30 flex flex-col justify-end items-center text-center">
        <div className="w-full max-w-4xl px-6 md:px-12 pb-24 md:pb-32">
          <motion.h1
            initial={{ opacity: 0, y: 40, letterSpacing: "0.08em" }}
            animate={{ opacity: 1, y: 0, letterSpacing: "0.02em" }}
            transition={{ duration: 2, ease }}
            className="font-display font-light text-pure-white uppercase"
            style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)", lineHeight: 1.15 }}
          >
            {settings.hero_title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="font-inter font-light text-pure-white/75 mt-4 tracking-wide"
            style={{ fontSize: "clamp(0.85rem, 1.6vw, 1.1rem)" }}
          >
            {settings.hero_tagline}
          </motion.p>

          {/* CTAs — appear after intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={introDone ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex flex-wrap justify-center gap-4 mt-10"
          >
            <a
              href="#curriculum"
              className="group inline-flex items-center gap-2.5 font-inter font-medium bg-pure-white text-deep-black px-7 py-3.5 rounded-xl text-sm hover:bg-silver hover:scale-105 active:scale-95 transition-all duration-200 shadow-[0_4px_30px_rgba(253,253,253,0.12)]"
            >
              View Course Details
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="group-hover:translate-x-1 transition-transform duration-200">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#enroll"
              className="inline-flex items-center gap-2.5 font-inter font-medium border border-pure-white/25 text-pure-white px-7 py-3.5 rounded-xl text-sm hover:border-pure-white/60 hover:bg-white/5 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Course Fees & Enroll
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: introDone ? 1 : 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="font-inter text-[9px] tracking-[0.3em] text-taupe uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-taupe/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
