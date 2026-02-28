import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, BarChart3, DollarSign, Package, Factory, Wrench, Users } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { topProductsData } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

const reportCards = [
  { title: "Project Status Report", icon: FileText, desc: "Active projects and their current stages" },
  { title: "Production Schedule", icon: Factory, desc: "Work orders and production timeline" },
  { title: "Installation Schedule", icon: Wrench, desc: "Upcoming installations and team assignments" },
  { title: "Material Usage", icon: Package, desc: "Material consumption and waste tracking" },
  { title: "Inventory Valuation", icon: Package, desc: "Current stock value by category" },
  { title: "Profitability by Project", icon: DollarSign, desc: "Revenue, costs, and margins per project" },
  { title: "Supplier Performance", icon: Users, desc: "Lead times, quality, and ratings" },
  { title: "Aging Report", icon: BarChart3, desc: "Outstanding receivables by age" },
];

export default function Reports() {
  const { t } = useI18n();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.reports')}</h1>
          <p className="text-sm text-muted-foreground">Comprehensive business insights</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />{t('common.export')} PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportCards.map((r) => (
          <Card key={r.title} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <r.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="text-sm font-semibold">{r.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Top Products by Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 86%)" />
              <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" />
              <YAxis tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" tickFormatter={(v) => `${v/1000}k`} />
              <Tooltip formatter={(value: number) => [`ETB ${value.toLocaleString()}`, 'Revenue']} />
              <Bar dataKey="sales" fill="hsl(212, 72%, 42%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
