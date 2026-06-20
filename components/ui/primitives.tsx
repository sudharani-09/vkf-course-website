"use client";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const ease = [0.16, 1, 0.3, 1] as const;
export const scrollTransition = { duration: 0.45, ease } as const;

export function FadeUp({
  children, delay = 0, className = "", once = true,
}: { children: ReactNode; delay?: number; className?: string; once?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-8% 0px" });
  return (
    <motion.div ref={ref} initial={{ y: 48, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.65, ease, delay }}
      className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({
  children, delay = 0, className = "",
}: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-4% 0px" });
  return (
    <motion.div ref={ref} initial={{ scale: 0.96, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay, ease }}
      className={className}>
      {children}
    </motion.div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return <span className="label-tag">{children}</span>;
}

export function SectionHeading({
  children, className = "",
}: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display font-bold text-pure-white leading-tight-1 ${className}`}
      style={{ fontSize: "clamp(2.25rem, 5vw, 4.5rem)", letterSpacing: "-0.02em" }}>
      {children}
    </h2>
  );
}
