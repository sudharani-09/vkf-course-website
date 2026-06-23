-- ════════════════════════════════════════════════════════════════
-- VAIBHAV KULKARNI FILMS — Full CMS Schema + Seed Data
-- Run this entire file in Supabase → SQL Editor
-- ════════════════════════════════════════════════════════════════

-- ── Existing tables (create if missing) ─────────────────────────

CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  address TEXT,
  experience_level TEXT,
  selected_plan TEXT NOT NULL,
  amount TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending_whatsapp',
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS batch_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  batch_name TEXT NOT NULL,
  batch_date DATE NOT NULL,
  is_active BOOLEAN DEFAULT true
);

-- ── CMS tables ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS pricing_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  label TEXT NOT NULL,
  price TEXT NOT NULL,
  query_param TEXT NOT NULL,
  highlight BOOLEAN DEFAULT false,
  description TEXT NOT NULL,
  features JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS curriculum_modules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_number TEXT NOT NULL,
  title TEXT NOT NULL,
  points JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS batch_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  is_accent BOOLEAN DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS transformation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  item_number TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS mentor_credentials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS instagram_reels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  sub TEXT NOT NULL,
  thumb_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS student_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  batch TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS review_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  alt TEXT NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0
);

-- ── Storage bucket for uploaded media ─────────────────────────────

INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- ── Seed site settings ────────────────────────────────────────────

INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number', '919623252626'),
  ('phone_display', '+91 96232 52626'),
  ('email', 'vaibhavkulkarnifilms@gmail.com'),
  ('instagram_url', 'https://www.instagram.com/vaibhav_kulkarni_films'),
  ('hero_title', 'Vaibhav Kulkarni Films'),
  ('hero_tagline', 'Every Wedding Deserves Cinema'),
  ('mentor_name', 'Vaibhav Kulkarni'),
  ('mentor_bio_1', 'Professional wedding filmmaker, editor, and colorist based in Pune. With years of hands-on experience crafting cinematic wedding films, he built this mentorship to share what the industry does not teach.'),
  ('mentor_bio_2', 'His philosophy: the best way to learn filmmaking is to do it with real footage, honest feedback, and a mentor who has solved every problem you will face in the field.'),
  ('hero_video_url', 'https://wjwdhysbghbznthxsoxf.supabase.co/storage/v1/object/public/media/hero-video.mp4'),
  ('hero_poster_url', '/hero.jpg'),
  ('mentor_image_url', '/mentor.jpg'),
  ('course_video_url', 'https://wjwdhysbghbznthxsoxf.supabase.co/storage/v1/object/public/media/Course-Detail-Video.mp4'),
  ('course_thumb_url', '/course-detail-thumb.png'),
  ('footer_tagline', 'Every Wedding Deserves Cinema'),
  ('pricing_subtitle', 'One-time investment. Lifetime skill.'),
  ('contact_subtitle', 'Have questions before enrolling? Fill the form and we will get back to you.')
ON CONFLICT (key) DO NOTHING;

-- ── Seed pricing ──────────────────────────────────────────────────

INSERT INTO pricing_plans (slug, label, price, query_param, highlight, description, features, sort_order) VALUES
  ('seat', 'Advance Booking', '₹4,999', 'advance', false, 'Reserve your spot. Balance due before batch starts.',
   '["Seat reservation","Priority confirmation","WhatsApp group access","Balance ₹17,501 before batch"]', 1),
  ('course', 'Course Only', '₹22,500', 'course', true, 'Full access to all 10 modules with personal mentorship.',
   '["All 10 modules","Real project practice","Personal mentorship","Certificate of completion","Lifetime community access"]', 2),
  ('stay', 'Course + Stay & Food', '₹26,500', 'full', false, 'Full course plus accommodation and meals for outstation students.',
   '["All 10 modules","Accommodation in Pune","Daily meals included","Personal mentorship","Certificate of completion"]', 3)
ON CONFLICT (slug) DO NOTHING;

-- ── Seed batch info ───────────────────────────────────────────────

INSERT INTO batch_info (batch_name, batch_date, is_active)
SELECT 'Batch 17', '2026-08-30', true
WHERE NOT EXISTS (SELECT 1 FROM batch_info WHERE is_active = true);

-- ── Seed FAQs ─────────────────────────────────────────────────────

