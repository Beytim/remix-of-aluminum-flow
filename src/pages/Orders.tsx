import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sampleProjects } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const statusColors: Record<string, string> = {
  Quote: 'bg-muted text-muted-foreground',
  Deposit: 'bg-info/10 text-info',
  'Materials Ordered': 'bg-warning/10 text-warning',
  Production: 'bg-primary/10 text-primary',
  Ready: 'bg-success/10 text-success',
  Installation: 'bg-info/10 text-info',
  Completed: 'bg-success/10 text-success',
};

export default function Orders() {
  const { t, language } = useI18n();

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Orders / Projects Pipeline</h1>
        <p className="text-sm text-muted-foreground">{sampleProjects.length} projects in pipeline</p>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">ID</TableHead>
                <TableHead className="text-xs">Project</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs text-right">Value</TableHead>
                <TableHead className="text-xs text-right">Balance</TableHead>
                <TableHead className="text-xs">Due Date</TableHead>
                <TableHead className="text-xs">{t('common.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleProjects.map(p => (
                <TableRow key={p.id}>
                  <TableCell className="text-xs font-mono">{p.id}</TableCell>
                  <TableCell className="text-xs font-medium">{language === 'am' ? p.nameAm : p.name}</TableCell>
                  <TableCell className="text-xs">{p.customerName}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{p.type}</Badge></TableCell>
                  <TableCell className="text-xs text-right font-semibold">ETB {p.value.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right text-warning">ETB {p.balance.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{p.dueDate}</TableCell>
                  <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[p.status]}`}>{p.status}</span></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
