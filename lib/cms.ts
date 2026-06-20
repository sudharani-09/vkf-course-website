export type PricingPlan = {
  id: string;
  slug: string;
  label: string;
  price: string;
  query_param: string;
  highlight: boolean;
  desc: string;
  features: string[];
  sort_order: number;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
};

export type CurriculumModule = {
  id: string;
  module_number: string;
  title: string;
  points: string[];
  sort_order: number;
};

export type BatchDetail = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  accent: boolean;
  sort_order: number;
};

export type TransformationItem = {
  id: string;
  item_number: string;
  title: string;
  desc: string;
  sort_order: number;
};

export type MentorCredential = {
  id: string;
  icon: string;
  label: string;
  sort_order: number;
};

export type StatItem = {
  id: string;
  value: string;
  label: string;
  sort_order: number;
};

export type InstagramReel = {
  id: string;
  url: string;
  title: string;
  sub: string;
  thumb_url: string;
  sort_order: number;
};

export type StudentGalleryItem = {
  id: string;
  image_url: string;
  batch: string;
  label: string;
  sort_order: number;
};

export type ReviewImage = {
  id: string;
  image_url: string;
  alt: string;
  sort_order: number;
};

export type BatchInfo = {
  id?: string;
  batch_name: string;
  batch_date: string;
  is_active: boolean;
};

export type SiteSettings = {
  whatsapp_number: string;
  phone_display: string;
  email: string;
  instagram_url: string;
  hero_title: string;
  hero_tagline: string;
  mentor_name: string;
  mentor_bio_1: string;
  mentor_bio_2: string;
  hero_video_url: string;
  mentor_image_url: string;
  course_video_url: string;
  course_thumb_url: string;
  footer_tagline: string;
  pricing_subtitle: string;
  contact_subtitle: string;
};

export type CmsData = {
  settings: SiteSettings;
  pricing: PricingPlan[];
  faqs: Faq[];
  curriculum: CurriculumModule[];
  batchDetails: BatchDetail[];
  transformation: TransformationItem[];
  mentorCredentials: MentorCredential[];
  stats: StatItem[];
  instagramReels: InstagramReel[];
  studentGallery: StudentGalleryItem[];
  reviewImages: ReviewImage[];
  batch: BatchInfo | null;
};

export const DEFAULT_SETTINGS: SiteSettings = {
  whatsapp_number: "919623252626",
  phone_display: "+91 96232 52626",
  email: "vaibhavkulkarnifilms@gmail.com",
  instagram_url: "https://www.instagram.com/vaibhav_kulkarni_films",
  hero_title: "Vaibhav Kulkarni Films",
  hero_tagline: "Every Wedding Deserves Cinema",
  mentor_name: "Vaibhav Kulkarni",
  mentor_bio_1:
    "Professional wedding filmmaker, editor, and colorist based in Pune. With years of hands-on experience crafting cinematic wedding films, he built this mentorship to share what the industry doesn't teach.",
  mentor_bio_2:
    "His philosophy: the best way to learn filmmaking is to do it with real footage, honest feedback, and a mentor who has solved every problem you'll face in the field.",
  hero_video_url: "/hero-video.mp4",
  mentor_image_url: "/mentor.jpg",
  course_video_url: "/course-detail-video.mp4",
  course_thumb_url: "/course-detail-thumb.png",
  footer_tagline: "Every Wedding Deserves Cinema",
  pricing_subtitle: "One-time investment. Lifetime skill.",
  contact_subtitle: "Have questions before enrolling? Fill the form and we'll get back to you.",
};

export const DEFAULT_PRICING: PricingPlan[] = [
  {
    id: "seat",
    slug: "seat",
    label: "Advance Booking",
    price: "₹4,999",
    query_param: "advance",
    highlight: false,
    desc: "Reserve your spot. Balance due before batch starts.",
    features: ["Seat reservation", "Priority confirmation", "WhatsApp group access", "Balance ₹17,501 before batch"],
    sort_order: 1,
  },
  {
    id: "course",
    slug: "course",
    label: "Course Only",
    price: "₹22,500",
    query_param: "course",
    highlight: true,
    desc: "Full access to all 10 modules with personal mentorship.",
    features: ["All 10 modules", "Real project practice", "Personal mentorship", "Certificate of completion", "Lifetime community access"],
    sort_order: 2,
  },
  {
    id: "stay",
    slug: "stay",
    label: "Course + Stay & Food",
    price: "₹26,500",
    query_param: "full",
    highlight: false,
    desc: "Full course plus accommodation and meals for outstation students.",
    features: ["All 10 modules", "Accommodation in Pune", "Daily meals included", "Personal mentorship", "Certificate of completion"],
    sort_order: 3,
  },
];

