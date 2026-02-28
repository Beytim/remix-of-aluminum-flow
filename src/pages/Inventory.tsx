import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, AlertTriangle, Boxes } from "lucide-react";
import { sampleInventory } from "@/data/sampleData";
import { useI18n } from "@/lib/i18n";

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("all");
  const [showLowStock, setShowLowStock] = useState(false);
  const { t, language } = useI18n();

  const filtered = useMemo(() => {
    return sampleInventory.filter(item => {
      const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase());
      const matchCat = catFilter === "all" || item.category === catFilter;
      const matchLow = !showLowStock || item.stock <= item.minStock;
      return matchSearch && matchCat && matchLow;
    });
  }, [search, catFilter, showLowStock]);

  const lowStockCount = sampleInventory.filter(i => i.stock <= i.minStock).length;
  const totalValue = sampleInventory.reduce((sum, i) => sum + i.stock * i.cost, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('inventory.title')}</h1>
          <p className="text-sm text-muted-foreground">
            {sampleInventory.length} items · Value: ETB {totalValue.toLocaleString()}
            {lowStockCount > 0 && <span className="text-destructive font-medium ml-2">· {lowStockCount} {t('inventory.low_stock')}</span>}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">{t('inventory.receive')}</Button>
          <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />{t('common.add')}</Button>
        </div>
      </div>

      <Card className="shadow-card">
        <CardContent className="p-3 flex gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder={t('common.search')} className="pl-9 h-9" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {['Profile', 'Glass', 'Hardware', 'Accessory', 'Steel'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant={showLowStock ? "destructive" : "outline"} size="sm" onClick={() => setShowLowStock(!showLowStock)}>
            <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />{t('inventory.low_stock')} ({lowStockCount})
          </Button>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Code</TableHead>
                <TableHead className="text-xs">{t('common.name')}</TableHead>
                <TableHead className="text-xs">{t('products.category')}</TableHead>
                <TableHead className="text-xs text-right">Stock</TableHead>
                <TableHead className="text-xs text-right">Reserved</TableHead>
                <TableHead className="text-xs text-right">Available</TableHead>
                <TableHead className="text-xs">Location</TableHead>
                <TableHead className="text-xs text-right">Cost</TableHead>
                <TableHead className="text-xs">{t('common.status')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(item => {
                const isLow = item.stock <= item.minStock;
                return (
                  <TableRow key={item.id} className={isLow ? "bg-destructive/5" : ""}>
                    <TableCell className="text-xs font-mono">{item.code}</TableCell>
                    <TableCell className="text-xs font-medium">{language === 'am' ? item.nameAm : item.name}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-[10px]">{item.category}</Badge></TableCell>
                    <TableCell className="text-xs text-right font-semibold">{item.stock} {item.unit}</TableCell>
                    <TableCell className="text-xs text-right text-muted-foreground">{item.reserved}</TableCell>
                    <TableCell className="text-xs text-right font-medium">{item.available}</TableCell>
                    <TableCell className="text-xs font-mono text-muted-foreground">{item.location}</TableCell>
                    <TableCell className="text-xs text-right">ETB {item.cost}</TableCell>
                    <TableCell>
                      {isLow ? (
                        <Badge variant="destructive" className="text-[10px]">{t('inventory.low_stock')}</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] text-success border-success/30">OK</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Boxes className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">{t('common.no_data')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
