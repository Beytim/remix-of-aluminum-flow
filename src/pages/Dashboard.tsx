import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign, Package, ShoppingCart, AlertTriangle, TrendingUp,
  Plus, FileText, ClipboardList, Truck,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  salesTrendData, topProductsData, inventoryByAlloyData,
  sampleActivities, sampleOrders,
} from "@/data/sampleData";
import { useNavigate } from "react-router-dom";

const statCards = [
  { title: "Inventory Value", value: "$284,500", change: "+2.5%", icon: Package, trend: "up" as const },
  { title: "Today's Sales", value: "$9,200", change: "+18%", icon: DollarSign, trend: "up" as const },
  { title: "Monthly Sales", value: "$156,800", change: "+12%", icon: TrendingUp, trend: "up" as const },
  { title: "Pending Orders", value: "4", change: "-2", icon: ShoppingCart, trend: "down" as const },
  { title: "Low Stock Items", value: "2", change: "+1", icon: AlertTriangle, trend: "warning" as const },
];

const activityIcons: Record<string, string> = {
  order: "🛒", stock: "📦", alert: "⚠️", quote: "📋",
};

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => navigate('/quotes')}>
            <FileText className="h-3.5 w-3.5 mr-1.5" /> New Quote
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate('/inventory')}>
            <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Inventory
          </Button>
          <Button size="sm" onClick={() => navigate('/orders')}>
            <ShoppingCart className="h-3.5 w-3.5 mr-1.5" /> New Order
          </Button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="shadow-card hover:shadow-card-hover transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground">{stat.title}</span>
                <stat.icon className={`h-4 w-4 ${stat.trend === 'warning' ? 'text-warning' : 'text-muted-foreground'}`} />
              </div>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className={`text-xs mt-1 ${
                stat.trend === 'up' ? 'text-success' :
                stat.trend === 'warning' ? 'text-warning' :
                'text-muted-foreground'
              }`}>
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sales Trend */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Sales Trend (30 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={salesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 86%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" />
                <YAxis tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Line type="monotone" dataKey="sales" stroke="hsl(212, 72%, 42%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inventory by Alloy */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Inventory by Alloy</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={inventoryByAlloyData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                  {inventoryByAlloyData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => [`${value}%`, 'Share']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {inventoryByAlloyData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.fill }} />
                  <span className="text-muted-foreground">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Top Products */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Top 5 Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={topProductsData} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 18%, 86%)" />
                <XAxis type="number" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" tickFormatter={(v) => `$${v/1000}k`} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} stroke="hsl(215, 12%, 50%)" width={90} />
                <Tooltip formatter={(value: number) => [`$${value.toLocaleString()}`, 'Sales']} />
                <Bar dataKey="sales" fill="hsl(212, 72%, 42%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto">
              {sampleActivities.map((activity) => (
                <div key={activity.id} className="flex gap-2 text-sm">
                  <span className="text-base shrink-0">{activityIcons[activity.type]}</span>
                  <div className="min-w-0">
                    <p className="text-xs text-card-foreground leading-snug">{activity.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[240px] overflow-auto">
              {sampleOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between text-sm">
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-card-foreground">{order.id}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{order.customerName}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-semibold text-card-foreground">${order.total.toLocaleString()}</p>
                    <Badge variant={
                      order.status === 'Completed' ? 'default' :
                      order.status === 'Processing' ? 'secondary' :
                      'outline'
                    } className="text-[10px] h-4">
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
