import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Copy, ArrowRightLeft } from "lucide-react";
import { sampleQuotes, type QuoteStatus } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

const statusStyle: Record<QuoteStatus, string> = {
  Draft: 'bg-muted text-muted-foreground',
  Sent: 'bg-info/10 text-info',
  Accepted: 'bg-success/10 text-success',
  Rejected: 'bg-destructive/10 text-destructive',
  Expired: 'bg-muted text-muted-foreground',
};

export default function Quotes() {
  const { toast } = useToast();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quotations</h1>
          <p className="text-sm text-muted-foreground">{sampleQuotes.length} quotes</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New Quote</Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Quote #</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Valid Until</TableHead>
                <TableHead className="text-xs text-center">Items</TableHead>
                <TableHead className="text-xs text-right">Total</TableHead>
                <TableHead className="text-xs text-right">Margin</TableHead>
                <TableHead className="text-xs">Status</TableHead>
                <TableHead className="text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleQuotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="text-xs font-mono font-medium">{q.id}</TableCell>
                  <TableCell className="text-xs">{q.customerName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{q.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{q.validUntil}</TableCell>
                  <TableCell className="text-xs text-center">{q.items}</TableCell>
                  <TableCell className="text-xs text-right font-semibold">${q.total.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right text-success font-medium">{q.margin}%</TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusStyle[q.status]}`}>{q.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: "Cloned", description: `${q.id} cloned.` })}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      {q.status === 'Accepted' && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: "Converted", description: `${q.id} converted to order.` })}>
                          <ArrowRightLeft className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
