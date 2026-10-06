"use client";

import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Activity,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { getUTMContext } from "@/lib/utm";
import { toast } from "sonner";

const questions = [
  {
    id: "mis",
    label: "Do you generate a monthly Management Information System (MIS) report?",
    options: [
      { label: "Yes, regularly", value: "yes_regularly", score: 25 },
      { label: "Yes, but it is often delayed", value: "yes_delayed", score: 10 },
      { label: "No, we don't have one", value: "no", score: 0 },
    ],
  },
  {
    id: "books_close",
    label: "How quickly do you close your books at the end of the month?",
    options: [
      { label: "Within 7 days", value: "<7", score: 25 },
      { label: "Between 7 to 15 days", value: "7-15", score: 10 },
      { label: "More than 15 days", value: ">15", score: 0 },
    ],
  },
  {
    id: "budget",
    label: "Do you operate with a documented annual budget?",
    options: [
      { label: "Yes, and we track variances", value: "yes_tracked", score: 25 },
      { label: "Yes, but rarely track it", value: "yes_untracked", score: 10 },
      { label: "No formal budget", value: "no", score: 0 },
    ],
  },
  {
    id: "controls",
    label: "Are all vendor payments and expenses approved through a documented system?",
    options: [
      { label: "Yes, strictly enforced", value: "yes", score: 25 },
      { label: "Somewhat, but mostly manual/verbal", value: "partial", score: 10 },
      { label: "No formal approval process", value: "no", score: 0 },
    ],
  },
];

export default function HealthCheckPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", email: "", company: "" });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null);

  function handleNext() {
    // Validate current step
    if (step === 1 && Object.keys(answers).length < questions.length) {
      toast.error("Please answer all questions before proceeding.");
      return;
    }
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const utmContext = getUTMContext();

    try {
      const res = await fetch("/api/health-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contact,
          answers,
          ...utmContext,
        }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      setResult({ score: data.score, feedback: data.feedback });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Activity className="h-10 w-10 text-blue-600" />
          </div>
          <h1 className="mt-6 font-heading text-4xl font-bold">Your Score: {result.score}/100</h1>
          
          <div className="mt-8 rounded-xl bg-card border p-8 text-left shadow-sm">
            <h3 className="font-heading text-xl font-bold mb-4">What this means:</h3>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {result.feedback}
            </p>
          </div>

          <div className="mt-8">
            <p className="text-sm text-muted-foreground mb-4">
              A detailed report has been sent to {contact.email}.
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
              <a href="/book-consultation">Book a free strategy call</a>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50/50 via-background to-background" />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 shadow-sm text-white">
            <Calculator className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl">
            Finance Function Health Check
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            Take this free 2-minute assessment to identify gaps in your financial controls, reporting, and processes.
          </p>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg border-t-4 border-t-blue-500">
            <CardContent className="p-6 sm:p-10">
              
              {/* Step Progress */}
              <div className="mb-8 flex items-center justify-between border-b pb-4">
                <div className={`text-sm font-medium ${step === 1 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                  1. Assessment
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className={`text-sm font-medium ${step === 2 ? 'text-blue-600' : 'text-muted-foreground'}`}>
                  2. Get Results
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-10">
                  {questions.map((q, idx) => (
                    <div key={q.id} className="space-y-4">
                      <Label className="text-base font-semibold">
                        {idx + 1}. {q.label}
                      </Label>
                      <RadioGroup
                        value={answers[q.id]}
                        onValueChange={(val: string) => setAnswers({ ...answers, [q.id]: val })}
                        className="flex flex-col space-y-2"
                      >
                        {q.options.map((opt) => (
                          <div key={opt.value} className="flex items-center space-x-2 rounded-lg border p-3 hover:bg-muted/50 cursor-pointer transition-colors">
                            <RadioGroupItem value={opt.value} id={`${q.id}-${opt.value}`} />
                            <Label htmlFor={`${q.id}-${opt.value}`} className="flex-1 cursor-pointer font-normal">
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                  <Button onClick={handleNext} size="lg" className="w-full bg-blue-600 text-white">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold">Where should we send your results?</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Enter your details to reveal your score and get a customized action plan.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={contact.name}
                        onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input
                        id="company"
                        required
                        value={contact.company}
                        onChange={(e) => setContact({ ...contact, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
                      {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {loading ? "Calculating..." : "Reveal My Score"}
                    </Button>
                  </div>
                </form>
              )}

            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
