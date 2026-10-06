import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  TrendingUp,
  Shield,
  Cpu,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { serviceCategories } from "@/lib/config";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Finance Transformation, Compliance & Controls, Digital Transformation, and Financial Analysis consulting for SMEs.",
};

const iconMap: Record<string, React.ElementType> = {
  TrendingUp,
  Shield,
  Cpu,
  BarChart3,
};

// Detailed service offerings per category
const serviceDetails: Record<string, string[]> = {
  "finance-transformation": [
    "Accounting system setup & restructuring",
    "Chart of accounts design",
    "Bookkeeping process design",
    "Financial reporting & MIS",
    "Cash flow management",
    "Working capital analysis",
    "Finance process improvement",
  ],
  "compliance-controls": [
    "Compliance health check",
    "Accounting controls design",
    "Process documentation",
    "Internal controls framework",
    "Finance SOPs",
    "Compliance calendar setup",
  ],
  "digital-transformation": [
    "Finance automation workflows",
    "ERP / accounting implementation",
    "CRM / process integration",
    "Reporting dashboards",
    "Document automation",
    "AI-assisted finance processes",
  ],
  "financial-analysis": [
    "Financial health assessment",
    "Profitability analysis",
    "Cost optimization",
    "Pricing strategy support",
    "Variance analysis & KPIs",
    "Custom financial dashboards",
  ],
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Consulting{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Four pillars of transformation — from fixing the basics to building
              a finance function that powers your growth.
            </p>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {serviceCategories.map((service) => {
              const Icon = iconMap[service.icon];
              const offerings = serviceDetails[service.slug] || [];
              return (
                <Card
                  key={service.slug}
                  className="overflow-hidden transition-all hover:shadow-lg"
                >
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      {/* Left: Info */}
                      <div className="flex flex-col justify-center p-8 md:col-span-1">
                        <div
                          className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} text-white shadow-sm`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <h2 className="mt-4 font-heading text-2xl font-bold">
                          {service.name}
                        </h2>
                        <p className="mt-2 text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <Button
                          asChild
                          className="mt-6 w-fit bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
                        >
                          <Link href="/book-consultation">
                            Discuss This Service
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>

                      {/* Right: Offerings */}
                      <div className="border-t bg-muted/20 p-8 md:col-span-2 md:border-l md:border-t-0">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                          What&apos;s Included
                        </h3>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {offerings.map((item) => (
                            <div
                              key={item}
                              className="flex items-start gap-2.5 text-sm"
                            >
                              <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500" />
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 to-cyan-500" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Not Sure Which Service You Need?
            </h2>
            <p className="mt-4 text-lg text-blue-100">
              Book a free consultation — we&apos;ll help you identify the right
              starting point for your business.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-white px-8 text-blue-700 shadow-lg hover:bg-blue-50"
            >
              <Link href="/book-consultation">
                Book a Consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
