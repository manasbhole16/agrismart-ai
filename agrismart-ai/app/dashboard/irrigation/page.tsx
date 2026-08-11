"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Droplets, Settings, CheckCircle2, Info } from "lucide-react";

export default function IrrigationPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Irrigation Engine</h1>
        <p className="text-muted-foreground mt-1">
          Smart water scheduling based on real-time soil, crop, and weather data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="glass-card md:col-span-2 border-primary/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-primary">Recommendation Ready</CardTitle>
                <CardDescription className="mt-2">Generated just now based on 14 data points.</CardDescription>
              </div>
              <Badge variant="outline" className="text-emerald-500 border-emerald-500 bg-emerald-500/10 text-sm py-1 px-3">
                98% Confidence
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-muted/40 border border-border/50">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Next Action</p>
                <p className="font-semibold">Irrigate Farm A</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Time</p>
                <p className="font-semibold text-amber-500">Tomorrow, 06:00 AM</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Duration</p>
                <p className="font-semibold">2 Hours</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Water Req.</p>
                <p className="font-semibold text-sky-500">45,000 Liters</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium flex items-center mb-2">
                <Info className="h-4 w-4 mr-2 text-primary" /> Reason for Recommendation
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Sugarcane variety Co 86032 is currently in its grand growth phase (Day 110). 
                Soil moisture has dropped to 38%. No significant rainfall (&gt;5mm) is forecasted for the next 72 hours. 
                Applying water tomorrow early morning minimizes evaporative losses and prevents critical water stress.
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <CheckCircle2 className="h-4 w-4 mr-2" /> Approve & Schedule
              </Button>
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" /> Modify Parameters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recent History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center mr-3 mt-0.5">
                    <Droplets className="h-4 w-4 text-sky-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Auto-Skipped</p>
                    <p className="text-xs text-muted-foreground">3 days ago due to rainfall</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center mr-3 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Completed: Block C</p>
                    <p className="text-xs text-muted-foreground">5 days ago • 35k Liters</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
