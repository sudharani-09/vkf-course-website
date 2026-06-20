"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "./ui/primitives";
import { useCms } from "@/components/CmsProvider";

type DateParts = { day: string; month: string; year: string };

function parseDate(dateStr: string): DateParts | null {
  const date = new Date(dateStr + "T00:00:00");
  if (isNaN(date.getTime())) return null;
  return {
    day: String(date.getDate()).padStart(2, "0"),
    month: String(date.getMonth() + 1).padStart(2, "0"),
    year: String(date.getFullYear()).slice(-2),
  };
}

const ease = [0.16, 1, 0.3, 1] as const;

function DateCard({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease }}
      whileHover={{ scale: 1.04 }}
      className="flex-1 aspect-square max-w-[140px] sm:max-w-[160px] rounded-2xl bg-charcoal flex flex-col overflow-hidden cursor-default transition-shadow duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
    >
      <div className="flex-1 flex items-center justify-center">
        <span className="font-display font-light text-pure-white text-5xl sm:text-6xl tracking-tight">
          {value}
        </span>
      </div>
      <div className="border-t border-dashed border-pure-white/25 py-3 sm:py-4">
        <span className="block font-inter text-[10px] sm:text-xs tracking-[0.35em] text-pure-white/80 uppercase text-center">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function BatchDateAnnouncement() {
  const { batch } = useCms();
  const parts = batch ? parseDate(batch.batch_date) : null;

  return (
    <FadeUp className="mt-20">
      <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
        <h3
          className="font-display font-light text-pure-white uppercase tracking-[0.25em] sm:tracking-[0.35em] mb-10 sm:mb-12"
          style={{ fontSize: "clamp(0.85rem, 2.5vw, 1.25rem)" }}
        >
          {batch ? `${batch.batch_name.toUpperCase()} ENROLLMENTS OPEN SOON` : "BATCH ENROLLMENTS OPEN SOON"}
        </h3>

        {parts ? (
          <div className="flex justify-center gap-4 sm:gap-6">
            <DateCard value={parts.day} label="Day" delay={0} />
            <DateCard value={parts.month} label="Month" delay={0.08} />
            <DateCard value={parts.year} label="Year" delay={0.16} />
          </div>
        ) : (
          <div className="flex justify-center gap-4 sm:gap-6">
            {["—", "—", "—"].map((val, i) => (
              <DateCard key={i} value={val} label={["Day", "Month", "Year"][i]} delay={i * 0.08} />
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-inter text-sm text-taupe mt-8 sm:mt-10 leading-relaxed"
        >
          Dates will be announced shortly. Limited seats available.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5, ease }}
          className="mt-8"
        >
          <Link
            href="/enroll"
            className="inline-flex items-center justify-center font-inter font-semibold text-sm bg-pure-white text-deep-black px-10 py-4 rounded-full hover:bg-silver hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
          >
            Reserve Seat
          </Link>
        </motion.div>
      </div>
    </FadeUp>
  );
}
