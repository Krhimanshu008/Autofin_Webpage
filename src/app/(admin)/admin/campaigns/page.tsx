"use client";

import { useState, useEffect } from "react";
import { Plus, Link as LinkIcon, Copy, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { siteConfig } from "@/lib/config";
import { createClient } from "@/lib/supabase/client";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Campaign Form State
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [budget, setBudget] = useState("");

  // UTM Builder State
  const [utmUrl, setUtmUrl] = useState<string>(siteConfig.url);
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [copied, setCopied] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    setLoading(true);
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setCampaigns(data);
    }
    setLoading(false);
  }

  async function handleCreateCampaign(e: React.FormEvent) {
    e.preventDefault();
    setIsCreating(true);

    const { error } = await supabase.from("campaigns").insert({
      name,
      source,
      medium,
      budget: budget ? parseFloat(budget) : 0,
      status: "active",
    });

    if (error) {
      toast.error("Failed to create campaign");
    } else {
      toast.success("Campaign created!");
      setName("");
      setSource("");
      setMedium("");
      setBudget("");
      fetchCampaigns();
    }
    setIsCreating(false);
  }

  const generatedUrl = (() => {
    try {
      const url = new URL(utmUrl);
      if (utmSource) url.searchParams.set("utm_source", utmSource);
      if (utmMedium) url.searchParams.set("utm_medium", utmMedium);
      if (utmCampaign) url.searchParams.set("utm_campaign", utmCampaign);
      return url.toString();
    } catch {
      return "Invalid URL";
    }
  })();

  function copyToClipboard() {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    toast.success("URL copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Campaigns</h2>
        <p className="text-muted-foreground">
          Track marketing spend, manage active campaigns, and generate trackable UTM links.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: UTM Builder & Create Campaign */}
        <div className="space-y-8 lg:col-span-1">
          {/* UTM Builder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LinkIcon className="h-5 w-5 text-blue-600" />
                UTM Link Builder
              </CardTitle>
              <CardDescription>
                Generate tracking links for your ads and social posts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Destination URL</Label>
                <Input
                  value={utmUrl}
                  onChange={(e) => setUtmUrl(e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div className="space-y-2">
                <Label>Source (utm_source)</Label>
                <Input
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="e.g. linkedin, google, newsletter"
                />
              </div>
              <div className="space-y-2">
                <Label>Medium (utm_medium)</Label>
                <Input
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="e.g. cpc, social, email"
                />
              </div>
              <div className="space-y-2">
                <Label>Campaign (utm_campaign)</Label>
                <Input
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="e.g. q3_finance_audit"
                />
              </div>

              <div className="pt-4">
                <Label>Generated Link</Label>
                <div className="mt-2 flex gap-2">
                  <Input readOnly value={generatedUrl} className="bg-muted" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyToClipboard}
                    disabled={generatedUrl === "Invalid URL"}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create Campaign */}
          <Card>
            <CardHeader>
              <CardTitle>New Campaign</CardTitle>
              <CardDescription>
                Log a new marketing campaign to track spend.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div className="space-y-2">
                  <Label>Campaign Name *</Label>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Q3 LinkedIn Ads"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Source *</Label>
                    <Input
                      required
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      placeholder="e.g. linkedin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Medium *</Label>
                    <Input
                      required
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                      placeholder="e.g. cpc"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Budget (₹)</Label>
                  <Input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="10000"
                  />
                </div>
                <Button type="submit" disabled={isCreating} className="w-full">
                  {isCreating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="mr-2 h-4 w-4" />
                  )}
                  Create Campaign
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Campaign List */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : campaigns.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No campaigns logged yet.
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campaign</TableHead>
                        <TableHead>Source / Medium</TableHead>
                        <TableHead>Budget</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {campaigns.map((camp) => (
                        <TableRow key={camp.id}>
                          <TableCell className="font-medium">
                            {camp.name}
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-muted-foreground">
                              {camp.source} / {camp.medium}
                            </span>
                          </TableCell>
                          <TableCell>
                            ₹{camp.budget?.toLocaleString() || 0}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={camp.status === "active" ? "default" : "secondary"}
                              className={camp.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                            >
                              {camp.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
