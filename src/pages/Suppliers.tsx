import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Star } from "lucide-react";
import { sampleSuppliers } from "@/data/sampleData";

export default function Suppliers() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Suppliers & Purchasing</h1>
          <p className="text-sm text-muted-foreground">{sampleSuppliers.length} suppliers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />New PO</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Add Supplier</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">ID</TableHead>
                <TableHead className="text-xs">Company</TableHead>
                <TableHead className="text-xs">Contact</TableHead>
                <TableHead className="text-xs">Lead Time</TableHead>
                <TableHead className="text-xs">Rating</TableHead>
                <TableHead className="text-xs">Terms</TableHead>
                <TableHead className="text-xs">Preferred</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSuppliers.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-xs font-mono">{s.id}</TableCell>
                  <TableCell className="text-xs font-medium">{s.company}</TableCell>
                  <TableCell>
                    <div><p className="text-xs">{s.contact}</p><p className="text-[10px] text-muted-foreground">{s.email}</p></div>
                  </TableCell>
                  <TableCell className="text-xs">{s.leadTime} days</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < s.rating ? 'text-warning fill-warning' : 'text-muted'}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{s.paymentTerms}</TableCell>
                  <TableCell>
                    {s.preferred && <Badge className="text-[10px] bg-success/10 text-success border-0">Preferred</Badge>}
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
