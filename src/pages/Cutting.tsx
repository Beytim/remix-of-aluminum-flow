import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleWorkOrders } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const statusColor: Record<string, string> = {
  Cutting: 'bg-info/10 text-info',
  Machining: 'bg-primary/10 text-primary',
  Assembly: 'bg-warning/10 text-warning',
  Welding: 'bg-destructive/10 text-destructive',
  Glazing: 'bg-success/10 text-success',
  'Quality Check': 'bg-info/10 text-info',
  Packaging: 'bg-success/10 text-success',
};

export default function Cutting() {
  const { t } = useI18n();
  const cuttingOrders = sampleWorkOrders.filter(w => w.stage === 'Cutting');
  const allStages = ['Cutting', 'Machining', 'Assembly'] as const;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{t('nav.cutting')}</h1>
        <p className="text-sm text-muted-foreground">Cutting & optimization management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Cutting', 'Machining', 'Assembly'] as const).map(stage => {
          const jobs = sampleWorkOrders.filter(j => j.stage === stage);
          return (
            <Card key={stage} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">{stage}</h3>
                  <Badge variant="secondary" className="text-[10px]">{jobs.length}</Badge>
                </div>
                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono font-medium">{job.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColor[job.stage]}`}>{job.stage}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{job.productName}</p>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <span className="text-muted-foreground">Qty: <strong className="text-foreground">{job.completed}/{job.quantity}</strong></span>
                        <span className="text-muted-foreground">Progress: <strong className="text-foreground">{job.progress}%</strong></span>
                        <span className="text-muted-foreground">Team: <strong className="text-foreground">{job.assignee}</strong></span>
                        <span className="text-muted-foreground">Due: <strong className="text-foreground">{job.dueDate}</strong></span>
                      </div>
                    </div>
                  ))}
                  {jobs.length === 0 && <p className="text-xs text-muted-foreground text-center py-4">No jobs</p>}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
