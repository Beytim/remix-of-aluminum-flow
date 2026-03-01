import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Copy, ArrowRightLeft, Trash2 } from "lucide-react";
import { sampleQuotes, sampleCustomers } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/localStorage";
import { AddQuoteDialog } from "@/components/dialogs/AddQuoteDialog";
import type { Quote, Customer } from "@/data/sampleData";

const statusStyle: Record<string, string> = {
  Pending: 'bg-warning/10 text-warning',
  Accepted: 'bg-success/10 text-success',
  Rejected: 'bg-destructive/10 text-destructive',
};

export default function Quotes() {
  const [quotes, setQuotes] = useLocalStorage<Quote[]>(STORAGE_KEYS.QUOTES, sampleQuotes);
  const [customers] = useLocalStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, sampleCustomers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const { t } = useI18n();

  const handleClone = (q: Quote) => {
    const cloned = { ...q, id: `QT-${String(quotes.length + 1).padStart(3, '0')}`, status: 'Pending' as const, date: new Date().toISOString().split('T')[0] };
    setQuotes(prev => [...prev, cloned]);
    toast({ title: "Cloned", description: `${q.id} cloned as ${cloned.id}.` });
  };

  const handleDelete = (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
    toast({ title: "Deleted", description: "Quote removed." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.quotes')}</h1>
          <p className="text-sm text-muted-foreground">{quotes.length} quotes</p>
        </div>
        <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="h-3.5 w-3.5 mr-1.5" />New Quote</Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Quote #</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Project</TableHead>
                <TableHead className="text-xs text-center">Items</TableHead>
                <TableHead className="text-xs text-right">Material</TableHead>
                <TableHead className="text-xs text-right">VAT</TableHead>
                <TableHead className="text-xs text-right">{t('common.total')}</TableHead>
                <TableHead className="text-xs">{t('common.status')}</TableHead>
                <TableHead className="text-xs text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quotes.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="text-xs font-mono font-medium">{q.id}</TableCell>
                  <TableCell className="text-xs">{q.customerName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{q.projectName}</TableCell>
                  <TableCell className="text-xs text-center">{q.items}</TableCell>
                  <TableCell className="text-xs text-right">ETB {q.materialCost.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right text-muted-foreground">ETB {q.vat.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right font-semibold">ETB {q.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusStyle[q.status]}`}>{q.status}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleClone(q)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                      {q.status === 'Accepted' && (
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toast({ title: "Converted", description: `${q.id} converted to project.` })}>
                          <ArrowRightLeft className="h-3 w-3" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(q.id)}>
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddQuoteDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={q => setQuotes(prev => [...prev, q])} customers={customers} existingCount={quotes.length} />
    </div>
  );
}
