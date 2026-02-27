import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus } from "lucide-react";
import { sampleOrders, type OrderStatus } from "@/data/sampleData";

const statusColors: Record<OrderStatus, string> = {
  'Draft': 'bg-muted text-muted-foreground',
  'Quote Accepted': 'bg-info/10 text-info',
  'Payment Received': 'bg-success/10 text-success',
  'Processing': 'bg-warning/10 text-warning',
  'Ready': 'bg-primary/10 text-primary',
  'Shipped': 'bg-info/10 text-info',
  'Delivered': 'bg-success/10 text-success',
  'Completed': 'bg-success/10 text-success',
  'Cancelled': 'bg-destructive/10 text-destructive',
};

export default function Orders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleOrders.filter(o => {
    const matchesSearch = !search || o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">{sampleOrders.length} orders</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New Order</Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {['Draft','Quote Accepted','Payment Received','Processing','Ready','Shipped','Delivered','Completed','Cancelled'].map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Order #</TableHead>
                <TableHead className="text-xs">Customer</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Delivery</TableHead>
                <TableHead className="text-xs text-center">Items</TableHead>
                <TableHead className="text-xs text-right">Total</TableHead>
                <TableHead className="text-xs">Payment</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="text-xs font-mono font-medium">{o.id}</TableCell>
                  <TableCell className="text-xs">{o.customerName}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{o.date}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{o.deliveryDate}</TableCell>
                  <TableCell className="text-xs text-center">{o.items}</TableCell>
                  <TableCell className="text-xs text-right font-semibold">${o.total.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={o.paymentStatus === 'Paid' ? 'default' : o.paymentStatus === 'Partial' ? 'secondary' : 'outline'} className="text-[10px]">
                      {o.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${statusColors[o.status]}`}>
                      {o.status}
                    </span>
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
