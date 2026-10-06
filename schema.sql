-- Create forms table
CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type VARCHAR(50) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create form_submissions table
CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID REFERENCES forms(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255),
  message TEXT,
  data JSONB, -- For extra fields like industry, designation, etc.
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_content VARCHAR(100),
  utm_term VARCHAR(100),
  referrer TEXT,
  landing_page TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create leads table (CRM)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES form_submissions(id),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255),
  designation VARCHAR(100),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  service_interest VARCHAR(100),
  source VARCHAR(100), -- High-level source (e.g., Google, Direct)
  medium VARCHAR(100),
  campaign VARCHAR(100),
  landing_page TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, qualified, proposal, won, lost
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Initial seed data
INSERT INTO forms (form_type) VALUES ('contact'), ('consultation')
ON CONFLICT (form_type) DO NOTHING;

-- RLS Policies
ALTER TABLE forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow public to insert submissions
CREATE POLICY "Allow public form submissions"
ON form_submissions FOR INSERT
TO anon
WITH CHECK (true);

-- Admins can do everything (Supabase Service Role bypasses RLS by default)
