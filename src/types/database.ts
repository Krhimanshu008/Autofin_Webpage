// Database types for Supabase tables
// These mirror the database schema and keep TypeScript types in sync

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  short_description: string | null;
  long_description: string | null;
  icon: string | null;
  sort_order: number;
  status: "active" | "draft" | "archived";
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Form {
  id: string;
  name: string;
  slug: string;
  form_type: "contact" | "consultation" | "health_check" | "newsletter" | "download";
  page_url: string | null;
  active: boolean;
  created_at: string;
}

export interface FormSubmission {
  id: string;
  form_id: string | null;
  name: string | null;
  email: string;
  phone: string | null;
  company_name: string | null;
  message: string | null;
  data: Record<string, unknown>;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer: string | null;
  landing_page: string | null;
  ip_country: string | null;
  submitted_at: string;
}

export interface Lead {
  id: string;
  submission_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  designation: string | null;
  industry: string | null;
  company_size: string | null;
  source: string | null;
  medium: string | null;
  campaign: string | null;
  landing_page: string | null;
  service_interest: string | null;
  status: "new" | "contacted" | "qualified" | "proposal" | "won" | "lost" | "archived";
  notes: string | null;
  lead_score: number;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  status: "active" | "unsubscribed";
  subscribed_at: string;
  unsubscribed_at: string | null;
}

// Form submission payload types (what the frontend sends)
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  message: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
}

export interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  company_name: string;
  designation?: string;
  industry?: string;
  company_size?: string;
  service_interest?: string;
  preferred_date?: string;
  preferred_time?: string;
  message?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
}

export interface NewsletterFormData {
  email: string;
  name?: string;
  source?: string;
}
