import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { sampleInvoices, samplePayments } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const invStatusColor: Record<string, string> = {
  Paid: 'bg-success/10 text-success',
  Partial: 'bg-warning/10 text-warning',
  Overdue: 'bg-destructive/10 text-destructive',
};

export default function Finance() {
  const { t } = useI18n();
  const totalReceivable = sampleInvoices.reduce((s, i) => s + i.balance, 0);
  const totalPaid = sampleInvoices.reduce((s, i) => s + i.paid, 0);
  const overdueCount = sampleInvoices.filter(i => i.status === 'Overdue').length;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('finance.title')}</h1>
        <p className="text-sm text-muted-foreground">Financial overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center"><CheckCircle className="h-5 w-5 text-success" /></div>
            <div><p className="text-xs text-muted-foreground">Total Collected</p><p className="text-xl font-bold">ETB {totalPaid.toLocaleString()}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center"><TrendingUp className="h-5 w-5 text-warning" /></div>
            <div><p className="text-xs text-muted-foreground">Receivable</p><p className="text-xl font-bold">ETB {totalReceivable.toLocaleString()}</p></div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center"><AlertTriangle className="h-5 w-5 text-destructive" /></div>
            <div><p className="text-xs text-muted-foreground">Overdue</p><p className="text-xl font-bold">{overdueCount} invoices</p></div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices">
        <TabsList>
          <TabsTrigger value="invoices">{t('finance.invoices')}</TabsTrigger>
          <TabsTrigger value="payments">{t('finance.payments')}</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
          <Card className="shadow-card">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Invoice #</TableHead>
                    <TableHead className="text-xs">Project</TableHead>
                    <TableHead className="text-xs">Customer</TableHead>
                    <TableHead className="text-xs text-right">{t('common.amount')}</TableHead>
                    <TableHead className="text-xs text-right">Paid</TableHead>
                    <TableHead className="text-xs text-right">Balance</TableHead>
                    <TableHead className="text-xs">Due Date</TableHead>
                    <TableHead className="text-xs">{t('common.status')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sampleInvoices.map(inv => (
                    <TableRow key={inv.id}>
                      <TableCell className="text-xs font-mono">{inv.id}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{inv.projectId}</TableCell>
                      <TableCell className="text-xs">{inv.customerName}</TableCell>
                      <TableCell className="text-xs text-right">ETB {inv.amount.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right text-success">ETB {inv.paid.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-right font-semibold">{inv.balance > 0 ? `ETB ${inv.balance.toLocaleString()}` : '—'}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{inv.dueDate}</TableCell>
                      <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${invStatusColor[inv.status]}`}>{inv.status}</span></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="shadow-card">
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">ID</TableHead>
                    <TableHead className="text-xs">Invoice</TableHead>
                    <TableHead className="text-xs">{t('common.date')}</TableHead>
                    <TableHead className="text-xs">Customer</TableHead>
                    <TableHead className="text-xs text-right">{t('common.amount')}</TableHead>
                    <TableHead className="text-xs">Method</TableHead>
                    <TableHead className="text-xs">Reference</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {samplePayments.map(pay => (
                    <TableRow key={pay.id}>
                      <TableCell className="text-xs font-mono">{pay.id}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{pay.invoiceId}</TableCell>
                      <TableCell className="text-xs">{pay.date}</TableCell>
                      <TableCell className="text-xs">{pay.customerName}</TableCell>
                      <TableCell className="text-xs text-right font-semibold text-success">ETB {pay.amount.toLocaleString()}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{pay.method}</Badge></TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{pay.reference}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
