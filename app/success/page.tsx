"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

function SuccessContent() {
  const p = useSearchParams();
  const name = p.get("name") || "Student";
  const plan = p.get("plan") || "";
  const paymentId = p.get("payment_id") || "";
  const amount = p.get("amount") || "";

  return (
    <div className="min-h-screen bg-deep-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease }}
        className="max-w-lg w-full glass rounded-3xl p-10 md:p-14 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 180 }}
          className="w-20 h-20 rounded-full border border-white/15 flex items-center justify-center mx-auto mb-8"
          style={{ background: "rgba(253,253,253,0.06)" }}
        >
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <path d="M6 16l7 7L26 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <h1 className="font-display font-bold text-pure-white mb-3"
          style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1 }}>
          Congratulations!
        </h1>
        <p className="font-inter text-base text-taupe mb-10">
          Your seat has been reserved successfully. Welcome to the family.
        </p>

        <div className="space-y-3 text-left mb-10">
          {[["Student Name", name], ["Selected Plan", plan], ["Amount Paid", amount], ["Payment ID", paymentId]].map(([label, val]) => (
            <div key={label} className="flex justify-between items-start gap-4 border-b border-white/5 pb-3 last:border-0">
              <span className="font-inter text-xs text-taupe uppercase tracking-wide flex-shrink-0">{label}</span>
              <span className="font-inter text-sm text-pure-white text-right break-all">{val}</span>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <a href="https://wa.me/919623252626" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full bg-pure-white text-deep-black font-inter font-semibold text-sm py-4 rounded-xl hover:bg-silver hover:scale-[1.02] active:scale-[0.98] transition-all">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Join WhatsApp Group
          </a>
          <Link href="/"
            className="flex items-center justify-center w-full border border-white/12 text-pure-white font-inter text-sm py-4 rounded-xl hover:border-white/30 hover:bg-white/4 transition-all">
            Back to Home
          </Link>
        </div>

        <p className="font-inter text-xs text-taupe mt-8">
          Confirmation will be sent to your WhatsApp within 24 hours.
        </p>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-black" />}>
      <SuccessContent />
    </Suspense>
  );
}
