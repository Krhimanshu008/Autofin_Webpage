import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, PhoneOutgoing, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch KPI stats
  const [
    { count: totalLeads },
    { count: newLeads },
    { count: contactedLeads },
    { count: qualifiedLeads },
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "contacted"),
    supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "qualified"),
  ]);

  // Fetch recent leads
  const { data: recentLeads } = await supabase
    .from("leads")
    .select("id, name, company_name, status, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: topCampaigns } = await supabase
    .from("campaigns")
    .select("id, name, source, medium, budget, status")
    .order("budget", { ascending: false })
    .limit(5);

  const stats = [
    { title: "Total Leads", value: totalLeads || 0, icon: Users, color: "text-blue-600" },
    { title: "New Leads", value: newLeads || 0, icon: UserPlus, color: "text-emerald-600" },
    { title: "Contacted", value: contactedLeads || 0, icon: PhoneOutgoing, color: "text-amber-600" },
    { title: "Qualified", value: qualifiedLeads || 0, icon: Briefcase, color: "text-purple-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your marketing and lead performance.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentLeads?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No leads found.</p>
              ) : (
                recentLeads?.map((lead) => (
                  <div key={lead.id} className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">{lead.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {lead.company_name || "No company"}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase">
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/leads">View all leads</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Future expansion for charts */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Campaigns (by budget)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {topCampaigns?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No active campaigns.</p>
              ) : (
                topCampaigns?.map((camp) => (
                  <div key={camp.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{camp.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {camp.source} / {camp.medium}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      ₹{camp.budget?.toLocaleString() || 0}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
              <Button asChild variant="outline" className="w-full">
                <Link href="/admin/campaigns">Manage Campaigns</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
