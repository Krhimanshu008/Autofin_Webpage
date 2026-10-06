-- Phase 2: Campaigns & Health Check

-- 1. Create campaigns table
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  source VARCHAR(100) NOT NULL,
  medium VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  budget NUMERIC(10, 2) DEFAULT 0,
  spend NUMERIC(10, 2) DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active', -- active, paused, completed
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Add health_check to forms
INSERT INTO forms (form_type) VALUES ('health_check')
ON CONFLICT (form_type) DO NOTHING;

-- 3. RLS Policies for campaigns
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

-- Admins can do everything (Supabase Service Role bypasses RLS by default)
