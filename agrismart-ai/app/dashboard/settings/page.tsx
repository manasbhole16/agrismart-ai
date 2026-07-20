"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const users = [
  { id: 1, name: "Ramesh Kumar", role: "Farmer", status: "Active", farms: 2 },
  { id: 2, name: "Dr. Sharma", role: "Agronomist", status: "Active", farms: 15 },
  { id: 3, name: "Admin User", role: "Administrator", status: "Active", farms: 0 },
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard & Settings</h1>
        <p className="text-muted-foreground mt-1">
          System configuration and user management.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage farmers, agronomists, and their access levels.</CardDescription>
          </div>
          <Button>Add User</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Managed Farms</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.farms}</TableCell>
                  <TableCell>
                     <Badge variant="outline" className="text-emerald-500 border-emerald-500/30">{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6">
         <Card className="glass-card">
            <CardHeader>
               <CardTitle>System Settings</CardTitle>
               <CardDescription>Configure API integrations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex justify-between items-center p-3 border border-border/50 rounded-lg">
                  <div>
                     <p className="font-medium">Weather API Status</p>
                     <p className="text-sm text-muted-foreground">Mock Data Mode</p>
                  </div>
                  <Badge>Simulated</Badge>
               </div>
               <div className="flex justify-between items-center p-3 border border-border/50 rounded-lg">
                  <div>
                     <p className="font-medium">AI Engine</p>
                     <p className="text-sm text-muted-foreground">Version 2.4.1 (Stable)</p>
                  </div>
                  <Badge variant="outline" className="text-emerald-500">Online</Badge>
               </div>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
