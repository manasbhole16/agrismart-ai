"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, CloudSun, MapPin, Activity, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const waterData = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 130 },
  { day: "Wed", usage: 0 },
  { day: "Thu", usage: 140 },
  { day: "Fri", usage: 110 },
  { day: "Sat", usage: 0 },
  { day: "Sun", usage: 150 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your sugarcane farms today.
          </p>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card hover:border-primary/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Irrigation</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
               <Droplets className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tomorrow, 6:00 AM</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 flex items-center mr-1">
                98% AI Confidence
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:border-amber-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weather Status</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
               <CloudSun className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32°C, Mostly Sunny</div>
            <p className="text-xs text-muted-foreground mt-1">
              No rain expected in next 3 days
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:border-sky-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crop Health</CardTitle>
            <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center">
               <Activity className="h-4 w-4 text-sky-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimal (94/100)</div>
            <p className="text-xs text-muted-foreground mt-1">
              Vegetative Growth Phase
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:border-purple-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yield Prediction</CardTitle>
            <div className="h-8 w-8 rounded-full bg-purple-500/10 flex items-center justify-center">
               <ArrowUpRight className="h-4 w-4 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 Tons/Acre</div>
            <p className="text-xs text-emerald-500 mt-1 flex items-center">
              +4.1% vs last year
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Water Usage Trend (Liters/Acre)</CardTitle>
            <CardDescription>Your farm's irrigation water consumption over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="usage" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 glass-card">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Actionable insights generated by AgriSmart Engine.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-4"></div>
                <div>
                  <h4 className="text-sm font-semibold">Irrigate Farm A</h4>
                  <p className="text-sm text-muted-foreground mt-1">Apply 2 inches of water. Soil moisture is dropping below 40%.</p>
                  <Badge variant="outline" className="mt-2 text-primary border-primary/30 bg-primary/5">High Priority</Badge>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 mr-4"></div>
                <div>
                  <h4 className="text-sm font-semibold">Apply NPK Fertilizer</h4>
                  <p className="text-sm text-muted-foreground mt-1">Crop has entered rapid growth phase. Recommended dose: 120kg/acre.</p>
                  <Badge variant="outline" className="mt-2 text-amber-500 border-amber-500/30 bg-amber-500/5">Medium Priority</Badge>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-sky-500 mt-2 mr-4"></div>
                <div>
                  <h4 className="text-sm font-semibold">Skip Irrigation Farm B</h4>
                  <p className="text-sm text-muted-foreground mt-1">Rainfall detected (15mm) in the last 24 hours. Saving 4500 Liters of water.</p>
                  <Badge variant="outline" className="mt-2 text-sky-500 border-sky-500/30 bg-sky-500/5">Automated Action</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
