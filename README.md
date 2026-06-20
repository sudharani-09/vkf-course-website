# Vaibhav Kulkarni Films — v3

Premium wedding filmmaking brand website. Next.js 15 + Framer Motion + Supabase + Razorpay.

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in .env.local with your keys
npm run dev
```

## Design System

| Token | Value |
|-------|-------|
| Deep Black | `#0E0E0E` |
| Charcoal | `#333233` |
| Warm Gray | `#575553` |
| Taupe | `#8A857F` |
| Silver | `#C7C7C7` |
| Pure White | `#FDFDFD` |

**Fonts:** Cormorant Garamond (display/headings) + Inter (body/UI)

## Public Assets Required

```
public/
├── hero-video.mp4        ← Cinematic hero background video
├── hero.jpg              ← Hero poster image (fallback)
├── mentor.jpg
├── batch1.jpg
├── batch2.jpg
├── batch3.jpg
├── review1.jpg → review8.jpg
├── student-video-1.mp4
└── student-video-2.mp4
```

## Setup

### 1. Supabase
1. Create project at supabase.com
2. Go to SQL Editor → paste `supabase-schema.sql` → Run
3. Copy URL + service role key to `.env.local`

### 2. Razorpay
1. Create account at razorpay.com
2. Go to Settings → API Keys
3. Copy Key ID + Secret to `.env.local`

### 3. Deploy (Vercel)
```bash
npx vercel
```
Add all `.env.local` vars in Vercel dashboard.

## Database & Payment — What's Connected

### Supabase Tables
- **`enrollments`** — stores every payment: name, phone, email, address, experience level, plan, amount, payment_id, status, timestamp
- **`enquiries`** — stores contact form submissions: name, phone, email, message, timestamp

### Razorpay Flow
1. Student opens `/enroll?plan=advance|course|full`
2. Fills: Full Name, Email, Phone, Address, Experience, Plan
3. Submits → server creates Razorpay order via `/api/create-order`
4. Razorpay checkout opens in modal
5. On success → `/api/save-enrollment` writes to Supabase
6. Redirect to `/success` with name, plan, payment_id, amount
7. WhatsApp group join button shown

### API Routes
- `POST /api/create-order` — creates Razorpay order (server-side)
- `POST /api/save-enrollment` — saves enrollment to Supabase
- `POST /api/enquiry` — saves contact form to Supabase

## Sections
| # | Section |
|---|---------|
| 1 | Hero — cinematic video BG |
| 2 | Student Work — 4-video carousel |
| 3 | Transformation — 4 pillars |
| 4 | Student Results — animated stats + photo grid |
| 5 | Testimonials — dual infinite marquee |
| 6 | Video Testimonials — 9:16 cards |
| 7 | Mentor — portrait + credentials |
| 8 | Curriculum — 10-module accordion |
| 9 | Batch Details — info cards |
| 10 | Pricing — 3 cards → /enroll |
| 11 | FAQ — 5 questions |
| 12 | Contact — enquiry form + direct links |
