import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/data/sampleData";

const categories = ['Windows', 'Doors', 'Curtain Walls', 'Handrails', 'Louvers', 'Partitions', 'Sheet', 'Plate', 'Bar/Rod', 'Tube/Pipe', 'Angle', 'Channel', 'Beam', 'Profile', 'Coil', 'Custom'] as const;
const alloys = ['6061', '6063', '7075', '2024', '5052', '5083', '6060', '6082', 'Other'];
const tempers = ['T6', 'T5', 'T4', 'T651', 'O', 'H14', 'H32', 'Other'];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

export function EditProductDialog({ open, onOpenChange, product, onSave }: Props) {
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '', nameAm: '', category: '', subcategory: '', profile: '', glass: '',
    colors: '', laborHrs: '', materialCost: '', sellingPrice: '', alloyType: '', temper: '',
    currentStock: '', minStock: '', maxStock: '', warehouseLocation: '', notes: '',
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name, nameAm: product.nameAm, category: product.category,
        subcategory: product.subcategory || '', profile: product.profile, glass: product.glass,
        colors: product.colors.join(', '), laborHrs: String(product.laborHrs || ''),
        materialCost: String(product.materialCost), sellingPrice: String(product.sellingPrice),
        alloyType: product.alloyType || '', temper: product.temper || '',
        currentStock: String(product.currentStock || ''), minStock: String(product.minStock || ''),
        maxStock: String(product.maxStock || ''), warehouseLocation: product.warehouseLocation || '',
        notes: product.notes || '',
      });
      setErrors({});
    }
  }, [product]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.nameAm.trim()) e.nameAm = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.materialCost || Number(form.materialCost) <= 0) e.materialCost = 'Must be > 0';
    if (!form.sellingPrice || Number(form.sellingPrice) <= 0) e.sellingPrice = 'Must be > 0';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !product) return;
    const updated: Product = {
      ...product,
      name: form.name.trim(), nameAm: form.nameAm.trim(),
      category: form.category as Product['category'], subcategory: form.subcategory.trim(),
      profile: form.profile.trim(), glass: form.glass.trim(),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      laborHrs: Number(form.laborHrs) || 0,
      materialCost: Number(form.materialCost), sellingPrice: Number(form.sellingPrice),
      alloyType: form.alloyType || undefined, temper: form.temper || undefined,
      currentStock: Number(form.currentStock) || 0, minStock: Number(form.minStock) || 0,
      maxStock: Number(form.maxStock) || 0, warehouseLocation: form.warehouseLocation || undefined,
      notes: form.notes || undefined,
    };
    onSave(updated);
    toast({ title: "Updated", description: `${updated.name} saved.` });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Edit Product</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Name (EN) *</Label>
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={errors.name ? 'border-destructive' : ''} />
            {errors.name && <p className="text-[10px] text-destructive mt-0.5">{errors.name}</p>}
          </div>
          <div>
            <Label className="text-xs">ስም (AM) *</Label>
            <Input value={form.nameAm} onChange={e => setForm(p => ({ ...p, nameAm: e.target.value }))} className={errors.nameAm ? 'border-destructive' : ''} />
          </div>
          <div>
            <Label className="text-xs">Category *</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}><SelectValue /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Alloy Type</Label>
            <Select value={form.alloyType} onValueChange={v => setForm(p => ({ ...p, alloyType: v }))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{alloys.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Temper</Label>
            <Select value={form.temper} onValueChange={v => setForm(p => ({ ...p, temper: v }))}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{tempers.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Profile</Label>
            <Input value={form.profile} onChange={e => setForm(p => ({ ...p, profile: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Glass</Label>
            <Input value={form.glass} onChange={e => setForm(p => ({ ...p, glass: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Colors (comma-separated)</Label>
            <Input value={form.colors} onChange={e => setForm(p => ({ ...p, colors: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Material Cost (ETB) *</Label>
            <Input type="number" value={form.materialCost} onChange={e => setForm(p => ({ ...p, materialCost: e.target.value }))} className={errors.materialCost ? 'border-destructive' : ''} />
          </div>
          <div>
            <Label className="text-xs">Selling Price (ETB) *</Label>
            <Input type="number" value={form.sellingPrice} onChange={e => setForm(p => ({ ...p, sellingPrice: e.target.value }))} className={errors.sellingPrice ? 'border-destructive' : ''} />
          </div>
          <div>
            <Label className="text-xs">Current Stock</Label>
            <Input type="number" value={form.currentStock} onChange={e => setForm(p => ({ ...p, currentStock: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Min Stock</Label>
            <Input type="number" value={form.minStock} onChange={e => setForm(p => ({ ...p, minStock: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Warehouse Location</Label>
            <Input value={form.warehouseLocation} onChange={e => setForm(p => ({ ...p, warehouseLocation: e.target.value }))} placeholder="e.g. A-12-3" />
          </div>
          <div>
            <Label className="text-xs">Labor Hours</Label>
            <Input type="number" value={form.laborHrs} onChange={e => setForm(p => ({ ...p, laborHrs: e.target.value }))} />
          </div>
          <div className="sm:col-span-2">
            <Label className="text-xs">Notes</Label>
            <Input value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
