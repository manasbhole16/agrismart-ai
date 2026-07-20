"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudSun, Droplets, Wind, Thermometer, Sun } from "lucide-react";

export default function WeatherPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weather Insights</h1>
        <p className="text-muted-foreground mt-1">
          Hyper-local forecasting tailored for your farm's coordinates.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <Thermometer className="h-10 w-10 text-amber-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Temperature</p>
              <p className="text-3xl font-bold">32°C</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card bg-gradient-to-br from-sky-500/10 to-blue-500/10 border-sky-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <Droplets className="h-10 w-10 text-sky-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Humidity</p>
              <p className="text-3xl font-bold">45%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card bg-gradient-to-br from-slate-500/10 to-gray-500/10 border-slate-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <Wind className="h-10 w-10 text-slate-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">Wind Speed</p>
              <p className="text-3xl font-bold">12 km/h</p>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card bg-gradient-to-br from-yellow-500/10 to-red-500/10 border-yellow-500/20">
          <CardContent className="p-6 flex items-center space-x-4">
            <Sun className="h-10 w-10 text-yellow-500" />
            <div>
              <p className="text-sm font-medium text-muted-foreground">UV Index</p>
              <p className="text-3xl font-bold">Very High</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex overflow-x-auto pb-4 gap-6">
            {[1,2,3,4,5,6,7].map((day) => (
              <div key={day} className="flex flex-col items-center min-w-[100px] p-4 rounded-xl border border-border/50 bg-muted/20">
                <p className="text-sm font-medium mb-2">{new Date(Date.now() + day * 86400000).toLocaleDateString('en-US', {weekday: 'short'})}</p>
                <CloudSun className="h-8 w-8 text-amber-500 mb-2" />
                <p className="font-bold text-lg">34°</p>
                <p className="text-xs text-muted-foreground">22°</p>
                <p className="text-xs text-sky-500 mt-2 flex items-center"><Droplets className="h-3 w-3 mr-1"/> 0%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
