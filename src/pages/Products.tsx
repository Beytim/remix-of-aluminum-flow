import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Grid3X3, List, Package, Trash2 } from "lucide-react";
import { sampleProducts } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";
import { useLocalStorage, STORAGE_KEYS } from "@/lib/localStorage";
import { AddProductDialog } from "@/components/dialogs/AddProductDialog";
import type { Product } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Products() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEYS.PRODUCTS, sampleProducts);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [dialogOpen, setDialogOpen] = useState(false);
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('products.title')}</h1>
          <p className="text-sm text-muted-foreground">{products.length} {t('nav.products').toLowerCase()}</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md">
            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('table')}><List className="h-3.5 w-3.5" /></Button>
            <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" className="h-8 w-8" onClick={() => setViewMode('grid')}><Grid3X3 className="h-3.5 w-3.5" /></Button>
          </div>
          <Button size="sm" onClick={() => setDialogOpen(true)}><Plus className="h-3.5 w-3.5 mr-1.5" />{t('products.add')}</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('common.search')} className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-40 h-9"><SelectValue placeholder={t('products.category')} /></SelectTrigger>
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
            <Card key={p.id} className="shadow-card hover:shadow-card-hover transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary" className="text-[10px]">{p.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Badge variant={p.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${p.status === 'Active' ? 'text-success border-success/30' : ''}`}>{p.status}</Badge>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleDelete(p.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
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
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.colors.map(c => <span key={c} className="text-[10px] px-1.5 py-0.5 bg-muted rounded">{c}</span>)}
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
                  <TableHead className="text-xs">{t('products.category')}</TableHead>
                  <TableHead className="text-xs">Profile</TableHead>
                  <TableHead className="text-xs">Glass</TableHead>
                  <TableHead className="text-xs text-right">{t('products.material_cost')}</TableHead>
                  <TableHead className="text-xs text-right">{t('products.selling_price')}</TableHead>
                  <TableHead className="text-xs">{t('common.status')}</TableHead>
                  <TableHead className="text-xs"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map(p => (
                  <TableRow key={p.id}>
                    <TableCell className="text-xs font-mono">{p.code}</TableCell>
                    <TableCell className="text-xs font-medium">{language === 'am' ? p.nameAm : p.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{p.category}</Badge></TableCell>
                    <TableCell className="text-xs">{p.profile}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.glass}</TableCell>
                    <TableCell className="text-xs text-right">ETB {p.materialCost.toLocaleString()}</TableCell>
                    <TableCell className="text-xs text-right font-semibold">ETB {p.sellingPrice.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={p.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${p.status === 'Active' ? 'text-success border-success/30' : ''}`}>{p.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(p.id)}><Trash2 className="h-3 w-3 text-destructive" /></Button>
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
    </div>
  );
}
