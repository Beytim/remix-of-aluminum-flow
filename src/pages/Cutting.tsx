import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { sampleCuttingJobs } from "@/data/sampleData";

const statusColor = { 'Pending': 'bg-warning/10 text-warning', 'In Progress': 'bg-info/10 text-info', 'Completed': 'bg-success/10 text-success' };

export default function Cutting() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Cutting & Fabrication</h1>
        <p className="text-sm text-muted-foreground">{sampleCuttingJobs.length} jobs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(['Pending', 'In Progress', 'Completed'] as const).map(status => {
          const jobs = sampleCuttingJobs.filter(j => j.status === status);
          return (
            <Card key={status} className="shadow-card">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">{status}</h3>
                  <Badge variant="secondary" className="text-[10px]">{jobs.length}</Badge>
                </div>
                <div className="space-y-3">
                  {jobs.map(job => (
                    <div key={job.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono font-medium">{job.id}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${statusColor[job.status]}`}>{job.status}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{job.product}</p>
                      <div className="grid grid-cols-2 gap-1 text-[10px]">
                        <span className="text-muted-foreground">Cuts: <strong className="text-foreground">{job.cuts}</strong></span>
                        <span className="text-muted-foreground">Waste: <strong className="text-destructive">{job.waste}%</strong></span>
                        <span className="text-muted-foreground">Order: <strong className="text-foreground">{job.orderId}</strong></span>
                        <span className="text-muted-foreground">By: <strong className="text-foreground">{job.assignedTo}</strong></span>
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
