import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { leadStatuses } from "@/lib/config";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

export default async function LeadsPage() {
  const supabase = await createClient();

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Leads Inbox</h2>
        <p className="text-muted-foreground">
          Manage all incoming leads and consultation requests.
        </p>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              leads?.map((lead) => {
                const statusInfo =
                  leadStatuses[lead.status as keyof typeof leadStatuses] ||
                  leadStatuses.new;

                return (
                  <TableRow key={lead.id}>
                    <TableCell className="whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{lead.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {lead.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{lead.company_name || "-"}</TableCell>
                    <TableCell>
                      {lead.source ? (
                        <span className="text-xs capitalize">{lead.source}</span>
                      ) : (
                        <span className="text-xs text-muted-foreground">Direct</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`${statusInfo.color} hover:${statusInfo.color} border-transparent`}
                      >
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/leads/${lead.id}`}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
