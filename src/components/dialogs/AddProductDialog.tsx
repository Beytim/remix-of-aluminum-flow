import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useI18n } from "@/lib/i18n";
import type { Product } from "@/data/sampleData";

const categories = ['Windows', 'Doors', 'Curtain Walls', 'Handrails', 'Louvers', 'Partitions'] as const;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (product: Product) => void;
  existingCount: number;
}

export function AddProductDialog({ open, onOpenChange, onAdd, existingCount }: Props) {
  const { t } = useI18n();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    name: '', nameAm: '', category: '' as string, subcategory: '', profile: '', glass: '',
    colors: '', laborHrs: '', materialCost: '', sellingPrice: '',
  });

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.nameAm.trim()) e.nameAm = 'Required';
    if (!form.category) e.category = 'Required';
    if (!form.profile.trim()) e.profile = 'Required';
    if (!form.materialCost || Number(form.materialCost) <= 0) e.materialCost = 'Must be > 0';
    if (!form.sellingPrice || Number(form.sellingPrice) <= 0) e.sellingPrice = 'Must be > 0';
    if (Number(form.sellingPrice) < Number(form.materialCost)) e.sellingPrice = 'Must be >= material cost';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const id = `PRD-${String(existingCount + 1).padStart(3, '0')}`;
    const code = `${form.category.substring(0, 2).toUpperCase()}-${id}`;
    const product: Product = {
      id, code, name: form.name.trim(), nameAm: form.nameAm.trim(),
      category: form.category as Product['category'], subcategory: form.subcategory.trim(),
      profile: form.profile.trim(), glass: form.glass.trim(),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      laborHrs: Number(form.laborHrs) || 0,
      materialCost: Number(form.materialCost), sellingPrice: Number(form.sellingPrice),
      status: 'Active',
    };
    onAdd(product);
    toast({ title: t('common.add'), description: `${product.name} added successfully.` });
    setForm({ name: '', nameAm: '', category: '', subcategory: '', profile: '', glass: '', colors: '', laborHrs: '', materialCost: '', sellingPrice: '' });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{t('products.add')}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Name (EN) *</Label>
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className={errors.name ? 'border-destructive' : ''} />
            {errors.name && <p className="text-[10px] text-destructive mt-0.5">{errors.name}</p>}
          </div>
          <div>
            <Label className="text-xs">ስም (AM) *</Label>
            <Input value={form.nameAm} onChange={e => setForm(p => ({ ...p, nameAm: e.target.value }))} className={errors.nameAm ? 'border-destructive' : ''} />
            {errors.nameAm && <p className="text-[10px] text-destructive mt-0.5">{errors.nameAm}</p>}
          </div>
          <div>
            <Label className="text-xs">{t('products.category')} *</Label>
            <Select value={form.category} onValueChange={v => setForm(p => ({ ...p, category: v }))}>
              <SelectTrigger className={errors.category ? 'border-destructive' : ''}><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            {errors.category && <p className="text-[10px] text-destructive mt-0.5">{errors.category}</p>}
          </div>
          <div>
            <Label className="text-xs">Subcategory</Label>
            <Input value={form.subcategory} onChange={e => setForm(p => ({ ...p, subcategory: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">Profile *</Label>
            <Input value={form.profile} onChange={e => setForm(p => ({ ...p, profile: e.target.value }))} placeholder="e.g. 6063-T5" className={errors.profile ? 'border-destructive' : ''} />
            {errors.profile && <p className="text-[10px] text-destructive mt-0.5">{errors.profile}</p>}
          </div>
          <div>
            <Label className="text-xs">Glass</Label>
            <Input value={form.glass} onChange={e => setForm(p => ({ ...p, glass: e.target.value }))} placeholder="e.g. 6mm Clear Tempered" />
          </div>
          <div>
            <Label className="text-xs">Colors (comma-separated)</Label>
            <Input value={form.colors} onChange={e => setForm(p => ({ ...p, colors: e.target.value }))} placeholder="White, Black" />
          </div>
          <div>
            <Label className="text-xs">Labor Hours</Label>
            <Input type="number" value={form.laborHrs} onChange={e => setForm(p => ({ ...p, laborHrs: e.target.value }))} />
          </div>
          <div>
            <Label className="text-xs">{t('products.material_cost')} (ETB) *</Label>
            <Input type="number" value={form.materialCost} onChange={e => setForm(p => ({ ...p, materialCost: e.target.value }))} className={errors.materialCost ? 'border-destructive' : ''} />
            {errors.materialCost && <p className="text-[10px] text-destructive mt-0.5">{errors.materialCost}</p>}
          </div>
          <div>
            <Label className="text-xs">{t('products.selling_price')} (ETB) *</Label>
            <Input type="number" value={form.sellingPrice} onChange={e => setForm(p => ({ ...p, sellingPrice: e.target.value }))} className={errors.sellingPrice ? 'border-destructive' : ''} />
            {errors.sellingPrice && <p className="text-[10px] text-destructive mt-0.5">{errors.sellingPrice}</p>}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t('common.cancel')}</Button>
          <Button onClick={handleSubmit}>{t('common.add')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
