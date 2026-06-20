"use client";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import BatchDateAnnouncement from "../BatchDateAnnouncement";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function BatchDetails() {
  const { batchDetails } = useCms();

  return (
    <section id="batch" className="section-gap">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Next Batch</SectionLabel>
          <SectionHeading className="mt-5">
            Batch<br />
            <em className="font-light italic text-silver">Information</em>
          </SectionHeading>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {batchDetails.map((d, i) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300 ${
                d.accent ? "bg-pure-white text-deep-black" : "glass hover:border-white/15"
              }`}
            >
              <span className="text-2xl">{d.icon}</span>
              <h3 className={`font-display font-semibold text-lg ${d.accent ? "text-deep-black" : "text-pure-white"}`}>
                {d.title}
              </h3>
              <p className={`font-inter text-sm leading-relaxed ${d.accent ? "text-deep-black/60" : "text-taupe"}`}>
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <BatchDateAnnouncement />
      </div>
    </section>
  );
}
