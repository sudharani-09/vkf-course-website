"use client";

import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Users,
  Settings,
  Image as ImageIcon,
  IndianRupee,
  HelpCircle,
  BookOpen,
  Layers,
  LogOut,
  Download,
  Trash2,
  Plus,
  Save,
  Upload,
  Loader2,
} from "lucide-react";

type Tab =
  | "overview"
  | "batch"
  | "enquiries"
  | "enrollments"
  | "settings"
  | "media"
  | "pricing"
  | "faq"
  | "curriculum"
  | "content"
  | "gallery";

type AdminFaq = {
  id?: string | number;
  question?: string;
  answer?: string;
  sort_order?: number;
};

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
  { id: "batch", label: "Batch Date", icon: <Calendar size={16} /> },
  { id: "enquiries", label: "Enquiries", icon: <MessageSquare size={16} /> },
  { id: "enrollments", label: "Enrollments", icon: <Users size={16} /> },
  { id: "settings", label: "Site Settings", icon: <Settings size={16} /> },
  { id: "media", label: "Media & Videos", icon: <ImageIcon size={16} /> },
  { id: "pricing", label: "Pricing", icon: <IndianRupee size={16} /> },
  { id: "faq", label: "FAQ", icon: <HelpCircle size={16} /> },
  { id: "curriculum", label: "Curriculum", icon: <BookOpen size={16} /> },
  { id: "content", label: "Page Content", icon: <Layers size={16} /> },
  { id: "gallery", label: "Gallery & Reviews", icon: <ImageIcon size={16} /> },
];

async function apiFetch<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, opts);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