export const DEFAULT_FAQS: Faq[] = [
  {
    id: "1",
    question: "Do I need prior editing experience to join?",
    answer:
      "No experience is required. The course starts from absolute basics — software setup, interface navigation, and first cuts. Whether you've never touched editing software or have some basic knowledge, you'll be guided step by step with real wedding footage.",
    sort_order: 1,
  },
  {
    id: "2",
    question: "What software will I learn?",
    answer:
      "Primary software: DaVinci Resolve (industry standard for color grading) and Adobe Premiere Pro. You'll also learn LUT creation, export pipelines, and client delivery formats used by professional wedding studios across India.",
    sort_order: 2,
  },
  {
    id: "3",
    question: "Is this online or in-person?",
    answer:
      "Fully in-person mentorship at our studio in Hadapsar, Fursungi, Pune. Being in-person means hands-on access to editing workstations, direct feedback from Vaibhav, and the focus that comes from a dedicated learning environment with only 10 students.",
    sort_order: 3,
  },
  {
    id: "4",
    question: "How long is the course and what are batch timings?",
    answer:
      "Each batch runs approximately 3–4 weeks depending on module pace and student progress. Daily sessions are scheduled in morning and evening slots. Exact batch dates and timings are shared after seat confirmation via WhatsApp.",
    sort_order: 4,
  },
  {
    id: "5",
    question: "What happens after I pay the ₹4,999 advance?",
    answer:
      "Your seat is reserved and you'll be added to the student WhatsApp group within 24 hours. The remaining balance is due before the batch start date. You'll receive the batch schedule, session details, and preparation materials via WhatsApp.",
    sort_order: 5,
  },
];

export const DEFAULT_CURRICULUM: CurriculumModule[] = [
  { id: "1", module_number: "01", title: "Software + Editing Foundation", points: ["Premiere Pro / DaVinci Resolve interface", "Project setup and media management", "Timeline workflow and keyboard shortcuts", "Codecs, frame rates, and resolutions", "Export settings for wedding deliverables"], sort_order: 1 },
  { id: "2", module_number: "02", title: "Shot Selection, Rhythm & Cutting Techniques", points: ["Choosing the right shot at the right moment", "J-cuts, L-cuts, and match cuts", "Building rhythm that matches music tempo", "Invisible cuts and continuity editing", "Pacing for emotional peaks"], sort_order: 2 },
  { id: "3", module_number: "03", title: "Creative Editing Tools & Effects", points: ["Speed ramps and slow motion", "Transitions that feel intentional", "Text animations and title design", "Overlays and film grain aesthetics", "Stabilization and lens correction"], sort_order: 3 },
  { id: "4", module_number: "04", title: "Music Theory for Editors", points: ["Understanding BPM and cutting to music", "Finding emotional beats in a track", "Licensed vs royalty-free music", "Creating audio beds and atmospheric layers", "When silence is more powerful than music"], sort_order: 4 },
  { id: "5", module_number: "05", title: "Storytelling for Wedding Films", points: ["Three-act structure in wedding films", "Working with natural audio and vows", "Building tension before the ceremony", "Capturing the emotional payoff", "Structuring a 10-minute feature film"], sort_order: 5 },
  { id: "6", module_number: "06", title: "Color Correction", points: ["Primary color correction fundamentals", "White balance and exposure correction", "Skin tone accuracy across lighting", "Matching shots from different cameras", "Node-based workflow in DaVinci Resolve"], sort_order: 6 },
  { id: "7", module_number: "07", title: "Color Grading", points: ["Creating visual mood and emotional tone", "Secondary corrections and selective grading", "Highlight and shadow control", "Creating cinematic contrast", "Developing a signature look"], sort_order: 7 },
  { id: "8", module_number: "08", title: "LUT Theory + LUT Creation", points: ["What LUTs are and how they work", "Technical vs creative LUTs", "Creating your own LUTs from scratch", "Packaging and selling LUTs", "LUT management workflow"], sort_order: 8 },
  { id: "9", module_number: "09", title: "Typography + Color Psychology + Branding", points: ["Font pairing for wedding films", "Title card design and animation", "Color psychology for different aesthetics", "Building a visual brand identity", "Creating branded deliverables"], sort_order: 9 },
  { id: "10", module_number: "10", title: "Industry Workflow + Monetization", points: ["Client communication and expectation management", "Pricing your editing services", "Building a portfolio that attracts clients", "Freelancing vs working with studios", "Growing from editor to filmmaker"], sort_order: 10 },
];

