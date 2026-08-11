"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sprout, ShieldCheck } from "lucide-react";

export default function HealthPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Fertigation & Crop Health</h1>
        <p className="text-muted-foreground mt-1">
          Monitor growth stages, nutrient requirements, and disease risks.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Growth Timeline</CardTitle>
            <CardDescription>Block A • Variety Co 86032</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Grand Growth Phase</span>
                <span className="text-primary">Day 110 of 360</span>
              </div>
              <Progress value={30} className="h-2 bg-muted/50" />
            </div>

            <div className="flex p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="h-6 w-6 text-emerald-500 mr-4 shrink-0" />
              <div>
                <p className="font-semibold text-emerald-500">Overall Health: Optimal</p>
                <p className="text-sm text-muted-foreground mt-1">Canopy development is on track. Biomass estimation is higher than average.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>NPK Recommendation</CardTitle>
            <CardDescription>Nutrient deficit detected for current phase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                   <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Nitrogen (N)</p>
                   <p className="text-2xl font-bold text-sky-500">45 kg</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                   <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Phosphorus (P)</p>
                   <p className="text-2xl font-bold text-amber-500">0 kg</p>
                </div>
                <div className="p-4 rounded-xl border border-border/50 bg-muted/20">
                   <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Potassium (K)</p>
                   <p className="text-2xl font-bold text-purple-500">20 kg</p>
                </div>
             </div>
             <div className="flex p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mt-4 items-center">
                <Sprout className="h-5 w-5 text-amber-500 mr-3" />
                <p className="text-sm">Apply Top Dressing immediately before next irrigation cycle.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