function Toast({ msg, type }: { msg: string; type: "success" | "error" }) {
  return (
    <div className={`admin-toast ${type === "success" ? "admin-toast-success" : "admin-toast-error"}`}>
      {msg}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  rows?: number;
}) {
  return (
    <div className="mb-4">
      <label className="admin-label">{label}</label>
      {rows ? (
        <textarea
          className="admin-input resize-y min-h-[80px]"
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input className="admin-input" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function UploadField({
  label,
  currentUrl,
  folder,
  accept,
  onUploaded,
}: {
  label: string;
  currentUrl: string;
  folder: string;
  accept: string;
  onUploaded: (url: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onUploaded(data.url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-5 p-4 border border-zinc-200 rounded-lg">
      <label className="admin-label">{label}</label>
      {currentUrl && (
        <p className="text-xs text-zinc-500 mb-2 break-all">Current: {currentUrl}</p>
      )}
      {currentUrl && (currentUrl.match(/\.(jpg|jpeg|png|webp|gif)/i) || currentUrl.includes("image")) && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={currentUrl} alt="" className="w-32 h-32 object-cover rounded-lg mb-3 border" />
      )}
      <label className="admin-btn admin-btn-secondary cursor-pointer inline-flex">
        {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        {uploading ? "Uploading…" : "Upload New File"}
        <input type="file" accept={accept} className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
    </div>
  );
}

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("overview");
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [loading, setLoading] = useState(false);
  const [overview, setOverview] = useState<{ enquiries: number; enrollments: number; batch: { batch_name: string; batch_date: string } | null } | null>(null);

  const [settings, setSettings] = useState<Record<string, string>>({});
  const [batches, setBatches] = useState<Record<string, unknown>[]>([]);
  const [enquiries, setEnquiries] = useState<Record<string, unknown>[]>([]);
  const [enrollments, setEnrollments] = useState<Record<string, unknown>[]>([]);
  const [pricing, setPricing] = useState<Record<string, unknown>[]>([]);
  const [faqs, setFaqs] = useState<AdminFaq[]>([]);
  const [curriculum, setCurriculum] = useState<Record<string, unknown>[]>([]);
  const [batchDetails, setBatchDetails] = useState<Record<string, unknown>[]>([]);
  const [transformation, setTransformation] = useState<Record<string, unknown>[]>([]);
  const [mentorCreds, setMentorCreds] = useState<Record<string, unknown>[]>([]);
  const [stats, setStats] = useState<Record<string, unknown>[]>([]);
  const [reels, setReels] = useState<Record<string, unknown>[]>([]);
  const [gallery, setGallery] = useState<Record<string, unknown>[]>([]);
  const [reviews, setReviews] = useState<Record<string, unknown>[]>([]);
  const [newBatch, setNewBatch] = useState({ batch_name: "Batch 17", batch_date: "2026-08-30" });

  const notify = useCallback((msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const loadTable = useCallback(async (table: string) => {
    const { data } = await apiFetch<{ data: unknown }>(`/api/admin/data?table=${table}`);
    return data;
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [ov, sett, bat, enq, enr, pr, fq, cur, bd, tr, mc, st, rl, gal, rev] = await Promise.all([
        apiFetch<{ enquiries: number; enrollments: number; batch: unknown }>("/api/admin/overview"),
        loadTable("site_settings"),
        loadTable("batch_info"),
        loadTable("enquiries"),
        loadTable("enrollments"),
        loadTable("pricing_plans"),
        loadTable("faqs"),
        loadTable("curriculum_modules"),
        loadTable("batch_details"),
        loadTable("transformation_items"),
        loadTable("mentor_credentials"),
        loadTable("stats"),
        loadTable("instagram_reels"),
        loadTable("student_gallery"),
        loadTable("review_images"),
      ]);
      setOverview(ov as typeof overview);
      setSettings(sett as Record<string, string>);
      setBatches(bat as Record<string, unknown>[]);
      setEnquiries(enq as Record<string, unknown>[]);
      setEnrollments(enr as Record<string, unknown>[]);
      setPricing(pr as Record<string, unknown>[]);
      setFaqs(fq as AdminFaq[]);
      setCurriculum(cur as Record<string, unknown>[]);
      setBatchDetails(bd as Record<string, unknown>[]);
      setTransformation(tr as Record<string, unknown>[]);
      setMentorCreds(mc as Record<string, unknown>[]);
      setStats(st as Record<string, unknown>[]);
      setReels(rl as Record<string, unknown>[]);
      setGallery(gal as Record<string, unknown>[]);
      setReviews(rev as Record<string, unknown>[]);
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }, [loadTable, notify]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const saveSettings = async () => {
    try {
      await apiFetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "site_settings", row: settings }),
      });
      notify("Settings saved!");
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Save failed", "error");
    }
  };

  const saveRow = async (table: string, row: Record<string, unknown>, id?: string) => {
    try {
      if (id) {
        await apiFetch("/api/admin/data", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table, row, id }),
        });
      } else {
        await apiFetch("/api/admin/data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ table, row }),
        });
      }
      notify("Saved!");
      await loadAll();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Save failed", "error");
    }
  };

  const deleteRow = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      await apiFetch(`/api/admin/data?table=${table}&id=${id}`, { method: "DELETE" });
      notify("Deleted");
      await loadAll();
    } catch (err: unknown) {
      notify(err instanceof Error ? err.message : "Delete failed", "error");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.reload();
  };

