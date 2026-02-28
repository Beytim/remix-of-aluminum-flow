import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Star } from "lucide-react";
import { sampleSuppliers } from "@/data/sampleData";

export default function Suppliers() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Suppliers</h1>
        <p className="text-sm text-muted-foreground">{sampleSuppliers.length} suppliers</p>
      </div>
      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Company</TableHead>
                <TableHead className="text-xs">Contact</TableHead>
                <TableHead className="text-xs">Country</TableHead>
                <TableHead className="text-xs">Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSuppliers.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="text-xs font-medium">{s.company}</TableCell>
                  <TableCell className="text-xs">{s.contact}</TableCell>
                  <TableCell className="text-xs">{s.country}</TableCell>
                  <TableCell>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < s.rating ? 'text-warning fill-warning' : 'text-muted'}`} />
                      ))}
                    </div>
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
