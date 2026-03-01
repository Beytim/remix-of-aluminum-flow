import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Building2, Trash2 } from "lucide-react";
import { sampleCustomers } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/localStorage";
import { AddCustomerDialog } from "@/components/dialogs/AddCustomerDialog";
import type { Customer } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Customers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, sampleCustomers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { t, language } = useI18n();
  const { toast } = useToast();

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    toast({ title: "Deleted", description: "Customer removed." });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('nav.customers')}</h1>
          <p className="text-sm text-muted-foreground">{customers.length} {t('nav.customers').toLowerCase()}</p>
        </div>
        <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="h-3.5 w-3.5 mr-1.5" />{t('common.add')}</Button>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('common.search')} className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">{t('common.name')}</TableHead>
                <TableHead className="text-xs">Contact</TableHead>
                <TableHead className="text-xs">Type</TableHead>
                <TableHead className="text-xs">Phone</TableHead>
                <TableHead className="text-xs text-right">Projects</TableHead>
                <TableHead className="text-xs text-right">{t('common.total')} Value</TableHead>
                <TableHead className="text-xs text-right">Outstanding</TableHead>
                <TableHead className="text-xs"></TableHead>
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
                      <div>
                        <p className="text-xs font-medium">{language === 'am' ? c.nameAm : c.name}</p>
                        <p className="text-[10px] text-muted-foreground">{c.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{c.contact}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-[10px]">{c.type}</Badge></TableCell>
                  <TableCell className="text-xs">{c.phone}</TableCell>
                  <TableCell className="text-xs text-right">{c.projects}</TableCell>
                  <TableCell className="text-xs text-right font-medium">ETB {c.totalValue.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right">
                    <span className={c.outstanding > 0 ? "text-warning font-medium" : "text-success"}>
                      ETB {c.outstanding.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(c.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCustomerDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={c => setCustomers(prev => [...prev, c])} existingCount={customers.length} />
    </div>
  );
}
