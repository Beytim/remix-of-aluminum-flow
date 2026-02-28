import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Plus, Users, Briefcase } from "lucide-react";
import { sampleEmployees } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

export default function HR() {
  const { t, language } = useI18n();
  const departments = [...new Set(sampleEmployees.map(e => e.department))];
  const totalPayroll = sampleEmployees.reduce((s, e) => s + e.salary, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('hr.title')}</h1>
          <p className="text-sm text-muted-foreground">{sampleEmployees.length} {t('hr.employees').toLowerCase()} · Payroll: ETB {totalPayroll.toLocaleString()}/mo</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Add Employee</Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {departments.map(dept => {
          const count = sampleEmployees.filter(e => e.department === dept).length;
          return (
            <Card key={dept} className="shadow-card">
              <CardContent className="p-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-[10px] text-muted-foreground">{dept}</p>
                  <p className="text-sm font-bold">{count}</p>
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
                <TableHead className="text-xs">{t('common.name')}</TableHead>
                <TableHead className="text-xs">Position</TableHead>
                <TableHead className="text-xs">Department</TableHead>
                <TableHead className="text-xs">Hire Date</TableHead>
                <TableHead className="text-xs text-right">Salary</TableHead>
                <TableHead className="text-xs">Performance</TableHead>
                <TableHead className="text-xs">{t('common.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleEmployees.map(emp => (
                <TableRow key={emp.id}>
                  <TableCell className="text-xs font-mono">{emp.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-xs font-medium">{language === 'am' ? emp.nameAm : emp.name}</p>
                        <p className="text-[10px] text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{emp.position}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{emp.department}</Badge></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{emp.hireDate}</TableCell>
                  <TableCell className="text-xs text-right font-medium">ETB {emp.salary.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={emp.performance} className="h-1.5 w-16" />
                      <span className="text-[10px] font-medium">{emp.performance}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={emp.status === 'active' ? 'outline' : 'secondary'} className={`text-[10px] ${emp.status === 'active' ? 'text-success border-success/30' : 'text-warning border-warning/30'}`}>
                      {emp.status === 'active' ? 'Active' : 'On Leave'}
                    </Badge>
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
