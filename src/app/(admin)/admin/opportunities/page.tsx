"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const STAGES = [
  { id: "discovery", label: "Discovery", color: "border-blue-200 bg-blue-50" },
  { id: "proposal", label: "Proposal", color: "border-amber-200 bg-amber-50" },
  { id: "negotiation", label: "Negotiation", color: "border-purple-200 bg-purple-50" },
  { id: "won", label: "Closed Won", color: "border-emerald-200 bg-emerald-50" },
  { id: "lost", label: "Closed Lost", color: "border-gray-200 bg-gray-50" },
];

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOpportunities();
  }, []);

  async function fetchOpportunities() {
    setLoading(true);
    // Fetch opportunities along with company name if linked
    const { data } = await supabase
      .from("opportunities")
      .select(`
        *,
        companies ( name )
      `)
      .order("created_at", { ascending: false });
    
    if (data) setOpportunities(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Opportunities Pipeline</h2>
          <p className="text-muted-foreground">
            Manage your sales deals across all stages.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Deal
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageOpps = opportunities.filter((o) => o.stage === stage.id);
          const stageTotal = stageOpps.reduce((sum, o) => sum + (Number(o.estimated_value) || 0), 0);

          return (
            <div key={stage.id} className="w-[300px] shrink-0 space-y-4">
              <div className={`flex items-center justify-between rounded-lg border px-4 py-2 ${stage.color}`}>
                <h3 className="font-semibold">{stage.label}</h3>
                <Badge variant="secondary">{stageOpps.length}</Badge>
              </div>
              
              <div className="text-sm font-medium text-muted-foreground px-1">
                ₹{stageTotal.toLocaleString()}
              </div>

              <div className="space-y-3">
                {stageOpps.map((opp) => (
                  <Card key={opp.id} className="cursor-pointer hover:border-blue-400 transition-colors">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm font-semibold leading-tight">
                        {opp.title}
                      </CardTitle>
                      <div className="text-xs text-muted-foreground">
                        {opp.companies?.name || "No Company linked"}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-medium">₹{Number(opp.estimated_value).toLocaleString()}</span>
                        <Target className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {stageOpps.length === 0 && (
                  <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-400">
                    No deals
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
