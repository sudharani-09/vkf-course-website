"use client";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Transformation() {
  const { transformation } = useCms();

  return (
    <section id="journey" className="section-gap">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-start">
          <FadeUp>
            <SectionLabel>The Journey</SectionLabel>
            <SectionHeading className="mt-5 mb-6">
              Transformation<br />
              <em className="font-light italic text-silver">Through Practice</em>
            </SectionHeading>
            <p className="font-inter text-base text-taupe leading-relaxed max-w-md">
              Why Join This Course?
            </p>
          </FadeUp>

          <div className="space-y-0">
            {transformation.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06, ease }}
                whileHover={{ x: 6 }}
                className="group flex gap-6 py-7 border-b border-white/5 last:border-0 cursor-default transition-colors duration-300 hover:bg-white/[0.02] px-4 rounded-xl"
              >
                <span className="font-inter text-3xl text-white/8 group-hover:text-white/15 transition-colors font-bold select-none leading-none mt-1">
                  {p.item_number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-pure-white text-xl md:text-2xl mb-2">{p.title}</h3>
                  <p className="font-inter text-sm text-taupe leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
