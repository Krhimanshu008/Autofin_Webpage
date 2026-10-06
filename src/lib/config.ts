// Site-wide constants and configuration
export const siteConfig = {
  name: "KR Himanshu",
  title: "KR Himanshu — B2B Finance & Digital Transformation Consulting",
  description:
    "Help SMEs improve financial visibility, controls, compliance and business processes through finance + technology consulting.",
  url: "https://krhimanshu.in",
  ogImage: "/og-image.png",
  links: {
    linkedin: "https://linkedin.com/in/krhimanshu",
    email: "mailto:himanshu@krhimanshu.in",
  },
  contact: {
    email: "himanshu@krhimanshu.in",
    phone: "+91-XXXXXXXXXX", // Update with real number
  },
} as const;

// Service categories
export const serviceCategories = [
  {
    slug: "finance-transformation",
    name: "Finance Transformation",
    icon: "TrendingUp",
    description:
      "Restructure your finance function for visibility, accuracy and scale.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    slug: "compliance-controls",
    name: "Compliance & Controls",
    icon: "Shield",
    description:
      "Build robust internal controls, SOPs and compliance frameworks.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    slug: "digital-transformation",
    name: "Digital Transformation",
    icon: "Cpu",
    description:
      "Automate finance workflows and implement the right technology stack.",
    color: "from-violet-500 to-purple-500",
  },
  {
    slug: "financial-analysis",
    name: "Financial Analysis",
    icon: "BarChart3",
    description:
      "Get actionable financial insights with dashboards and deep-dive analysis.",
    color: "from-amber-500 to-orange-500",
  },
] as const;

// Navigation links
export const navLinks = [
  { href: "/health-check", label: "Health Check" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

// Lead statuses with display info
export const leadStatuses = {
  new: { label: "New", color: "bg-blue-100 text-blue-800" },
  contacted: { label: "Contacted", color: "bg-yellow-100 text-yellow-800" },
  qualified: { label: "Qualified", color: "bg-green-100 text-green-800" },
  proposal: { label: "Proposal", color: "bg-purple-100 text-purple-800" },
  won: { label: "Won", color: "bg-emerald-100 text-emerald-800" },
  lost: { label: "Lost", color: "bg-red-100 text-red-800" },
  archived: { label: "Archived", color: "bg-gray-100 text-gray-800" },
} as const;
