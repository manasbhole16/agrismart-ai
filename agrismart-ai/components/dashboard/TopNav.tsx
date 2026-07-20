"use client";
import { Bell, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function TopNav() {
  return (
    <header className="h-16 border-b border-border/40 bg-background/80 backdrop-blur-md flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2">
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative w-64 hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search farms, reports..." 
            className="w-full bg-muted/50 border-none pl-9 focus-visible:ring-primary/20 h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="relative h-9 w-9 border-border/50 bg-background/50">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
        </Button>
      </div>
    </header>
  );
}
