import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Target,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about KR Himanshu — B2B finance and digital transformation consultant helping SMEs build finance functions that scale.",
};

const highlights = [
  {
    icon: Briefcase,
    title: "Industry Experience",
    description:
      "10+ years across manufacturing, distribution, professional services, technology, and more.",
  },
  {
    icon: GraduationCap,
    title: "Expertise",
    description:
      "Deep knowledge of finance operations, accounting systems, ERP implementations, and process automation.",
  },
  {
    icon: Target,
    title: "Approach",
    description:
      "Practical, results-driven consulting. No generic frameworks — every engagement is tailored to your business.",
  },
  {
    icon: Users,
    title: "Client Focus",
    description:
      "Working with SME founders, CFOs, and finance heads who want actionable outcomes, not PowerPoint decks.",
  },
];

const capabilities = [
  "Accounting system setup & restructuring",
  "Chart of accounts design",
  "Financial reporting & MIS",
  "Cash flow management",
  "Internal controls & SOPs",
  "Compliance health checks",
  "Finance automation workflows",
  "ERP/accounting implementation",
  "Dashboard & reporting setup",
  "Process documentation",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Finance Consulting,{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Reimagined
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              I help SMEs bridge the gap between where their finance function is
              today and where it needs to be — through a blend of financial
              expertise and modern technology.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {highlights.map((item) => (
              <Card key={item.title} className="transition-all hover:shadow-md">
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              What I Bring to the Table
            </h2>
            <p className="mt-4 text-muted-foreground">
              A practical skill set built at the intersection of finance and
              technology.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg p-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Finance?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Let&apos;s discuss your challenges and create a plan.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-500 px-8 text-white shadow-lg hover:from-blue-700 hover:to-cyan-600"
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
