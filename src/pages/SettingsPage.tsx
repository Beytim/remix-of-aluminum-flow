import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your business preferences</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm">Company Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs">Business Name</Label><Input defaultValue="AluManager Metals LLC" /></div>
            <div><Label className="text-xs">Tax ID / VAT</Label><Input defaultValue="12-3456789" /></div>
            <div><Label className="text-xs">Phone</Label><Input defaultValue="(555) 000-0000" /></div>
            <div><Label className="text-xs">Email</Label><Input defaultValue="info@alumanager.com" /></div>
          </div>
          <div><Label className="text-xs">Address</Label><Input defaultValue="1000 Metal Way, Portland, OR 97201" /></div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm">Units & Currency</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div><Label className="text-xs">Currency</Label>
              <Select defaultValue="usd"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">$ USD</SelectItem>
                  <SelectItem value="eur">€ EUR</SelectItem>
                  <SelectItem value="gbp">£ GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Weight Unit</Label>
              <Select defaultValue="kg"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kilograms (kg)</SelectItem>
                  <SelectItem value="lb">Pounds (lbs)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label className="text-xs">Length Unit</Label>
              <Select defaultValue="mm"><SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm">Millimeters (mm)</SelectItem>
                  <SelectItem value="in">Inches (in)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm">Pricing Defaults</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label className="text-xs">Default Markup %</Label><Input type="number" defaultValue="50" /></div>
            <div><Label className="text-xs">Cutting Fee (per cut)</Label><Input type="number" defaultValue="2.50" step="0.01" /></div>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {[
            ['Low stock email alerts', true],
            ['New order notifications', true],
            ['Daily summary email', false],
          ].map(([label, defaultVal]) => (
            <div key={label as string} className="flex items-center justify-between">
              <Label className="text-xs">{label as string}</Label>
              <Switch defaultChecked={defaultVal as boolean} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Button onClick={() => toast({ title: "Settings Saved", description: "Your preferences have been updated." })}>
        <Save className="h-3.5 w-3.5 mr-1.5" />Save Settings
      </Button>
    </div>
  );
}
