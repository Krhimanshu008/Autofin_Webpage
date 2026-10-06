import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, User, Building2, Map, LinkIcon, Calendar } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LeadStatusManager } from "@/components/admin/lead-status-manager";
import { Badge } from "@/components/ui/badge";

export default async function LeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lead } = await supabase
    .from("leads")
    .select("*, form_submissions(*)")
    .eq("id", id)
    .single();

  if (!lead) {
    notFound();
  }

  const submission = lead.form_submissions;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin/leads">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{lead.name}</h2>
          <p className="text-sm text-muted-foreground">
            Created on {new Date(lead.created_at).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Details */}
        <div className="space-y-6 lg:col-span-2">
          {/* Contact & Company */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <User className="h-4 w-4" /> <span>Person</span>
                </div>
                <p className="font-medium">{lead.name}</p>
                <p><a href={`mailto:${lead.email}`} className="text-blue-600 hover:underline">{lead.email}</a></p>
                {lead.phone && <p>{lead.phone}</p>}
                {lead.designation && <p className="text-muted-foreground">{lead.designation}</p>}
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Building2 className="h-4 w-4" /> <span>Company</span>
                </div>
                <p className="font-medium">{lead.company_name || "N/A"}</p>
                {lead.industry && <p>Industry: {lead.industry}</p>}
                {lead.company_size && <p>Size: {lead.company_size}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Form Submission Data */}
          {submission && (
            <Card>
              <CardHeader>
                <CardTitle>Initial Request Details</CardTitle>
                <CardDescription>
                  Data from the {submission.form_id ? "form submission" : "direct entry"}.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {lead.service_interest && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Interested In</h4>
                    <Badge variant="outline">{lead.service_interest}</Badge>
                  </div>
                )}
                
                {submission.message && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1">Message / Requirements</h4>
                    <div className="rounded-md bg-muted p-4 text-sm whitespace-pre-wrap">
                      {submission.message}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Attribution */}
          <Card>
            <CardHeader>
              <CardTitle>Marketing Attribution</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Map className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">UTM Parameters</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Source:</div>
                  <div className="font-mono">{lead.source || "-"}</div>
                  
                  <div className="text-muted-foreground">Medium:</div>
                  <div className="font-mono">{lead.medium || "-"}</div>
                  
                  <div className="text-muted-foreground">Campaign:</div>
                  <div className="font-mono">{lead.campaign || "-"}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Session Info</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-muted-foreground">Landing Page:</div>
                  <div className="truncate" title={lead.landing_page || ""}>
                    {lead.landing_page || "-"}
                  </div>
                  
                  <div className="text-muted-foreground">Referrer:</div>
                  <div className="truncate" title={submission?.referrer || ""}>
                    {submission?.referrer || "-"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Status & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Manage Lead</CardTitle>
            </CardHeader>
            <CardContent>
              <LeadStatusManager lead={lead as any} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
