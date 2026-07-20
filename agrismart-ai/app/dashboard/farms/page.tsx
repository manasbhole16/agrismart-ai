"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Search, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const initialFarms = [
  { id: "1", name: "North Block A", area: 15, variety: "Co 86032", plantDate: "2025-10-15", status: "Healthy" },
  { id: "2", name: "South Block B", area: 22, variety: "Co 0238", plantDate: "2025-11-05", status: "Water Stress" },
  { id: "3", name: "East Block C", area: 10, variety: "Co 86032", plantDate: "2026-01-20", status: "Healthy" },
];

export default function FarmsPage() {
  const [farms, setFarms] = useState(initialFarms);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const handleAddFarm = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy add logic
    const formData = new FormData(e.target as HTMLFormElement);
    const newFarm = {
      id: Math.random().toString(),
      name: formData.get("name") as string,
      area: Number(formData.get("area")),
      variety: formData.get("variety") as string,
      plantDate: formData.get("plantDate") as string,
      status: "Healthy"
    };
    setFarms([...farms, newFarm]);
    setIsAddOpen(false);
  };

  const deleteFarm = (id: string) => {
    setFarms(farms.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Farm Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your sugarcane plots, view details, and update crop information.
          </p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={<Button className="bg-primary hover:bg-primary/90 text-primary-foreground" />}>
            <Plus className="mr-2 h-4 w-4" /> Add Farm
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <form onSubmit={handleAddFarm}>
              <DialogHeader>
                <DialogTitle>Add New Farm</DialogTitle>
                <DialogDescription>
                  Enter the details of your sugarcane plot to start tracking.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" name="name" placeholder="e.g., Block A" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="area" className="text-right">Area (Acres)</Label>
                  <Input id="area" name="area" type="number" step="0.1" placeholder="15" className="col-span-3" required />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="variety" className="text-right">Variety</Label>
                  <div className="col-span-3">
                    <Select name="variety" required defaultValue="Co 86032">
                      <SelectTrigger>
                        <SelectValue placeholder="Select variety" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Co 86032">Co 86032</SelectItem>
                        <SelectItem value="Co 0238">Co 0238</SelectItem>
                        <SelectItem value="Co 8014">Co 8014</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="plantDate" className="text-right">Planting Date</Label>
                  <Input id="plantDate" name="plantDate" type="date" className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
                <Button type="submit">Save Farm</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/40">
          <div>
            <CardTitle>Your Farms</CardTitle>
            <CardDescription>A list of all registered plots.</CardDescription>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search farms..." className="pl-9 h-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Farm Name</TableHead>
                <TableHead>Area (Acres)</TableHead>
                <TableHead>Variety</TableHead>
                <TableHead>Planting Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {farms.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No farms found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
              {farms.map((farm) => (
                <TableRow key={farm.id}>
                  <TableCell className="font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    {farm.name}
                  </TableCell>
                  <TableCell>{farm.area}</TableCell>
                  <TableCell>{farm.variety}</TableCell>
                  <TableCell>{new Date(farm.plantDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={farm.status === 'Healthy' ? 'text-emerald-500 border-emerald-500/30' : 'text-amber-500 border-amber-500/30'}>
                      {farm.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0" />}>
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <MapPin className="mr-2 h-4 w-4" /> View on Map
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" /> Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={() => deleteFarm(farm.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