INSERT INTO faqs (question, answer, sort_order)
SELECT * FROM (VALUES
  ('Do I need prior editing experience to join?', 'No experience is required. The course starts from absolute basics — software setup, interface navigation, and first cuts.', 1),
  ('What software will I learn?', 'Primary software: DaVinci Resolve and Adobe Premiere Pro. You will also learn LUT creation and export pipelines.', 2),
  ('Is this online or in-person?', 'Fully in-person mentorship at our studio in Hadapsar, Fursungi, Pune.', 3),
  ('How long is the course and what are batch timings?', 'Each batch runs approximately 3–4 weeks. Exact dates shared after seat confirmation via WhatsApp.', 4),
  ('What happens after I pay the ₹4,999 advance?', 'Your seat is reserved and you will be added to the student WhatsApp group within 24 hours.', 5)
) AS v(question, answer, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM faqs LIMIT 1);

-- ── Seed curriculum (modules 01–10) ──────────────────────────────

INSERT INTO curriculum_modules (module_number, title, points, sort_order)
SELECT * FROM (VALUES
  ('01', 'Software + Editing Foundation', '["Premiere Pro / DaVinci Resolve interface","Project setup and media management","Timeline workflow and keyboard shortcuts","Codecs, frame rates, and resolutions","Export settings for wedding deliverables"]'::jsonb, 1),
  ('02', 'Shot Selection, Rhythm & Cutting Techniques', '["Choosing the right shot at the right moment","J-cuts, L-cuts, and match cuts","Building rhythm that matches music tempo","Invisible cuts and continuity editing","Pacing for emotional peaks"]'::jsonb, 2),
  ('03', 'Creative Editing Tools & Effects', '["Speed ramps and slow motion","Transitions that feel intentional","Text animations and title design","Overlays and film grain aesthetics","Stabilization and lens correction"]'::jsonb, 3),
  ('04', 'Music Theory for Editors', '["Understanding BPM and cutting to music","Finding emotional beats in a track","Licensed vs royalty-free music","Creating audio beds and atmospheric layers","When silence is more powerful than music"]'::jsonb, 4),
  ('05', 'Storytelling for Wedding Films', '["Three-act structure in wedding films","Working with natural audio and vows","Building tension before the ceremony","Capturing the emotional payoff","Structuring a 10-minute feature film"]'::jsonb, 5),
  ('06', 'Color Correction', '["Primary color correction fundamentals","White balance and exposure correction","Skin tone accuracy across lighting","Matching shots from different cameras","Node-based workflow in DaVinci Resolve"]'::jsonb, 6),
  ('07', 'Color Grading', '["Creating visual mood and emotional tone","Secondary corrections and selective grading","Highlight and shadow control","Creating cinematic contrast","Developing a signature look"]'::jsonb, 7),
  ('08', 'LUT Theory + LUT Creation', '["What LUTs are and how they work","Technical vs creative LUTs","Creating your own LUTs from scratch","Packaging and selling LUTs","LUT management workflow"]'::jsonb, 8),
  ('09', 'Typography + Color Psychology + Branding', '["Font pairing for wedding films","Title card design and animation","Color psychology for different aesthetics","Building a visual brand identity","Creating branded deliverables"]'::jsonb, 9),
  ('10', 'Industry Workflow + Monetization', '["Client communication and expectation management","Pricing your editing services","Building a portfolio that attracts clients","Freelancing vs working with studios","Growing from editor to filmmaker"]'::jsonb, 10)
) AS v(module_number, title, points, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM curriculum_modules LIMIT 1);

-- ── Seed batch details ────────────────────────────────────────────

INSERT INTO batch_details (icon, title, description, is_accent, sort_order)
SELECT * FROM (VALUES
  ('👥', 'Only 10 Seats', 'Maximum 10 students per batch. Every student gets direct personal attention from the mentor.', true, 1),
  ('📍', 'Pune — Hadapsar', 'In-person sessions at our studio in Hadapsar, Fursungi, Pune. Fully equipped editing workstations.', false, 2),
  ('🗣️', 'Marathi & Hindi', 'All sessions conducted in Marathi and Hindi — so you learn in the language you think in.', false, 3),
  ('🎯', 'Personal Attention', 'Small batch means your work gets reviewed, questions get answered, and growth is tracked.', false, 4)
) AS v(icon, title, description, is_accent, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM batch_details LIMIT 1);

