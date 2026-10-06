"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Calendar,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { getUTMContext } from "@/lib/utm";
import { serviceCategories } from "@/lib/config";
import { toast } from "sonner";

const benefits = [
  "Understand your current challenges",
  "Identify quick wins and priorities",
  "Get a tailored improvement roadmap",
  "No obligation — completely free",
];

export default function BookConsultationPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const utmContext = getUTMContext();

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          company_name: formData.get("company_name"),
          designation: formData.get("designation"),
          industry: formData.get("industry"),
          company_size: formData.get("company_size"),
          service_interest: formData.get("service_interest"),
          message: formData.get("message"),
          ...utmContext,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitted(true);
      toast.success("Consultation request submitted!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-lg px-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold">
            Consultation Requested!
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for your interest. We&apos;ll reach out within 24 hours to
            schedule your consultation.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-background to-background" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
              Book a Free{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Consultation
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              30 minutes to discuss your challenges, explore possibilities, and
              outline a path forward.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Benefits */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                <CardContent className="p-6">
                  <Calendar className="h-8 w-8" />
                  <h3 className="mt-4 font-heading text-xl font-bold">
                    What to Expect
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {benefits.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-200" />
                        <span className="text-blue-50">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-3 p-6">
                  <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-semibold">Duration</h4>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      30 minutes via video call or phone
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Work Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name *</Label>
                        <Input
                          id="company_name"
                          name="company_name"
                          required
                          placeholder="Your company"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="designation">Your Role</Label>
                        <Input
                          id="designation"
                          name="designation"
                          placeholder="e.g. CFO, Founder, Finance Head"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input
                          id="industry"
                          name="industry"
                          placeholder="e.g. Manufacturing, IT Services"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="company_size">Company Size</Label>
                        <Select name="company_size">
                          <SelectTrigger id="company_size">
                            <SelectValue placeholder="Select team size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1–10 employees</SelectItem>
                            <SelectItem value="11-50">11–50 employees</SelectItem>
                            <SelectItem value="51-200">51–200 employees</SelectItem>
                            <SelectItem value="201-500">201–500 employees</SelectItem>
                            <SelectItem value="500+">500+ employees</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service_interest">
                          Area of Interest
                        </Label>
                        <Select name="service_interest">
                          <SelectTrigger id="service_interest">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceCategories.map((s) => (
                              <SelectItem key={s.slug} value={s.slug}>
                                {s.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="not-sure">
                              Not sure yet
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        Tell us about your challenges
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="What finance or operational challenges are you facing?"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white sm:w-auto hover:from-blue-700 hover:to-cyan-600"
                    >
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <ArrowRight className="mr-2 h-4 w-4" />
                      )}
                      {loading ? "Submitting..." : "Request Consultation"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
