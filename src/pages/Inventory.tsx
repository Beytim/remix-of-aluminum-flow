import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Filter, Download, Upload, AlertTriangle, Package } from "lucide-react";
import { sampleProducts, type Product, type AlloyType, type ProductForm } from "@/data/sampleData";
import { useToast } from "@/hooks/use-toast";

export default function Inventory() {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [search, setSearch] = useState("");
  const [alloyFilter, setAlloyFilter] = useState<string>("all");
  const [formFilter, setFormFilter] = useState<string>("all");
  const [showLowStock, setShowLowStock] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase()) ||
        p.alloy.toLowerCase().includes(search.toLowerCase());
      const matchesAlloy = alloyFilter === "all" || p.alloy === alloyFilter;
      const matchesForm = formFilter === "all" || p.form === formFilter;
      const matchesLowStock = !showLowStock || p.quantity <= p.minStock;
      return matchesSearch && matchesAlloy && matchesForm && matchesLowStock;
    });
  }, [products, search, alloyFilter, formFilter, showLowStock]);

  const lowStockCount = products.filter(p => p.quantity <= p.minStock).length;
  const totalValue = products.reduce((sum, p) => sum + p.quantity * p.sellingPrice * p.weightPerMeter, 0);

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newProduct: Product = {
      id: `ALU-${String(products.length + 1).padStart(3, '0')}`,
      name: form.get('name') as string,
      alloy: form.get('alloy') as AlloyType,
      temper: 'T6',
      form: form.get('form') as ProductForm,
      length: Number(form.get('length')) || undefined,
      width: Number(form.get('width')) || undefined,
      thickness: Number(form.get('thickness')) || undefined,
      weightPerMeter: Number(form.get('weight')) || 1,
      quantity: Number(form.get('quantity')) || 0,
      minStock: Number(form.get('minStock')) || 5,
      maxStock: 100,
      location: form.get('location') as string || 'TBD',
      supplierId: 'SUP-001',
      purchasePrice: Number(form.get('purchasePrice')) || 0,
      sellingPrice: Number(form.get('sellingPrice')) || 0,
      batchNumber: `B${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`,
      millCert: false,
      dateReceived: new Date().toISOString().split('T')[0],
      notes: '',
      unit: 'kg',
    };
    setProducts(prev => [...prev, newProduct]);
    setDialogOpen(false);
    toast({ title: "Product Added", description: `${newProduct.name} has been added to inventory.` });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            {products.length} products · {lowStockCount > 0 && (
              <span className="text-destructive font-medium">{lowStockCount} low stock</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Download className="h-3.5 w-3.5 mr-1.5" />Export</Button>
          <Button variant="outline" size="sm"><Upload className="h-3.5 w-3.5 mr-1.5" />Import</Button>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Add Product</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
              <form onSubmit={handleAddProduct} className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label className="text-xs">Product Name</Label><Input name="name" required placeholder="e.g. 6061-T6 Sheet 4x8" /></div>
                  <div><Label className="text-xs">Alloy Type</Label>
                    <Select name="alloy" defaultValue="6061">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['6061','6063','7075','2024','5052','5083','6060','6082','Other'].map(a => (
                          <SelectItem key={a} value={a}>{a}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label className="text-xs">Form</Label>
                    <Select name="form" defaultValue="Sheet">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Sheet','Plate','Bar/Rod','Tube/Pipe','Angle','Channel','Beam','Profile','Coil','Custom'].map(f => (
                          <SelectItem key={f} value={f}>{f}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div><Label className="text-xs">Location</Label><Input name="location" placeholder="A-01-1" /></div>
                  <div><Label className="text-xs">Length (mm)</Label><Input name="length" type="number" /></div>
                  <div><Label className="text-xs">Width (mm)</Label><Input name="width" type="number" /></div>
                  <div><Label className="text-xs">Thickness (mm)</Label><Input name="thickness" type="number" /></div>
                  <div><Label className="text-xs">Weight/m (kg)</Label><Input name="weight" type="number" step="0.1" /></div>
                  <div><Label className="text-xs">Quantity</Label><Input name="quantity" type="number" required /></div>
                  <div><Label className="text-xs">Min Stock</Label><Input name="minStock" type="number" defaultValue="5" /></div>
                  <div><Label className="text-xs">Purchase Price</Label><Input name="purchasePrice" type="number" step="0.01" /></div>
                  <div><Label className="text-xs">Selling Price</Label><Input name="sellingPrice" type="number" step="0.01" /></div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Product</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-3">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, ID, or alloy..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={alloyFilter} onValueChange={setAlloyFilter}>
              <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Alloy" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Alloys</SelectItem>
                {['6061','6063','7075','2024','5052','5083','6082'].map(a => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={formFilter} onValueChange={setFormFilter}>
              <SelectTrigger className="w-32 h-9"><SelectValue placeholder="Form" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                {['Sheet','Plate','Bar/Rod','Tube/Pipe','Angle','Channel','Profile'].map(f => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant={showLowStock ? "destructive" : "outline"} size="sm" onClick={() => setShowLowStock(!showLowStock)}>
              <AlertTriangle className="h-3.5 w-3.5 mr-1.5" />Low Stock ({lowStockCount})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="shadow-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">ID</TableHead>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-xs">Alloy</TableHead>
                  <TableHead className="text-xs">Form</TableHead>
                  <TableHead className="text-xs text-right">Qty</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs text-right">Buy Price</TableHead>
                  <TableHead className="text-xs text-right">Sell Price</TableHead>
                  <TableHead className="text-xs text-right">Margin</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((product) => {
                  const isLow = product.quantity <= product.minStock;
                  const margin = ((product.sellingPrice - product.purchasePrice) / product.purchasePrice * 100).toFixed(0);
                  return (
                    <TableRow key={product.id} className={isLow ? "bg-destructive/5" : ""}>
                      <TableCell className="text-xs font-mono">{product.id}</TableCell>
                      <TableCell className="text-xs font-medium max-w-[200px] truncate">{product.name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{product.alloy}</Badge></TableCell>
                      <TableCell className="text-xs">{product.form}</TableCell>
                      <TableCell className="text-xs text-right font-semibold">{product.quantity}</TableCell>
                      <TableCell className="text-xs font-mono text-muted-foreground">{product.location}</TableCell>
                      <TableCell className="text-xs text-right">${product.purchasePrice.toFixed(2)}</TableCell>
                      <TableCell className="text-xs text-right font-medium">${product.sellingPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-xs text-right text-success font-medium">{margin}%</TableCell>
                      <TableCell>
                        {isLow ? (
                          <Badge variant="destructive" className="text-[10px]">Low Stock</Badge>
                        ) : (
                          <Badge variant="outline" className="text-[10px] text-success border-success/30">In Stock</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No products found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