const activeBatch =
  batches.find((b: any) => b.is_active === true) ||
  batches[0];  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-zinc-200 p-4 flex flex-col fixed h-full z-10">
        <div className="mb-6 px-2">
          <h1 className="font-semibold text-lg">VKF Admin</h1>
          <p className="text-xs text-zinc-500 mt-1">Manage your website</p>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`admin-tab flex items-center gap-2 ${tab === t.id ? "admin-tab-active" : ""}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
        <button onClick={logout} className="admin-tab flex items-center gap-2 text-red-600 mt-4">
          <LogOut size={16} /> Log Out
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {loading && tab === "overview" && (
          <div className="flex items-center gap-2 text-zinc-500 mb-4">
            <Loader2 size={16} className="animate-spin" /> Loading…
          </div>
        )}

        {tab === "overview" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="admin-card p-6">
                <p className="text-sm text-zinc-500">Contact Enquiries</p>
                <p className="text-3xl font-bold mt-1">{overview?.enquiries ?? "—"}</p>
              </div>
              <div className="admin-card p-6">
                <p className="text-sm text-zinc-500">Enrollments</p>
                <p className="text-3xl font-bold mt-1">{overview?.enrollments ?? "—"}</p>
              </div>
              <div className="admin-card p-6">
                <p className="text-sm text-zinc-500">Active Batch</p>
                <p className="text-xl font-bold mt-1">{overview?.batch?.batch_name ?? "None"}</p>
                <p className="text-sm text-zinc-500">{overview?.batch?.batch_date ?? ""}</p>
              </div>
            </div>
            <div className="admin-card p-6 mt-6">
              <h3 className="font-semibold mb-2">Quick Tips</h3>
              <ul className="text-sm text-zinc-600 space-y-1 list-disc pl-5">
                <li>Change batch date under <strong>Batch Date</strong></li>
                <li>View student sign-ups under <strong>Enrollments</strong></li>
                <li>Edit prices under <strong>Pricing</strong></li>
                <li>Upload photos under <strong>Media & Videos</strong> or <strong>Gallery</strong></li>
              </ul>
            </div>
          </div>
        )}

        {tab === "batch" && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Batch Date</h2>
            <p className="text-sm text-zinc-500 mb-6">This date shows on your homepage countdown.</p>
            {activeBatch ? (
              <div className="admin-card p-6 max-w-lg">
                <Field label="Batch Name" value={String(activeBatch.batch_name ?? "")} onChange={(v) => setBatches(batches.map((b) => b.id === activeBatch.id ? { ...b, batch_name: v } : b))} />
                <Field label="Batch Date (YYYY-MM-DD)" value={String(activeBatch.batch_date ?? "").slice(0, 10)} onChange={(v) => setBatches(batches.map((b) => b.id === activeBatch.id ? { ...b, batch_date: v } : b))} />
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => saveRow("batch_info", { batch_name: activeBatch.batch_name, batch_date: activeBatch.batch_date, is_active: true }, String(activeBatch.id))}
                >
                  <Save size={14} /> Save Batch Date
                </button>
              </div>
            ) : (
              <div className="admin-card p-6 max-w-lg">
                <p className="text-sm text-zinc-500 mb-4">No active batch found. Create one:</p>
                <Field label="Batch Name" value={newBatch.batch_name} onChange={(v) => setNewBatch({ ...newBatch, batch_name: v })} />
                <Field label="Batch Date (YYYY-MM-DD)" value={newBatch.batch_date} onChange={(v) => setNewBatch({ ...newBatch, batch_date: v })} />
                <button
                  className="admin-btn admin-btn-primary"
                  onClick={() => saveRow("batch_info", { ...newBatch, is_active: true })}
                >
                  <Plus size={14} /> Create Batch
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "enquiries" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Enquiries</h2>
            <div className="admin-card overflow-hidden">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Phone</th><th>Email</th><th>Message</th><th>Date</th><th></th></tr>
                </thead>
                <tbody>
                  {enquiries.map((e) => (
                    <tr key={String(e.id)}>
                      <td>{String(e.name)}</td>
                      <td>{String(e.phone)}</td>
                      <td>{String(e.email)}</td>
                      <td className="max-w-xs truncate">{String(e.message)}</td>
                      <td className="text-xs text-zinc-500">{String(e.created_at).slice(0, 10)}</td>
                      <td>
                        <button className="admin-btn admin-btn-danger text-xs py-1 px-2" onClick={() => deleteRow("enquiries", String(e.id))}>
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!enquiries.length && <tr><td colSpan={6} className="text-center text-zinc-400 py-8">No enquiries yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "enrollments" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Enrollments</h2>
              <a href="/api/admin/export/enrollments" className="admin-btn admin-btn-primary">
                <Download size={14} /> Download CSV
              </a>
            </div>
            <div className="admin-card overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr><th>Name</th><th>Phone</th><th>Email</th><th>Plan</th><th>Amount</th><th>Date</th><th></th></tr>
                </thead>
                <tbody>
                  {enrollments.map((e) => (
                    <tr key={String(e.id)}>
                      <td>{String(e.name)}</td>
                      <td>{String(e.phone)}</td>
                      <td>{String(e.email)}</td>
                      <td>{String(e.selected_plan)}</td>
                      <td>{String(e.amount)}</td>
                      <td className="text-xs text-zinc-500">{String(e.created_at).slice(0, 10)}</td>
                      <td>
                        <button className="admin-btn admin-btn-danger text-xs py-1 px-2" onClick={() => deleteRow("enrollments", String(e.id))}>
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!enrollments.length && <tr><td colSpan={7} className="text-center text-zinc-400 py-8">No enrollments yet</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "settings" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Site Settings</h2>
            <div className="admin-card p-6 max-w-2xl">
              <Field label="WhatsApp Number (with country code, no +)" value={settings.whatsapp_number ?? ""} onChange={(v) => setSettings({ ...settings, whatsapp_number: v })} />
              <Field label="Phone Display" value={settings.phone_display ?? ""} onChange={(v) => setSettings({ ...settings, phone_display: v })} />
              <Field label="Email" value={settings.email ?? ""} onChange={(v) => setSettings({ ...settings, email: v })} />
              <Field label="Instagram URL" value={settings.instagram_url ?? ""} onChange={(v) => setSettings({ ...settings, instagram_url: v })} />
              <Field label="Hero Title" value={settings.hero_title ?? ""} onChange={(v) => setSettings({ ...settings, hero_title: v })} />
              <Field label="Hero Tagline" value={settings.hero_tagline ?? ""} onChange={(v) => setSettings({ ...settings, hero_tagline: v })} />
              <Field label="Mentor Name" value={settings.mentor_name ?? ""} onChange={(v) => setSettings({ ...settings, mentor_name: v })} />
              <Field label="Mentor Bio (paragraph 1)" value={settings.mentor_bio_1 ?? ""} onChange={(v) => setSettings({ ...settings, mentor_bio_1: v })} rows={3} />
              <Field label="Mentor Bio (paragraph 2)" value={settings.mentor_bio_2 ?? ""} onChange={(v) => setSettings({ ...settings, mentor_bio_2: v })} rows={3} />
              <Field label="Pricing Subtitle" value={settings.pricing_subtitle ?? ""} onChange={(v) => setSettings({ ...settings, pricing_subtitle: v })} />
              <Field label="Contact Subtitle" value={settings.contact_subtitle ?? ""} onChange={(v) => setSettings({ ...settings, contact_subtitle: v })} />
              <Field label="Footer Tagline" value={settings.footer_tagline ?? ""} onChange={(v) => setSettings({ ...settings, footer_tagline: v })} />
              <button className="admin-btn admin-btn-primary mt-2" onClick={saveSettings}>
                <Save size={14} /> Save Settings
              </button>
            </div>
          </div>
        )}

        {tab === "media" && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">Media & Videos</h2>
            <p className="text-sm text-zinc-500 mb-6">Upload new files — the URL updates automatically on your website.</p>
            <div className="admin-card p-6 max-w-2xl">
              <UploadField label="Hero Background Video" currentUrl={settings.hero_video_url ?? ""} folder="hero" accept="video/*" onUploaded={(url) => setSettings({ ...settings, hero_video_url: url })} />
              <UploadField label="Hero Poster Image" currentUrl={settings.hero_poster_url ?? ""} folder="hero" accept="image/*" onUploaded={(url) => setSettings({ ...settings, hero_poster_url: url })} />
              <UploadField label="Mentor Photo" currentUrl={settings.mentor_image_url ?? ""} folder="mentor" accept="image/*" onUploaded={(url) => setSettings({ ...settings, mentor_image_url: url })} />
              <UploadField label="Course Detail Video" currentUrl={settings.course_video_url ?? ""} folder="course" accept="video/*" onUploaded={(url) => setSettings({ ...settings, course_video_url: url })} />
              <UploadField label="Course Video Thumbnail" currentUrl={settings.course_thumb_url ?? ""} folder="course" accept="image/*" onUploaded={(url) => setSettings({ ...settings, course_thumb_url: url })} />
              <button className="admin-btn admin-btn-primary" onClick={saveSettings}>
                <Save size={14} /> Save Media URLs
              </button>
            </div>
          </div>
        )}

        {tab === "pricing" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Pricing Plans</h2>
            <div className="space-y-4">
              {pricing.map((plan, idx) => (
                <div key={String(plan.id)} className="admin-card p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Plan Label" value={String(plan.label)} onChange={(v) => { const n = [...pricing]; n[idx] = { ...plan, label: v }; setPricing(n); }} />
                    <Field label="Price" value={String(plan.price)} onChange={(v) => { const n = [...pricing]; n[idx] = { ...plan, price: v }; setPricing(n); }} />
                    <Field label="Description" value={String(plan.desc)} onChange={(v) => { const n = [...pricing]; n[idx] = { ...plan, desc: v }; setPricing(n); }} />
                    <Field label="Features (one per line)" value={(plan.features as string[])?.join("\n") ?? ""} onChange={(v) => { const n = [...pricing]; n[idx] = { ...plan, features: v.split("\n").filter(Boolean) }; setPricing(n); }} rows={4} />
                  </div>
                  <button className="admin-btn admin-btn-primary mt-2" onClick={() => saveRow("pricing_plans", { label: plan.label, price: plan.price, desc: plan.desc, features: plan.features, slug: plan.slug, query_param: plan.query_param, highlight: plan.highlight, sort_order: plan.sort_order }, String(plan.id))}>
                    <Save size={14} /> Save Plan
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "faq" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">FAQ</h2>
              <button className="admin-btn admin-btn-secondary" onClick={() => setFaqs([...faqs, { question: "New question?", answer: "Answer here.", sort_order: faqs.length + 1 }])}>
                <Plus size={14} /> Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={String(faq.id ?? idx)} className="admin-card p-6">
                  <Field label="Question" value={String(faq.question ?? "")} onChange={(v) => { const n = [...faqs]; n[idx] = { ...faq, question: v }; setFaqs(n); }} />
                  <Field label="Answer" value={String(faq.answer ?? "")} onChange={(v) => { const n = [...faqs]; n[idx] = { ...faq, answer: v }; setFaqs(n); }} rows={3} />
                  <div className="flex gap-2">
                    {faq.id && (
                      <>
                        <button className="admin-btn admin-btn-primary" onClick={() => saveRow("faqs", { question: faq.question, answer: faq.answer, sort_order: faq.sort_order ?? idx + 1 }, String(faq.id))}>
                          <Save size={14} /> Save
                        </button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteRow("faqs", String(faq.id))}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </>
                    )}
                    {!faq.id && (
                      <button className="admin-btn admin-btn-primary" onClick={() => saveRow("faqs", { question: faq.question, answer: faq.answer, sort_order: idx + 1 })}>
                        <Plus size={14} /> Create
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "curriculum" && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Curriculum Modules</h2>
            <div className="space-y-4">
              {curriculum.map((mod, idx) => (
                <div key={String(mod.id)} className="admin-card p-6">
                  <Field label={`Module ${mod.module_number} Title`} value={String(mod.title)} onChange={(v) => { const n = [...curriculum]; n[idx] = { ...mod, title: v }; setCurriculum(n); }} />
                  <Field label="Bullet Points (one per line)" value={(mod.points as string[])?.join("\n") ?? ""} onChange={(v) => { const n = [...curriculum]; n[idx] = { ...mod, points: v.split("\n").filter(Boolean) }; setCurriculum(n); }} rows={5} />
                  <button className="admin-btn admin-btn-primary" onClick={() => saveRow("curriculum_modules", { module_number: mod.module_number, title: mod.title, points: mod.points, sort_order: mod.sort_order }, String(mod.id))}>
                    <Save size={14} /> Save Module
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "content" && (
          <div className="space-y-10">
            <section>
              <h2 className="text-xl font-semibold mb-4">Batch Info Cards</h2>
              {batchDetails.map((item, idx) => (
                <div key={String(item.id)} className="admin-card p-4 mb-3 grid md:grid-cols-3 gap-3">
                  <Field label="Icon" value={String(item.icon)} onChange={(v) => { const n = [...batchDetails]; n[idx] = { ...item, icon: v }; setBatchDetails(n); }} />
                  <Field label="Title" value={String(item.title)} onChange={(v) => { const n = [...batchDetails]; n[idx] = { ...item, title: v }; setBatchDetails(n); }} />
                  <Field label="Description" value={String(item.desc)} onChange={(v) => { const n = [...batchDetails]; n[idx] = { ...item, desc: v }; setBatchDetails(n); }} />
                  <button className="admin-btn admin-btn-primary md:col-span-3 w-fit" onClick={() => saveRow("batch_details", item, String(item.id))}><Save size={14} /> Save</button>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Why Join (Transformation)</h2>
              {transformation.map((item, idx) => (
                <div key={String(item.id)} className="admin-card p-4 mb-3">
                  <Field label="Title" value={String(item.title)} onChange={(v) => { const n = [...transformation]; n[idx] = { ...item, title: v }; setTransformation(n); }} />
                  <Field label="Description" value={String(item.desc)} onChange={(v) => { const n = [...transformation]; n[idx] = { ...item, desc: v }; setTransformation(n); }} rows={2} />
                  <button className="admin-btn admin-btn-primary" onClick={() => saveRow("transformation_items", item, String(item.id))}><Save size={14} /> Save</button>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Mentor Credentials</h2>
              {mentorCreds.map((item, idx) => (
                <div key={String(item.id)} className="admin-card p-4 mb-3 grid md:grid-cols-2 gap-3">
                  <Field label="Icon" value={String(item.icon)} onChange={(v) => { const n = [...mentorCreds]; n[idx] = { ...item, icon: v }; setMentorCreds(n); }} />
                  <Field label="Label" value={String(item.label)} onChange={(v) => { const n = [...mentorCreds]; n[idx] = { ...item, label: v }; setMentorCreds(n); }} />
                  <button className="admin-btn admin-btn-primary md:col-span-2 w-fit" onClick={() => saveRow("mentor_credentials", item, String(item.id))}><Save size={14} /> Save</button>
                </div>
              ))}
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Stats Marquee</h2>
              {stats.map((item, idx) => (
                <div key={String(item.id)} className="admin-card p-4 mb-3 grid md:grid-cols-2 gap-3">
                  <Field label="Value" value={String(item.value)} onChange={(v) => { const n = [...stats]; n[idx] = { ...item, value: v }; setStats(n); }} />
                  <Field label="Label" value={String(item.label)} onChange={(v) => { const n = [...stats]; n[idx] = { ...item, label: v }; setStats(n); }} />
                  <button className="admin-btn admin-btn-primary md:col-span-2 w-fit" onClick={() => saveRow("stats", item, String(item.id))}><Save size={14} /> Save</button>
                </div>
              ))}
            </section>
          </div>
        )}

        {tab === "gallery" && (
          <div className="space-y-10">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Instagram Reels</h2>
                <button className="admin-btn admin-btn-secondary" onClick={() => setReels([...reels, { url: "", title: "", sub: "", thumb_url: "", sort_order: reels.length + 1 }])}><Plus size={14} /> Add</button>
              </div>
              {reels.map((reel, idx) => (
                <div key={String(reel.id ?? idx)} className="admin-card p-4 mb-3">
                  <Field label="Instagram URL" value={String(reel.url ?? "")} onChange={(v) => { const n = [...reels]; n[idx] = { ...reel, url: v }; setReels(n); }} />
                  <Field label="Title" value={String(reel.title ?? "")} onChange={(v) => { const n = [...reels]; n[idx] = { ...reel, title: v }; setReels(n); }} />
                  <Field label="Subtitle" value={String(reel.sub ?? "")} onChange={(v) => { const n = [...reels]; n[idx] = { ...reel, sub: v }; setReels(n); }} />
                  <UploadField label="Thumbnail" currentUrl={String(reel.thumb_url ?? "")} folder="reels" accept="image/*" onUploaded={(url) => { const n = [...reels]; n[idx] = { ...reel, thumb_url: url }; setReels(n); }} />
                  <div className="flex gap-2">
                    {reel.id ? (
                      <>
                        <button className="admin-btn admin-btn-primary" onClick={() => saveRow("instagram_reels", reel, String(reel.id))}><Save size={14} /> Save</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteRow("instagram_reels", String(reel.id))}><Trash2 size={14} /> Delete</button>
                      </>
                    ) : (
                      <button className="admin-btn admin-btn-primary" onClick={() => saveRow("instagram_reels", reel)}><Plus size={14} /> Create</button>
                    )}
                  </div>
                </div>
              ))}
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Student Gallery Photos</h2>
                <button className="admin-btn admin-btn-secondary" onClick={() => setGallery([...gallery, { image_url: "", batch: "", label: "", sort_order: gallery.length + 1 }])}><Plus size={14} /> Add</button>
              </div>
              {gallery.map((item, idx) => (
                <div key={String(item.id ?? idx)} className="admin-card p-4 mb-3">
                  <Field label="Batch" value={String(item.batch ?? "")} onChange={(v) => { const n = [...gallery]; n[idx] = { ...item, batch: v }; setGallery(n); }} />
                  <Field label="Label" value={String(item.label ?? "")} onChange={(v) => { const n = [...gallery]; n[idx] = { ...item, label: v }; setGallery(n); }} />
                  <UploadField label="Photo" currentUrl={String(item.image_url ?? "")} folder="gallery" accept="image/*" onUploaded={(url) => { const n = [...gallery]; n[idx] = { ...item, image_url: url }; setGallery(n); }} />
                  <div className="flex gap-2">
                    {item.id ? (
                      <>
                        <button className="admin-btn admin-btn-primary" onClick={() => saveRow("student_gallery", item, String(item.id))}><Save size={14} /> Save</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteRow("student_gallery", String(item.id))}><Trash2 size={14} /> Delete</button>
                      </>
                    ) : (
                      <button className="admin-btn admin-btn-primary" onClick={() => saveRow("student_gallery", item)}><Plus size={14} /> Create</button>
                    )}
                  </div>
                </div>
              ))}
            </section>
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Review Screenshots</h2>
                <button className="admin-btn admin-btn-secondary" onClick={() => setReviews([...reviews, { image_url: "", alt: "", sort_order: reviews.length + 1 }])}><Plus size={14} /> Add</button>
              </div>
              {reviews.map((item, idx) => (
                <div key={String(item.id ?? idx)} className="admin-card p-4 mb-3">
                  <Field label="Alt Text" value={String(item.alt ?? "")} onChange={(v) => { const n = [...reviews]; n[idx] = { ...item, alt: v }; setReviews(n); }} />
                  <UploadField label="Review Image" currentUrl={String(item.image_url ?? "")} folder="reviews" accept="image/*" onUploaded={(url) => { const n = [...reviews]; n[idx] = { ...item, image_url: url }; setReviews(n); }} />
                  <div className="flex gap-2">
                    {item.id ? (
                      <>
                        <button className="admin-btn admin-btn-primary" onClick={() => saveRow("review_images", item, String(item.id))}><Save size={14} /> Save</button>
                        <button className="admin-btn admin-btn-danger" onClick={() => deleteRow("review_images", String(item.id))}><Trash2 size={14} /> Delete</button>
                      </>
                    ) : (
                      <button className="admin-btn admin-btn-primary" onClick={() => saveRow("review_images", item)}><Plus size={14} /> Create</button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}
      </main>

      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="admin-card p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold mb-1">VKF Admin</h1>
        <p className="text-sm text-zinc-500 mb-6">Enter your password to manage the website.</p>
        <form onSubmit={submit}>
          <label className="admin-label">Password</label>
          <input
            type="password"
            className="admin-input mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your admin password"
            autoFocus
          />
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <button type="submit" disabled={loading} className="admin-btn admin-btn-primary w-full">
            {loading ? <Loader2 size={14} className="animate-spin" /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

export function AdminApp() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((r) => r.json())
      .then((d) => setAuthed(d.authenticated))
      .catch(() => setAuthed(false));
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-zinc-400" />
      </div>
    );
  }

  if (!authed) return <LoginForm onSuccess={() => setAuthed(true)} />;
  return <AdminPanel />;
}
