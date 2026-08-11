"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, CloudSun, Activity, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const defaultWaterData = [
  { day: "Mon", usage: 120 },
  { day: "Tue", usage: 130 },
  { day: "Wed", usage: 0 },
  { day: "Thu", usage: 140 },
  { day: "Fri", usage: 110 },
  { day: "Sat", usage: 0 },
  { day: "Sun", usage: 150 },
];

interface Plot {
  _id?: string;
  id?: string;
  name?: string;
  farmerName?: string;
  sugarcaneVariety?: string;
  waterStressIndex?: number;
  cropAgeMonths?: number;
  [key: string]: unknown;
}

interface AdvisoryData {
  nextIrrigationDate?: string;
  status?: string;
  durationHours?: number;
  waterStressIndex?: number;
  models?: {
    durationHours?: number;
    waterStressIndex?: number;
    expectedHarvestTonnageRange?: { min?: number; max?: number };
    predictedYieldLossPercentage?: number;
  };
  llmAdvisory?: { en?: string };
  llmAdvisories?: { en?: string };
  override?: { status?: string };
  fertigation?: {
    nutrients?: { name?: string; amountKg?: number }[];
  };
  yieldLossPercentageIfDelayed?: number;
  [key: string]: unknown;
}

interface TelemetryData {
  ambientTemperature?: number;
  relativeHumidity?: number;
  soilMoisture30cm?: number;
  soilMoisture60cm?: number;
  rainfall24h?: number;
  rainfallGauge?: number;
  [key: string]: unknown;
}

export default function DashboardOverview() {
  const [plots, setPlots] = useState<Plot[]>([]);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [advisory, setAdvisory] = useState<AdvisoryData | null>(null);
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const plotsRes = await fetch('/api/plots');
        if (!plotsRes.ok) throw new Error("Failed to fetch plots");
        const plotsData = await plotsRes.json();
        setPlots(plotsData);

        if (plotsData.length > 0) {
          const firstPlot = plotsData[0];
          setSelectedPlot(firstPlot);

          // Fetch advisory and telemetry for the first plot
          const plotId = firstPlot._id || firstPlot.id;
          const [advRes, telRes] = await Promise.all([
            fetch(`/api/plots/${plotId}/recommendations`),
            fetch(`/api/plots/${plotId}/telemetry`)
          ]);

          if (advRes.ok) {
            const advData = await advRes.json();
            setAdvisory(advData);
          }
          if (telRes.ok) {
            const telData = await telRes.json();
            setTelemetry(telData);
          }
        }
      } catch (err) {
        console.error("Error loading dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Overview
            {isLoading && (
              <span className="text-xs font-normal text-muted-foreground animate-pulse">
                Loading…
              </span>
            )}
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your sugarcane farms today.
          </p>
        </div>
        {plots.length > 1 && (
          <div className="flex gap-2">
            <select
              value={selectedPlot?._id || selectedPlot?.id || ""}
              onChange={async (e) => {
                const targetId = e.target.value;
                const found = plots.find(p => (p._id || p.id) === targetId);
                setSelectedPlot(found ?? null);
                try {
                  const [advRes, telRes] = await Promise.all([
                    fetch(`/api/plots/${targetId}/recommendations`),
                    fetch(`/api/plots/${targetId}/telemetry`)
                  ]);
                  if (advRes.ok) setAdvisory(await advRes.json());
                  if (telRes.ok) setTelemetry(await telRes.json());
                } catch (err) {
                  console.error(err);
                }
              }}
              className="h-10 px-3 py-2 rounded-md border border-slate-800 bg-slate-900 text-white focus:outline-none text-sm"
            >
              {plots.map((p) => (
                <option key={p._id || p.id} value={p._id || p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        )}
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
            <div className="text-2xl font-bold">
              {advisory?.nextIrrigationDate
                ? new Date(advisory.nextIrrigationDate).toLocaleDateString("en-US", {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                : "Tomorrow, 6:00 AM"}
            </div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 flex items-center mr-1">
                Duration: {advisory?.durationHours || advisory?.models?.durationHours || 2.5} hrs
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:border-amber-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weather & Telemetry</CardTitle>
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center">
               <CloudSun className="h-4 w-4 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {telemetry?.ambientTemperature ? `${telemetry.ambientTemperature}°C` : "32°C"}, {telemetry?.relativeHumidity ? `${telemetry.relativeHumidity}% RH` : "Mostly Sunny"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Rainfall 24h: {telemetry?.rainfall24h || telemetry?.rainfallGauge || 0} mm
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card hover:border-sky-500/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crop Water Stress</CardTitle>
            <div className="h-8 w-8 rounded-full bg-sky-500/10 flex items-center justify-center">
               <Activity className="h-4 w-4 text-sky-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              WSI: {selectedPlot?.waterStressIndex || advisory?.waterStressIndex || advisory?.models?.waterStressIndex || 0.45}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Soil Moisture 30cm: {telemetry?.soilMoisture30cm || 32}%
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
            <div className="text-2xl font-bold">
              {advisory?.models?.expectedHarvestTonnageRange
                ? `${advisory.models.expectedHarvestTonnageRange.min}-${advisory.models.expectedHarvestTonnageRange.max} Tons/ha`
                : "45.2 Tons/Acre"}
            </div>
            <p className="text-xs text-emerald-500 mt-1 flex items-center">
              Crop Age: {selectedPlot?.cropAgeMonths || 6.2} months
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Water Usage Trend (Liters/Acre)</CardTitle>
            <CardDescription>Your farm&apos;s irrigation water consumption over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={defaultWaterData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
              {advisory ? (
                <>
                  <div className="flex items-start">
                    <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-4"></div>
                    <div>
                      <h4 className="text-sm font-semibold">Scheduled Irrigation</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {advisory.llmAdvisory?.en || advisory.llmAdvisories?.en || `Irrigate for ${advisory.durationHours || advisory.models?.durationHours} hours.`}
                      </p>
                      <Badge variant="outline" className="mt-2 text-primary border-primary/30 bg-primary/5">
                        {advisory.status || advisory.override?.status || "PENDING"}
                      </Badge>
                    </div>
                  </div>

                  {advisory.fertigation?.nutrients && advisory.fertigation.nutrients.length > 0 && (
                    <div className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 mr-4"></div>
                      <div>
                        <h4 className="text-sm font-semibold">Apply NPK Fertigation</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Dosage: {advisory.fertigation.nutrients.map((n: { amountKg?: number; name?: string }) => `${n.amountKg}kg ${n.name}`).join(", ")}
                        </p>
                        <Badge variant="outline" className="mt-2 text-amber-500 border-amber-500/30 bg-amber-500/5">Medium Priority</Badge>
                      </div>
                    </div>
                  )}

                  {(advisory.models?.predictedYieldLossPercentage ?? 0) > 0 && (
                    <div className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-sky-500 mt-2 mr-4"></div>
                      <div>
                        <h4 className="text-sm font-semibold">Yield Protection Advisory</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Delaying this cycle risks a {advisory.models?.predictedYieldLossPercentage || advisory.yieldLossPercentageIfDelayed}% yield loss.
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-sm text-muted-foreground">Loading AI recommendations...</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
