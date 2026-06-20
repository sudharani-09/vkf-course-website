"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function FAQ() {
  const { faqs } = useCms();
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="section-gap">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <SectionLabel>FAQ</SectionLabel>
          <SectionHeading className="mt-5">
            Common<br />
            <em className="font-light italic text-silver">Questions</em>
          </SectionHeading>
        </FadeUp>

        <div className="glass rounded-3xl px-6 md:px-10 py-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.04, ease }}
              className="border-b border-white/5 last:border-0"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-6 text-left group"
              >
                <span className={`font-display font-semibold transition-colors duration-300 ${openIdx === i ? "text-pure-white" : "text-silver/80 group-hover:text-pure-white"}`}
                  style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)" }}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIdx === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease }}
                  className="w-7 h-7 rounded-full border border-white/12 flex items-center justify-center flex-shrink-0 group-hover:border-white/30 transition-colors"
                >
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0v12M0 6h12" stroke="white" strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="overflow-hidden"
                  >
                    <p className="font-inter text-sm text-taupe leading-relaxed pb-6 pr-8">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
