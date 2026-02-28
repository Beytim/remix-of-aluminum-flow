import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ClipboardCheck, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { sampleQualityChecks } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const resultIcon = {
  Pass: <CheckCircle className="h-4 w-4 text-success" />,
  Fail: <XCircle className="h-4 w-4 text-destructive" />,
  Conditional: <AlertCircle className="h-4 w-4 text-warning" />,
};

const resultColor: Record<string, string> = {
  Pass: 'bg-success/10 text-success',
  Fail: 'bg-destructive/10 text-destructive',
  Conditional: 'bg-warning/10 text-warning',
};

export default function Quality() {
  const { t } = useI18n();
  const passRate = ((sampleQualityChecks.filter(q => q.result === 'Pass').length / sampleQualityChecks.length) * 100).toFixed(0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.quality')}</h1>
          <p className="text-sm text-muted-foreground">{sampleQualityChecks.length} inspections · Pass rate: {passRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(['Pass', 'Conditional', 'Fail'] as const).map(result => {
          const count = sampleQualityChecks.filter(q => q.result === result).length;
          return (
            <Card key={result} className="shadow-card">
              <CardContent className="p-4 flex items-center gap-3">
                {resultIcon[result]}
                <div>
                  <p className="text-xs text-muted-foreground">{result}</p>
                  <p className="text-xl font-bold">{count}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">ID</TableHead>
                <TableHead className="text-xs">Work Order</TableHead>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-xs">Inspector</TableHead>
                <TableHead className="text-xs">{t('common.date')}</TableHead>
                <TableHead className="text-xs">Result</TableHead>
                <TableHead className="text-xs">Defects</TableHead>
                <TableHead className="text-xs">Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleQualityChecks.map(qc => (
                <TableRow key={qc.id}>
                  <TableCell className="text-xs font-mono">{qc.id}</TableCell>
                  <TableCell className="text-xs font-mono">{qc.workOrderId}</TableCell>
                  <TableCell className="text-xs font-medium">{qc.productName}</TableCell>
                  <TableCell className="text-xs">{qc.inspector}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{qc.date}</TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${resultColor[qc.result]}`}>{qc.result}</span>
                  </TableCell>
                  <TableCell className="text-xs">
                    {qc.defects.length > 0 ? qc.defects.map(d => (
                      <Badge key={d} variant="destructive" className="text-[10px] mr-1 mb-0.5">{d}</Badge>
                    )) : <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{qc.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