export const DEFAULT_BATCH_DETAILS: BatchDetail[] = [
  { id: "1", icon: "👥", title: "Only 10 Seats", desc: "Maximum 10 students per batch. Every student gets direct personal attention from the mentor.", accent: true, sort_order: 1 },
  { id: "2", icon: "📍", title: "Pune — Hadapsar", desc: "In-person sessions at our studio in Hadapsar, Fursungi, Pune. Fully equipped editing workstations.", accent: false, sort_order: 2 },
  { id: "3", icon: "🗣️", title: "Marathi & Hindi", desc: "All sessions conducted in Marathi and Hindi — so you learn in the language you think in.", accent: false, sort_order: 3 },
  { id: "4", icon: "🎯", title: "Personal Attention", desc: "Small batch means your work gets reviewed, questions get answered, and growth is tracked.", accent: false, sort_order: 4 },
];

export const DEFAULT_TRANSFORMATION: TransformationItem[] = [
  { id: "1", item_number: "01", title: "Learn the Complete Wedding Film Workflow", desc: "From footage organization to final cinematic delivery, understand the exact workflow used in real wedding projects.", sort_order: 1 },
  { id: "2", item_number: "02", title: "Master Professional Color Grading in DaVinci Resolve", desc: "Learn how to create premium wedding colors, skin tones, mood, and cinematic looks that clients love.", sort_order: 2 },
  { id: "3", item_number: "03", title: "Practical Training with Real Wedding Projects", desc: "Work on actual wedding footage instead of sample clips, so you gain real-world experience.", sort_order: 3 },
  { id: "4", item_number: "04", title: "Cinematography + Storytelling + Editing Together", desc: "Most courses teach only software. This course teaches how to think like a filmmaker and create emotional wedding films.", sort_order: 4 },
  { id: "5", item_number: "05", title: "Build a Career & Increase Your Income", desc: "Whether you're a photographer, videographer, or editor, learn skills that help you attract better clients and charge higher prices.", sort_order: 5 },
];

export const DEFAULT_MENTOR_CREDS: MentorCredential[] = [
  { id: "1", icon: "🎬", label: "Wedding Filmmaker & Editor", sort_order: 1 },
  { id: "2", icon: "🎨", label: "Professional Colorist", sort_order: 2 },
  { id: "3", icon: "👥", label: "Mentor to 100+ Students", sort_order: 3 },
  { id: "4", icon: "📍", label: "Pune, Maharashtra", sort_order: 4 },
];

export const DEFAULT_STATS: StatItem[] = [
  { id: "1", value: "100+", label: "Students Trained", sort_order: 1 },
  { id: "2", value: "10", label: "Seats Per Batch", sort_order: 2 },
  { id: "3", value: "17+", label: "Batches Completed", sort_order: 3 },
  { id: "4", value: "100%", label: "Practical Learning", sort_order: 4 },
];

export const DEFAULT_INSTAGRAM_REELS: InstagramReel[] = [
  { id: "1", url: "https://www.instagram.com/reel/C3PvBw9IOt_/?igsh=MWtpb3IzNDc0c2tsYg==/", title: "Batch 13", sub: "Certificate Ceremony", thumb_url: "/first.jpeg", sort_order: 1 },
  { id: "2", url: "https://www.instagram.com/reel/DYfRk7VisdT/?igsh=N2o4MG9idDNnaTRt/", title: "Batch 14", sub: "Live Editing Session", thumb_url: "/second.jpeg", sort_order: 2 },
  { id: "3", url: "https://www.instagram.com/reel/DYj4tvpCGza/?igsh=MXZlbzI1NTIwdTB6aA==/", title: "Batch 15", sub: "Teaching Methodology", thumb_url: "/third.jpeg", sort_order: 3 },
  { id: "4", url: "https://www.instagram.com/reel/DYZwoRlMyxe/?igsh=MWg3cTdlbGxocTRtcQ==/", title: "Batch 16", sub: "Practical Color Grading", thumb_url: "/batch15.jpg", sort_order: 4 },
];

export const DEFAULT_STUDENT_GALLERY: StudentGalleryItem[] = [
  { id: "1", image_url: "/batch16.jpg", batch: "Batch 16", label: "Workshop Day", sort_order: 1 },
  { id: "2", image_url: "/batch15.JPG", batch: "Batch 15", label: "Live Editing Session", sort_order: 2 },
  { id: "3", image_url: "/batch14.jpg", batch: "Batch 14", label: "Color Grading Session", sort_order: 3 },
  { id: "4", image_url: "/batch13.jpg", batch: "Batch 13", label: "Graduation Day", sort_order: 4 },
];

export const DEFAULT_REVIEW_IMAGES: ReviewImage[] = [
  { id: "1", image_url: "/review1.jpg", alt: "Student review 1", sort_order: 1 },
  { id: "2", image_url: "/review2.jpg", alt: "Student review 2", sort_order: 2 },
  { id: "3", image_url: "/review3.jpg", alt: "Student review 3", sort_order: 3 },
  { id: "4", image_url: "/review4.jpg", alt: "Student review 4", sort_order: 4 },
  { id: "5", image_url: "/review5.jpg", alt: "Student review 5", sort_order: 5 },
  { id: "6", image_url: "/review6.jpg", alt: "Student review 6", sort_order: 6 },
  { id: "7", image_url: "/review7.jpg", alt: "Student review 7", sort_order: 7 },
  { id: "8", image_url: "/review8.jpg", alt: "Student review 8", sort_order: 8 },
];

