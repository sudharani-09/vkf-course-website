"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

function Module({ mod, isOpen, toggle, idx }: {
  mod: { n: string; title: string; points: string[] };
  isOpen: boolean;
  toggle: () => void;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: idx * 0.03, ease }}
      className="border-b border-white/5 last:border-0"
    >
      <button onClick={toggle}
        className="w-full flex items-center gap-5 py-6 text-left group">
        <span className="font-inter text-xl font-bold text-white/10 group-hover:text-white/20 transition-colors w-10 flex-shrink-0">
          {mod.n}
        </span>
        <span className={`font-display font-semibold flex-1 transition-colors duration-300 ${isOpen ? "text-pure-white" : "text-silver/80 group-hover:text-pure-white"}`}
          style={{ fontSize: "clamp(1rem, 1.8vw, 1.4rem)" }}>
          {mod.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="w-7 h-7 rounded-full border border-white/12 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 0v12M0 6h12" stroke="white" strokeWidth="1.5" />
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <ul className="pb-6 pl-14 space-y-2.5">
              {mod.points.map((pt, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04, ease }}
                  className="flex items-start gap-3"
                >
                  <span className="w-1 h-1 rounded-full bg-taupe/50 mt-2 flex-shrink-0" />
                  <span className="font-inter text-sm text-taupe leading-relaxed">{pt}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Curriculum() {
  const { curriculum } = useCms();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const modules = curriculum.map((m) => ({ n: m.module_number, title: m.title, points: m.points }));

  return (
    <section id="curriculum" className="section-gap">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Curriculum</SectionLabel>
          <SectionHeading className="mt-5">
            What You&apos;ll<br />
            <em className="font-light italic text-silver">Learn</em>
          </SectionHeading>
          <p className="font-inter text-base text-taupe mt-5 max-w-md mx-auto leading-relaxed">
            10 modules. 100% practical. Built around real wedding footage.
          </p>
        </FadeUp>

        <div className="glass rounded-3xl px-6 md:px-10 py-2">
          {modules.map((m, i) => (
            <Module key={m.n} mod={m} idx={i}
              isOpen={openIdx === i}
              toggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
