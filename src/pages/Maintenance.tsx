import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, AlertTriangle, Wrench } from "lucide-react";
import { sampleMaintenanceTasks } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const statusColor: Record<string, string> = {
  Scheduled: 'bg-info/10 text-info',
  'In Progress': 'bg-warning/10 text-warning',
  Completed: 'bg-success/10 text-success',
  Overdue: 'bg-destructive/10 text-destructive',
};

const typeColor: Record<string, string> = {
  Preventive: 'bg-primary/10 text-primary',
  Corrective: 'bg-warning/10 text-warning',
  Predictive: 'bg-info/10 text-info',
};

export default function Maintenance() {
  const { t } = useI18n();
  const overdueCount = sampleMaintenanceTasks.filter(m => m.status === 'Overdue').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.maintenance')}</h1>
          <p className="text-sm text-muted-foreground">
            {sampleMaintenanceTasks.length} tasks
            {overdueCount > 0 && <span className="text-destructive font-medium ml-2">· {overdueCount} overdue</span>}
          </p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleMaintenanceTasks.map(task => (
          <Card key={task.id} className={`shadow-card ${task.status === 'Overdue' ? 'border-destructive/30' : ''}`}>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Wrench className={`h-4 w-4 ${task.status === 'Overdue' ? 'text-destructive' : 'text-primary'}`} />
                  <div>
                    <p className="text-sm font-semibold">{task.machineName}</p>
                    <p className="text-[10px] text-muted-foreground">{task.machineId}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[task.status]}`}>{task.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <span className="text-muted-foreground">Type: <Badge className={`text-[10px] ${typeColor[task.type]}`}>{task.type}</Badge></span>
                <span className="text-muted-foreground">Date: <strong className="text-foreground">{task.scheduledDate}</strong></span>
                <span className="text-muted-foreground">Assignee: <strong className="text-foreground">{task.assignee}</strong></span>
              </div>
              <p className="text-[10px] text-muted-foreground border-t pt-2">{task.notes}</p>
              {task.status === 'Overdue' && (
                <div className="flex items-center gap-1 text-[10px] text-destructive">
                  <AlertTriangle className="h-3 w-3" />Maintenance overdue - requires immediate attention
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