export const DEFAULT_CMS: CmsData = {
  settings: DEFAULT_SETTINGS,
  pricing: DEFAULT_PRICING,
  faqs: DEFAULT_FAQS,
  curriculum: DEFAULT_CURRICULUM,
  batchDetails: DEFAULT_BATCH_DETAILS,
  transformation: DEFAULT_TRANSFORMATION,
  mentorCredentials: DEFAULT_MENTOR_CREDS,
  stats: DEFAULT_STATS,
  instagramReels: DEFAULT_INSTAGRAM_REELS,
  studentGallery: DEFAULT_STUDENT_GALLERY,
  reviewImages: DEFAULT_REVIEW_IMAGES,
  batch: { batch_name: "Batch 17", batch_date: "2026-08-30", is_active: true },
};

export const ADMIN_TABLES = [
  "site_settings",
  "pricing_plans",
  "faqs",
  "curriculum_modules",
  "batch_details",
  "transformation_items",
  "mentor_credentials",
  "stats",
  "instagram_reels",
  "student_gallery",
  "review_images",
  "batch_info",
  "enquiries",
  "enrollments",
] as const;

export type AdminTable = (typeof ADMIN_TABLES)[number];

export async function getCmsData(): Promise<CmsData> {
  try {
    const { getSupabase } = await import("./supabase");
    const db = getSupabase();

    const [
      settingsRes,
      pricingRes,
      faqsRes,
      curriculumRes,
      batchDetailsRes,
      transformationRes,
      mentorCredsRes,
      statsRes,
      reelsRes,
      galleryRes,
      reviewsRes,
      batchRes,
    ] = await Promise.all([
      db.from("site_settings").select("key, value"),
      db.from("pricing_plans").select("*").order("sort_order"),
      db.from("faqs").select("*").order("sort_order"),
      db.from("curriculum_modules").select("*").order("sort_order"),
      db.from("batch_details").select("*").order("sort_order"),
      db.from("transformation_items").select("*").order("sort_order"),
      db.from("mentor_credentials").select("*").order("sort_order"),
      db.from("stats").select("*").order("sort_order"),
      db.from("instagram_reels").select("*").order("sort_order"),
      db.from("student_gallery").select("*").order("sort_order"),
      db.from("review_images").select("*").order("sort_order"),
      db.from("batch_info").select("*").eq("is_active", true).order("batch_date").limit(1).maybeSingle(),
    ]);

    const settings: SiteSettings = { ...DEFAULT_SETTINGS };
    if (settingsRes.data?.length) {
      for (const row of settingsRes.data) {
        if (row.key in settings) {
          (settings as Record<string, string>)[row.key] = row.value;
        }
      }
    }

    return {
      settings,
      pricing: pricingRes.data?.length ? pricingRes.data.map(mapPricing) : DEFAULT_PRICING,
      faqs: faqsRes.data?.length ? faqsRes.data : DEFAULT_FAQS,
      curriculum: curriculumRes.data?.length
        ? curriculumRes.data.map((m) => ({ ...m, points: m.points ?? [] }))
        : DEFAULT_CURRICULUM,
      batchDetails: batchDetailsRes.data?.length ? batchDetailsRes.data : DEFAULT_BATCH_DETAILS,
      transformation: transformationRes.data?.length ? transformationRes.data : DEFAULT_TRANSFORMATION,
      mentorCredentials: mentorCredsRes.data?.length ? mentorCredsRes.data : DEFAULT_MENTOR_CREDS,
      stats: statsRes.data?.length ? statsRes.data : DEFAULT_STATS,
      instagramReels: reelsRes.data?.length ? reelsRes.data : DEFAULT_INSTAGRAM_REELS,
      studentGallery: galleryRes.data?.length ? galleryRes.data : DEFAULT_STUDENT_GALLERY,
      reviewImages: reviewsRes.data?.length ? reviewsRes.data : DEFAULT_REVIEW_IMAGES,
      batch: batchRes.data ?? DEFAULT_CMS.batch,
    };
  } catch {
    return DEFAULT_CMS;
  }
}

function mapPricing(row: Record<string, unknown>): PricingPlan {
  return {
    id: String(row.id),
    slug: String(row.slug),
    label: String(row.label),
    price: String(row.price),
    query_param: String(row.query_param),
    highlight: Boolean(row.highlight),
    desc: String(row.desc),
    features: Array.isArray(row.features) ? (row.features as string[]) : [],
    sort_order: Number(row.sort_order ?? 0),
  };
}

export function isExternalMediaUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}
