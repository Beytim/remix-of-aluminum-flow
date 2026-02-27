import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Plus } from "lucide-react";

const users = [
  { name: 'Admin User', email: 'admin@alumanager.com', role: 'Admin', status: 'Active', lastLogin: '2025-02-27 09:15' },
  { name: 'Sarah Johnson', email: 'sarah@alumanager.com', role: 'Manager', status: 'Active', lastLogin: '2025-02-27 08:45' },
  { name: 'Mike Chen', email: 'mike@alumanager.com', role: 'Sales', status: 'Active', lastLogin: '2025-02-26 17:30' },
  { name: 'Steve Rogers', email: 'steve@alumanager.com', role: 'Warehouse', status: 'Active', lastLogin: '2025-02-27 07:00' },
  { name: 'Lisa Park', email: 'lisa@alumanager.com', role: 'Viewer', status: 'Inactive', lastLogin: '2025-02-10 14:20' },
];

const roleBadge: Record<string, string> = {
  Admin: 'bg-primary/10 text-primary',
  Manager: 'bg-info/10 text-info',
  Sales: 'bg-success/10 text-success',
  Warehouse: 'bg-warning/10 text-warning',
  Viewer: 'bg-muted text-muted-foreground',
};

export default function UserManagement() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-sm text-muted-foreground">Manage roles and access control</p>
        </div>
        <Button size="sm"><Plus className="h-3.5 w-3.5 mr-1.5" />Add User</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {['Admin', 'Manager', 'Sales', 'Warehouse', 'Viewer'].map(role => (
          <Card key={role} className="shadow-card">
            <CardContent className="p-3 text-center">
              <Shield className="h-5 w-5 mx-auto mb-1 text-primary" />
              <p className="text-xs font-semibold">{role}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {users.filter(u => u.role === role).length} user(s)
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-card">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Name</TableHead>
                <TableHead className="text-xs">Email</TableHead>
                <TableHead className="text-xs">Role</TableHead>
                <TableHead className="text-xs">Last Login</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="text-xs font-medium">{u.name}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{u.email}</TableCell>
                  <TableCell><span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${roleBadge[u.role]}`}>{u.role}</span></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{u.lastLogin}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === 'Active' ? 'outline' : 'secondary'} className={`text-[10px] ${u.status === 'Active' ? 'text-success border-success/30' : ''}`}>
                      {u.status}
                    </Badge>
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
