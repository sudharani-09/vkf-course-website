"use client";
import { motion } from "framer-motion";
import { FadeUp, SectionLabel, SectionHeading } from "../ui/primitives";
import { useCms } from "@/components/CmsProvider";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Pricing() {
  const { pricing, settings } = useCms();

  return (
    <section id="enroll" className="section-gap">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeUp className="text-center mb-16">
          <SectionLabel>Investment</SectionLabel>
          <SectionHeading className="mt-5">
            Choose Your<br />
            <em className="font-light italic text-silver">Path</em>
          </SectionHeading>
          <p className="font-inter text-base text-taupe mt-5 max-w-sm mx-auto">
            {settings.pricing_subtitle}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              whileHover={{ y: plan.highlight ? -6 : -4 }}
              className={`relative rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 ${
                plan.highlight
                  ? "bg-pure-white text-deep-black shadow-[0_0_80px_rgba(253,253,253,0.12)]"
                  : "glass hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-deep-black text-pure-white font-inter text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border border-white/10">
                  Most Popular
                </span>
              )}

              <div>
                <p className={`font-inter text-xs tracking-[0.2em] uppercase mb-3 ${plan.highlight ? "text-deep-black/50" : "text-taupe"}`}>
                  {plan.label}
                </p>
                <p className={`font-display font-bold leading-none ${plan.highlight ? "text-deep-black" : "text-pure-white"}`}
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}>
                  {plan.price}
                </p>
                <p className={`font-inter text-sm mt-3 leading-relaxed ${plan.highlight ? "text-deep-black/60" : "text-taupe"}`}>
                  {plan.desc}
                </p>
              </div>

              <ul className="space-y-2.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="mt-0.5 flex-shrink-0">
                      <circle cx="7" cy="7" r="7" fill={plan.highlight ? "#0E0E0E" : "rgba(253,253,253,0.1)"} />
                      <path d="M4 7l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className={`font-inter text-sm ${plan.highlight ? "text-deep-black/70" : "text-silver/70"}`}>{f}</span>
                  </li>
                ))}
              </ul>

              <a href={`/enroll?plan=${plan.query_param}`}
                className={`block text-center font-inter font-medium text-sm py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                  plan.highlight
                    ? "bg-deep-black text-pure-white hover:bg-charcoal"
                    : "border border-white/15 text-pure-white hover:border-white/40 hover:bg-white/5"
                }`}>
                Reserve This Plan
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
