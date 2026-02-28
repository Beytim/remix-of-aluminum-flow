import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FolderKanban, Factory, Wrench, DollarSign, TrendingUp,
  Plus, FileText, AlertTriangle,
} from "lucide-react";
import {
  AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  revenueTargetData, projectsByTypeData, sampleActivities,
  sampleInventory, sampleInstallations, sampleProjects,
} from "@/data/sampleData";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";

const statCards = [
  { titleKey: 'dash.active_projects', value: '7', change: '+2', icon: FolderKanban, trend: 'up' as const },
  { titleKey: 'dash.in_production', value: '4', change: '3 work orders', icon: Factory, trend: 'up' as const },
  { titleKey: 'dash.ready_install', value: '2', change: 'This week', icon: Wrench, trend: 'up' as const },
  { titleKey: 'dash.monthly_revenue', value: 'ETB 890K', change: '+12%', icon: DollarSign, trend: 'up' as const },
];

const activityIcons: Record<string, string> = {
  order: '🛒', stock: '📦', alert: '⚠️', quote: '📋', production: '🏭', install: '🔧',
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const lowStockItems = sampleInventory.filter(i => i.stock <= i.minStock);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.dashboard')}</h1>
          <p className="text-sm text-muted-foreground">{t('dash.welcome')}</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate('/quotes')}>
            <FileText className="h-3.5 w-3.5 mr-1.5" />{t('nav.quotes')}
          </Button>
          <Button size="sm" onClick={() => navigate('/projects')}>
            <Plus className="h-3.5 w-3.5 mr-1.5" />{t('nav.projects')}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.titleKey} className="shadow-card hover:shadow-card-hover transition-shadow overflow-hidden">
            <CardContent className="p-4 relative">
              <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                <stat.icon className="w-full h-full" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{t(stat.titleKey)}</span>
                <stat.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs mt-1 text-success">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t('dash.revenue_target')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={revenueTargetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 86%)" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip formatter={(value: number) => [`ETB ${value.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="target" stroke="hsl(215, 12%, 70%)" fill="hsl(215, 12%, 90%)" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="revenue" stroke="hsl(212, 72%, 42%)" fill="hsl(212, 72%, 42%)" fillOpacity={0.2} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t('dash.projects_type')}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={projectsByTypeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {projectsByTypeData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 justify-center mt-2">
              {projectsByTypeData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
                  <span className="text-muted-foreground">{entry.name} ({entry.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Low Stock Alerts */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />{t('dash.low_stock_alerts')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto">
              {lowStockItems.length > 0 ? lowStockItems.map(item => (
                <div key={item.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-destructive/5 border border-destructive/10">
                  <div>
                    <p className="text-xs font-medium text-card-foreground">{language === 'am' ? item.nameAm : item.name}</p>
                    <p className="text-[10px] text-muted-foreground">{item.category} · {item.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-destructive">{item.stock} {item.unit}</p>
                    <p className="text-[10px] text-muted-foreground">Min: {item.minStock}</p>
                  </div>
                </div>
              )) : <p className="text-xs text-muted-foreground text-center py-4">All stock levels OK</p>}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t('dash.recent_activity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto">
              {sampleActivities.map((activity) => (
                <div key={activity.id} className="flex gap-2 text-sm">
                  <span className="text-base shrink-0">{activityIcons[activity.type]}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-card-foreground leading-snug">
                      {language === 'am' ? activity.messageAm : activity.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Installations */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">{t('dash.today_installs')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto">
              {sampleInstallations.map((inst) => (
                <div key={inst.id} className="p-2 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-card-foreground">{inst.projectName}</p>
                      <p className="text-[10px] text-muted-foreground">{inst.customerName}</p>
                      <p className="text-[10px] text-muted-foreground">{inst.address}</p>
                    </div>
                    <Badge variant={inst.status === 'Completed' ? 'default' : inst.status === 'In Progress' ? 'secondary' : 'outline'} className="text-[10px]">
                      {inst.status}
                    </Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1">{inst.team} · {inst.scheduledDate}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
