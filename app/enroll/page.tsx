"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { buildEnrollmentMessage, buildWhatsAppUrlFromCms } from "@/lib/whatsapp";
import { DEFAULT_PRICING, type PricingPlan } from "@/lib/cms";

const EXPERIENCE = ["Complete Beginner", "Some Basic Editing", "Intermediate Editor", "Professional Videographer"];

const ease = [0.16, 1, 0.3, 1] as const;

function EnrollForm() {
  const params = useSearchParams();
  const planParam = params.get("plan") || "";

  const [plans, setPlans] = useState<PricingPlan[]>(DEFAULT_PRICING);
  const [whatsappNumber, setWhatsappNumber] = useState("919623252626");

  useEffect(() => {
    fetch("/api/cms")
      .then((r) => r.json())
      .then((data) => {
        if (data.pricing?.length) setPlans(data.pricing);
        if (data.settings?.whatsapp_number) setWhatsappNumber(data.settings.whatsapp_number);
      })
      .catch(() => {});
  }, []);

  const matchedPlan = plans.find((p) => p.query_param === planParam);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", experience: "",
    plan: matchedPlan?.query_param || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (matchedPlan) setForm((f) => ({ ...f, plan: matchedPlan.query_param }));
  }, [matchedPlan]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Valid 10-digit number required";
    if (!form.address.trim()) e.address = "Required";
    if (!form.experience) e.experience = "Required";
    if (!form.plan) e.plan = "Select a plan";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    const selectedPlan = plans.find((p) => p.query_param === form.plan)!;

    try {
      await fetch("/api/save-enrollment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          amount: selectedPlan.price,
          payment_status: "pending_whatsapp",
          payment_id: null,
        }),
      });
    } catch {
      // Continue to WhatsApp even if Supabase save fails
    }

    const message = buildEnrollmentMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      experience: form.experience,
      planLabel: selectedPlan.label,
      planPrice: selectedPlan.price,
    });

    window.location.href = buildWhatsAppUrlFromCms(message, whatsappNumber);
  };

  const field = (id: keyof typeof form, label: string, type = "text", ph = "") => (
    <div>
      <label className="font-inter text-[10px] tracking-[0.25em] uppercase text-taupe block mb-1.5">{label}</label>
      <input type={type} placeholder={ph} value={form[id]}
        onChange={(e) => setForm({ ...form, [id]: e.target.value })}
        className={`input-field ${errors[id] ? "input-field-error" : ""}`}
      />
      {errors[id] && <p className="font-inter text-xs text-red-400 mt-1">{errors[id]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-deep-black px-4 py-28">
      <div className="max-w-2xl mx-auto">
        <Link href="/"
          className="inline-flex items-center gap-2 font-inter text-sm text-taupe hover:text-pure-white transition-colors mb-10 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="mb-10">
            <span className="label-tag">Enrollment</span>
            <h1 className="font-display font-bold text-pure-white mt-5"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95, letterSpacing: "-0.02em" }}>
              Reserve Your<br />
              <em className="font-light italic text-silver">Seat</em>
            </h1>
            <p className="font-inter text-base text-taupe mt-5 leading-relaxed">
              10 seats only. Fill in your details and continue on WhatsApp to confirm your spot.
            </p>
          </div>

          <div className="glass rounded-3xl p-7 md:p-10 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {field("name", "Full Name", "text", "Your full name")}
                {field("email", "Email Address", "email", "your@email.com")}
                {field("phone", "Phone Number", "tel", "10-digit mobile")}
              </div>
              {field("address", "Full Address", "text", "City, State")}

              <div>
                <label className="font-inter text-[10px] tracking-[0.25em] uppercase text-taupe block mb-1.5">Experience Level</label>
                <select value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })}
                  className={`input-field ${errors.experience ? "input-field-error" : ""}`}>
                  <option value="" disabled>Select your level</option>
                  {EXPERIENCE.map((ex) => <option key={ex} value={ex} className="bg-[#1a1a1a]">{ex}</option>)}
                </select>
                {errors.experience && <p className="font-inter text-xs text-red-400 mt-1">{errors.experience}</p>}
              </div>

              <div>
                <label className="font-inter text-[10px] tracking-[0.25em] uppercase text-taupe block mb-3">Select Plan</label>
                <div className="space-y-3">
                  {plans.map((p) => (
                    <label key={p.query_param}
                      className={`flex items-center gap-4 rounded-2xl px-5 py-4 cursor-pointer border transition-all duration-200 ${form.plan === p.query_param ? "border-white/30 bg-white/10" : "border-white/10 hover:border-white/20 bg-[#141414]"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${form.plan === p.query_param ? "border-pure-white" : "border-white/30"}`}>
                        {form.plan === p.query_param && <div className="w-2 h-2 rounded-full bg-pure-white" />}
                      </div>
                      <input type="radio" name="plan" value={p.query_param} checked={form.plan === p.query_param}
                        onChange={() => setForm({ ...form, plan: p.query_param })} className="sr-only" />
                      <div className="flex-1">
                        <p className="font-inter text-sm font-medium text-pure-white">{p.label}</p>
                        <p className="font-inter text-xs text-taupe">{p.desc}</p>
                      </div>
                      <span className="font-display font-bold text-pure-white text-lg">{p.price}</span>
                    </label>
                  ))}
                </div>
                {errors.plan && <p className="font-inter text-xs text-red-400 mt-1">{errors.plan}</p>}
              </div>

              <motion.button type="submit" disabled={loading}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full bg-[#F8F6F2] text-black font-inter font-semibold text-sm py-4 rounded-xl hover:bg-[#EDE8DF] transition-colors disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2.5">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {loading ? "Opening WhatsApp…" : "Continue on WhatsApp →"}
              </motion.button>

              <p className="font-inter text-xs text-taupe text-center">
                Your details will be sent via WhatsApp · We&apos;ll confirm your seat personally
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-deep-black" />}>
      <EnrollForm />
    </Suspense>
  );
}
