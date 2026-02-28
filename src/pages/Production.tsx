import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { sampleWorkOrders } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const stages = ['Cutting', 'Machining', 'Assembly', 'Welding', 'Glazing', 'Quality Check', 'Packaging'] as const;
const priorityColor = { High: 'bg-destructive/10 text-destructive', Medium: 'bg-warning/10 text-warning', Low: 'bg-muted text-muted-foreground' };
const stageColor = {
  Cutting: 'bg-info/10 text-info', Machining: 'bg-primary/10 text-primary', Assembly: 'bg-warning/10 text-warning',
  Welding: 'bg-destructive/10 text-destructive', Glazing: 'bg-success/10 text-success',
  'Quality Check': 'bg-info/10 text-info', Packaging: 'bg-success/10 text-success',
};

export default function Production() {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('production.title')}</h1>
          <p className="text-sm text-muted-foreground">{sampleWorkOrders.length} {t('production.work_order').toLowerCase()}s</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New Work Order</Button>
      </div>

      {/* Stage Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map(stage => {
          const count = sampleWorkOrders.filter(w => w.stage === stage).length;
          return (
            <Card key={stage} className="shadow-card">
              <CardContent className="p-3 text-center">
                <p className="text-[10px] text-muted-foreground font-medium">{stage}</p>
                <p className="text-xl font-bold text-foreground mt-1">{count}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Work Orders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleWorkOrders.map(wo => (
          <Card key={wo.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono font-medium">{wo.id}</p>
                  <p className="text-sm font-semibold mt-0.5">{wo.productName}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[wo.priority]}`}>{wo.priority}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <span className="text-muted-foreground">Stage: <strong className="text-foreground">{wo.stage}</strong></span>
                <span className="text-muted-foreground">Team: <strong className="text-foreground">{wo.assignee}</strong></span>
                <span className="text-muted-foreground">Qty: <strong className="text-foreground">{wo.completed}/{wo.quantity}</strong></span>
                <span className="text-muted-foreground">Due: <strong className="text-foreground">{wo.dueDate}</strong></span>
              </div>
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{wo.progress}%</span>
                </div>
                <Progress value={wo.progress} className="h-1.5" />
              </div>
              <Badge className={`text-[10px] ${stageColor[wo.stage]}`}>{wo.stage}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
