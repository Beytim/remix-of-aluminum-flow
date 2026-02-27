import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Building2 } from "lucide-react";
import { sampleCustomers } from "@/data/sampleData";

export default function Customers() {
  const [search, setSearch] = useState("");
  const filtered = sampleCustomers.filter(c =>
    !search || c.company.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground">{sampleCustomers.length} customers</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Add Customer</Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Company</TableHead>
                <TableHead className="text-xs">Contact</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Terms</TableHead>
                <TableHead className="text-xs text-right">Credit Limit</TableHead>
                <TableHead className="text-xs text-right">Total Spent</TableHead>
                <TableHead className="text-xs text-right">Orders</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <Building2 className="h-3.5 w-3.5 text-primary" />
                      </div>
                      <div><p className="text-xs font-medium">{c.company}</p><p className="text-[10px] text-muted-foreground">{c.email}</p></div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{c.contact}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{c.customerType}</Badge></TableCell>
                  <TableCell className="text-xs">{c.paymentTerms}</TableCell>
                  <TableCell className="text-xs text-right">${c.creditLimit.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right font-medium">${c.totalSpent.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right">{c.totalOrders}</TableCell>
                  <TableCell>
                    <Badge variant={c.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${c.status === 'Active' ? 'text-success border-success/30' : ''}`}>
                      {c.status}
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
