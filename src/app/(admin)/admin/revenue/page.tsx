"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Plus, DollarSign, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function RevenuePage() {
  const [revenue, setRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function fetchRevenue() {
      const { data } = await supabase
        .from("revenue")
        .select(`
          *,
          clients (
            companies ( name )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (data) setRevenue(data);
      setLoading(false);
    }
    fetchRevenue();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const totalRevenue = revenue
    .filter(r => r.status === 'paid')
    .reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Revenue Tracking</h2>
          <p className="text-muted-foreground">
            Track invoices, payments, and overall ROI.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Log Payment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 border-emerald-200 bg-emerald-50/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">
              Total Revenue Collected
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              ₹{totalRevenue.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-600" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {revenue.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No revenue logged yet. Close a deal to get started!
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenue.map((rev) => (
                    <TableRow key={rev.id}>
                      <TableCell className="font-medium">
                        {rev.clients?.companies?.name || "Unknown Client"}
                      </TableCell>
                      <TableCell>{rev.description || "Consulting Services"}</TableCell>
                      <TableCell className="font-semibold">
                        ₹{Number(rev.amount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(rev.payment_date || rev.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={rev.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : ''}
                        >
                          {rev.status}
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
  );
}
