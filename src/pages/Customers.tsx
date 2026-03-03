import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Building2, Trash2, Pencil, Download } from "lucide-react";
import { sampleCustomers } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/localStorage";
import { AddCustomerDialog } from "@/components/dialogs/AddCustomerDialog";
import { EditCustomerDialog } from "@/components/dialogs/EditCustomerDialog";
import { generateReportPDF } from "@/lib/pdfExport";
import type { Customer } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Customers() {
  const [customers, setCustomers] = useLocalStorage<Customer[]>(STORAGE_KEYS.CUSTOMERS, sampleCustomers);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const { t, language } = useI18n();
  const { toast } = useToast();

  const filtered = customers.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
    toast({ title: "Deleted", description: "Customer removed." });
  };

  const handleExportPDF = () => {
    generateReportPDF("Customer List",
      ['Name', 'Contact', 'Type', 'Phone', 'Projects', 'Total Value', 'Outstanding'],
      filtered.map(c => [c.name, c.contact, c.type, c.phone, String(c.projects), `ETB ${c.totalValue.toLocaleString()}`, `ETB ${c.outstanding.toLocaleString()}`])
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('nav.customers')}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{customers.length} {t('nav.customers').toLowerCase()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportPDF}><Download className="h-3.5 w-3.5 mr-1.5" />PDF</Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="h-3.5 w-3.5 mr-1.5" />{t('common.add')}</Button>
        </div>
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
                <TableHead className="text-xs hidden sm:table-cell">Contact</TableHead>
                <TableHead className="text-xs hidden md:table-cell">Type</TableHead>
                <TableHead className="text-xs hidden lg:table-cell">Phone</TableHead>
                <TableHead className="text-xs text-right hidden sm:table-cell">Projects</TableHead>
                <TableHead className="text-xs text-right">{t('common.total')} Value</TableHead>
                <TableHead className="text-xs text-right hidden md:table-cell">Outstanding</TableHead>
                <TableHead className="text-xs w-20">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setEditCustomer(c)}>
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
                  <TableCell className="text-xs hidden sm:table-cell">{c.contact}</TableCell>
                  <TableCell className="hidden md:table-cell"><Badge variant="secondary" className="text-[10px]">{c.type}</Badge></TableCell>
                  <TableCell className="text-xs hidden lg:table-cell">{c.phone}</TableCell>
                  <TableCell className="text-xs text-right hidden sm:table-cell">{c.projects}</TableCell>
                  <TableCell className="text-xs text-right font-medium">ETB {c.totalValue.toLocaleString()}</TableCell>
                  <TableCell className="text-xs text-right hidden md:table-cell">
                    <span className={c.outstanding > 0 ? "text-warning font-medium" : "text-success"}>
                      ETB {c.outstanding.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); setEditCustomer(c); }}><Pencil className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); handleDelete(c.id); }}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddCustomerDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={c => setCustomers(prev => [...prev, c])} existingCount={customers.length} />
      <EditCustomerDialog open={!!editCustomer} onOpenChange={open => { if (!open) setEditCustomer(null); }} customer={editCustomer} onSave={updated => setCustomers(prev => prev.map(c => c.id === updated.id ? updated : c))} />
    </div>
  );
}
