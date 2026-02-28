import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Calendar, MapPin } from "lucide-react";
import { sampleInstallations } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const statusColor: Record<string, string> = {
  Scheduled: 'bg-info/10 text-info',
  'In Progress': 'bg-warning/10 text-warning',
  Completed: 'bg-success/10 text-success',
};

export default function Installation() {
  const { t, language } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.installation')}</h1>
          <p className="text-sm text-muted-foreground">{sampleInstallations.length} installations</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Schedule Installation</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleInstallations.map(inst => (
          <Card key={inst.id} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-mono text-muted-foreground">{inst.id}</p>
                  <h3 className="text-sm font-semibold mt-0.5">{inst.projectName}</h3>
                  <p className="text-[10px] text-muted-foreground">{inst.customerName}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColor[inst.status]}`}>{inst.status}</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <MapPin className="h-3 w-3" />{inst.address}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />{inst.scheduledDate}
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground border-t pt-2">
                {language === 'am' ? inst.notesAm : inst.notes}
              </p>
              <Badge variant="secondary" className="text-[10px]">{inst.team}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
