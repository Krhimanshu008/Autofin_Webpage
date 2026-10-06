import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Cpu,
  BarChart3,
  AlertTriangle,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig, serviceCategories } from "@/lib/config";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Shield,
  Cpu,
  BarChart3,
};

const problems = [
  "Poor cash-flow visibility",
  "Unorganized books & accounts",
  "Manual, error-prone processes",
  "Delayed MIS & financial reports",
  "Compliance gaps & risk exposure",
  "High receivables & working capital issues",
  "Spreadsheet dependency across finance",
];

const processSteps = [
  {
    step: "01",
    title: "Diagnose",
    description: "Understand your current finance function, processes and pain points.",
  },
  {
    step: "02",
    title: "Analyse",
    description: "Identify gaps, inefficiencies and opportunities for improvement.",
  },
  {
    step: "03",
    title: "Design",
    description: "Create a tailored roadmap with clear priorities and milestones.",
  },
  {
    step: "04",
    title: "Implement",
    description: "Execute changes with minimal disruption to your operations.",
  },
  {
    step: "05",
    title: "Improve",
    description: "Continuous monitoring, optimization and support as you scale.",
  },
];

const trustItems = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "15+", label: "Industries Served" },
  { value: "₹100Cr+", label: "Revenue Managed" },
];

export default function HomePage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-background to-background" />
        <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              B2B Finance & Digital Transformation Consulting
            </div>

            <h1 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build a Finance Function{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                That Scales
              </span>{" "}
              With Your Business
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Helping SMEs improve financial visibility, controls, compliance and
              business processes through{" "}
              <span className="text-foreground font-medium">
                finance + technology
              </span>
              .
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-700 hover:to-cyan-600"
              >
                <Link href="/book-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8">
                <Link href="/services">
                  Explore Services
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST / CREDIBILITY ============ */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {trustItems.map((item) => (
              <div key={item.label} className="text-center">
                <div className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEMS ============ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Sounds Familiar?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Growing businesses hit these finance bottlenecks. You don&apos;t have to
              live with them.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2">
            {problems.map((problem) => (
              <div
                key={problem}
                className="flex items-start gap-3 rounded-lg border bg-card p-4 transition-colors hover:border-destructive/30 hover:bg-destructive/5"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <span className="text-sm font-medium">{problem}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOLUTIONS / SERVICES ============ */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              How We Help
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Four pillars of transformation — from fixing the basics to building
              for scale.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCategories.map((service) => {
              const Icon = iconMap[service.icon];
              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div
                        className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${service.color} text-white shadow-sm`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-heading text-lg font-semibold">
                        {service.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                      <span className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 transition-colors group-hover:text-blue-700">
                        Learn more
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A proven five-step approach to transforming your finance function.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-4xl">
            <div className="space-y-6">
              {processSteps.map((step, i) => (
                <div
                  key={step.step}
                  className="flex gap-6 rounded-xl border bg-card p-6 transition-all hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 font-heading text-lg font-bold text-white shadow-sm">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 to-cyan-500" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s Improve Your Finance Function
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-blue-100">
              Book a free consultation to discuss your challenges, explore
              solutions, and build a roadmap tailored to your business.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white px-8 text-blue-700 shadow-lg hover:bg-blue-50"
              >
                <Link href="/book-consultation">
                  Book a Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                <Link href="/contact">
                  Send a Message
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
