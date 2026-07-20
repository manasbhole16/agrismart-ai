"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Map, 
  MapPin,
  Droplets, 
  CloudSun, 
  Sprout, 
  BarChart3, 
  Settings,
  MessageSquare
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Farm Management", href: "/dashboard/farms", icon: MapPin },
  { name: "GIS Map", href: "/dashboard/map", icon: Map },
  { name: "Irrigation Engine", href: "/dashboard/irrigation", icon: Droplets },
  { name: "Weather Insights", href: "/dashboard/weather", icon: CloudSun },
  { name: "Crop Health", href: "/dashboard/health", icon: Sprout },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "AI Chatbot", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen border-r border-border/40 bg-card/50 backdrop-blur-xl flex flex-col hidden md:flex sticky top-0">
      <div className="h-16 flex items-center px-6 border-b border-border/40">
        <Sprout className="h-6 w-6 text-primary mr-2" />
        <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          AgriSmart
        </span>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href}>
              <div
                className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5 mr-3", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {item.name}
              </div>
            </Link>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-border/40">
        <div className="flex items-center bg-muted/50 p-3 rounded-xl border border-border/50">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center mr-3 border border-primary/30">
             <span className="font-bold text-primary text-xs">FM</span>
          </div>
          <div>
            <p className="text-sm font-medium">Farmer User</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
