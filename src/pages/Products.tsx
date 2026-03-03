import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Grid3X3, List, Package, Trash2, Pencil, Download } from "lucide-react";
import { sampleProducts } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/localStorage";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import { EditProductDialog } from "@/components/dialogs/EditProductDialog";
import { generateReportPDF } from "@/lib/pdfExport";
import type { Product } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEYS.PRODUCTS, sampleProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const { t, language } = useI18n();
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || p.category === catFilter;
      return matchSearch && matchCat;
    });
  }, [search, catFilter, products]);

  const categories = [...new Set(products.map(p => p.category))];

  const handleDelete = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast({ title: "Deleted", description: "Product removed." });
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  const handleSaveEdit = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleExportPDF = () => {
    generateReportPDF("Product Catalog",
      ['Code', 'Name', 'Category', 'Profile', 'Material Cost', 'Selling Price', 'Status'],
      filtered.map(p => [p.code, p.name, p.category, p.profile, `ETB ${p.materialCost.toLocaleString()}`, `ETB ${p.sellingPrice.toLocaleString()}`, p.status])
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{t('products.title')}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">{products.length} {t('nav.products').toLowerCase()}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="flex border rounded-md">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('table')}><List className="h-3.5 w-3.5" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('grid')}><Grid3X3 className="h-3.5 w-3.5" /></Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleExportPDF}><Download className="h-3.5 w-3.5 mr-1.5" />PDF</Button>
          <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="h-3.5 w-3.5 mr-1.5" />{t('products.add')}</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('common.search')} className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-32 sm:w-40 h-9"><SelectValue placeholder={t('products.category')} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => (
            <Card key={p.id} className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer" onClick={() => handleEdit(p)}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Badge variant={p.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${p.status === 'Active' ? 'text-success border-success/30' : ''}`}>{p.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={e => { e.stopPropagation(); handleDelete(p.id); }}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                  </div>
                </div>
                <h3 className="text-sm font-semibold mt-2">{language === 'am' ? p.nameAm : p.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-1">{p.profile} · {p.glass}</p>
                <div className="flex items-center justify-between mt-3 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">{t('products.material_cost')}</span>
                  <span className="text-sm font-bold text-foreground">ETB {p.materialCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{t('products.selling_price')}</span>
                  <span className="text-sm font-bold text-primary">ETB {p.sellingPrice.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="shadow-card">
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Code</TableHead>
                  <TableHead className="text-xs">{t('common.name')}</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">{t('products.category')}</TableHead>
                  <TableHead className="text-xs hidden md:table-cell">Profile</TableHead>
                  <TableHead className="text-xs hidden lg:table-cell">Glass</TableHead>
                  <TableHead className="text-xs text-right">{t('products.material_cost')}</TableHead>
                  <TableHead className="text-xs text-right">{t('products.selling_price')}</TableHead>
                  <TableHead className="text-xs hidden sm:table-cell">{t('common.status')}</TableHead>
                  <TableHead className="text-xs w-20">{t('common.actions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handleEdit(p)}>
                    <TableCell className="text-xs font-mono">{p.code}</TableCell>
                    <TableCell className="text-xs font-medium">{language === 'am' ? p.nameAm : p.name}</TableCell>
                    <TableCell className="hidden sm:table-cell"><Badge variant="secondary" className="text-[10px]">{p.category}</Badge></TableCell>
                    <TableCell className="text-xs hidden md:table-cell">{p.profile}</TableCell>
                    <TableCell className="text-xs text-muted-foreground hidden lg:table-cell">{p.glass}</TableCell>
                    <TableCell className="text-xs text-right">ETB {p.materialCost.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right font-semibold">ETB {p.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant={p.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${p.status === 'Active' ? 'text-success border-success/30' : ''}`}>{p.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); handleEdit(p); }}><Pencil className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={e => { e.stopPropagation(); handleDelete(p.id); }}><Trash2 className="h-3 w-3 text-destructive" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">{t('common.no_data')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <AddProductDialog open={dialogOpen} onOpenChange={setDialogOpen} onAdd={p => setProducts(prev => [...prev, p])} existingCount={products.length} />
      <EditProductDialog open={!!editProduct} onOpenChange={open => { if (!open) setEditProduct(null); }} product={editProduct} onSave={handleSaveEdit} />
    </div>
  );
}
