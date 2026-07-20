"use client";
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Dynamically import the map component with SSR disabled
const MapComponent = dynamic(
  () => import('@/components/dashboard/MapComponent'),
  { ssr: false, loading: () => <div className="h-[600px] w-full rounded-xl bg-muted/50 animate-pulse flex items-center justify-center">Loading Map...</div> }
);

export default function MapPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">GIS Farm Mapping</h1>
        <p className="text-muted-foreground mt-1">
          Interactive satellite view of your sugarcane plots and real-time spatial data.
        </p>
      </div>

      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle>Farm Boundaries & Sensors</CardTitle>
          <CardDescription>Click on a plot to view detailed metrics and micro-climate data.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
           <MapComponent />
        </CardContent>
      </Card>
    </div>
  );
}