-- ── Seed transformation items ─────────────────────────────────────

INSERT INTO transformation_items (item_number, title, description, sort_order)
SELECT * FROM (VALUES
  ('01', 'Learn the Complete Wedding Film Workflow', 'From footage organization to final cinematic delivery, understand the exact workflow used in real wedding projects.', 1),
  ('02', 'Master Professional Color Grading in DaVinci Resolve', 'Learn how to create premium wedding colors, skin tones, mood, and cinematic looks that clients love.', 2),
  ('03', 'Practical Training with Real Wedding Projects', 'Work on actual wedding footage instead of sample clips, so you gain real-world experience.', 3),
  ('04', 'Cinematography + Storytelling + Editing Together', 'Most courses teach only software. This course teaches how to think like a filmmaker and create emotional wedding films.', 4),
  ('05', 'Build a Career & Increase Your Income', 'Whether you are a photographer, videographer, or editor, learn skills that help you attract better clients.', 5)
) AS v(item_number, title, description, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM transformation_items LIMIT 1);

-- ── Seed mentor credentials ───────────────────────────────────────

INSERT INTO mentor_credentials (icon, label, sort_order)
SELECT * FROM (VALUES
  ('🎬', 'Wedding Filmmaker & Editor', 1),
  ('🎨', 'Professional Colorist', 2),
  ('👥', 'Mentor to 100+ Students', 3),
  ('📍', 'Pune, Maharashtra', 4)
) AS v(icon, label, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM mentor_credentials LIMIT 1);

-- ── Seed stats ────────────────────────────────────────────────────

INSERT INTO stats (value, label, sort_order)
SELECT * FROM (VALUES
  ('100+', 'Students Trained', 1),
  ('10', 'Seats Per Batch', 2),
  ('17+', 'Batches Completed', 3),
  ('100%', 'Practical Learning', 4)
) AS v(value, label, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM stats LIMIT 1);

-- ── Seed instagram reels ──────────────────────────────────────────

INSERT INTO instagram_reels (url, title, sub, thumb_url, sort_order)
SELECT * FROM (VALUES
  ('https://www.instagram.com/reel/C3PvBw9IOt_/', 'Batch 13', 'Certificate Ceremony', '/first.jpeg', 1),
  ('https://www.instagram.com/reel/DYfRk7VisdT/', 'Batch 14', 'Live Editing Session', '/second.jpeg', 2),
  ('https://www.instagram.com/reel/DYj4tvpCGza/', 'Batch 15', 'Teaching Methodology', '/third.jpeg', 3),
  ('https://www.instagram.com/reel/DYZwoRlMyxe/', 'Batch 16', 'Practical Color Grading', '/batch15.jpg', 4)
) AS v(url, title, sub, thumb_url, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM instagram_reels LIMIT 1);

-- ── Seed student gallery ────────────────────────────────────────────

INSERT INTO student_gallery (image_url, batch, label, sort_order)
SELECT * FROM (VALUES
  ('/batch16.jpg', 'Batch 16', 'Workshop Day', 1),
  ('/batch15.JPG', 'Batch 15', 'Live Editing Session', 2),
  ('/batch14.jpg', 'Batch 14', 'Color Grading Session', 3),
  ('/batch13.jpg', 'Batch 13', 'Graduation Day', 4)
) AS v(image_url, batch, label, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM student_gallery LIMIT 1);

-- ── Seed review images ────────────────────────────────────────────

INSERT INTO review_images (image_url, alt, sort_order)
SELECT * FROM (VALUES
  ('/review1.jpg', 'Student review 1', 1),
  ('/review2.jpg', 'Student review 2', 2),
  ('/review3.jpg', 'Student review 3', 3),
  ('/review4.jpg', 'Student review 4', 4),
  ('/review5.jpg', 'Student review 5', 5),
  ('/review6.jpg', 'Student review 6', 6),
  ('/review7.jpg', 'Student review 7', 7),
  ('/review8.jpg', 'Student review 8', 8)
) AS v(image_url, alt, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM review_images LIMIT 1);

-- ── Indexes ───────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS enrollments_email_idx ON enrollments(email);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries(email);
