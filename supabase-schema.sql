-- ════════════════════════════════════════════
-- VAIBHAV KULKARNI FILMS — Supabase Schema
-- Run this in Supabase SQL Editor
-- ════════════════════════════════════════════

-- Enrollments (payment data)
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  address TEXT,
  experience_level TEXT,
  selected_plan TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  payment_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_full_enrollments" ON enrollments
  USING (true) WITH CHECK (true);

-- Enquiries (contact form)
CREATE TABLE IF NOT EXISTS enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT NOT NULL,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_full_enquiries" ON enquiries
  USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS enrollments_email_idx ON enrollments(email);
CREATE INDEX IF NOT EXISTS enrollments_payment_id_idx ON enrollments(payment_id);
CREATE INDEX IF NOT EXISTS enquiries_email_idx ON enquiries(email);
