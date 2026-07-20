"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const yieldData = [
  { year: "2021", expected: 40, actual: 38 },
  { year: "2022", expected: 42, actual: 45 },
  { year: "2023", expected: 45, actual: 44 },
  { year: "2024", expected: 48, actual: 50 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
        <p className="text-muted-foreground mt-1">
          Historical trends, yield prediction accuracy, and resource efficiency.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Historical Yield Performance (Tons/Acre)</CardTitle>
          <CardDescription>Comparison of AI expected yield vs actual harvest.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yieldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: 'var(--muted-foreground)'}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--card)', borderRadius: '8px', border: '1px solid var(--border)' }}
                  itemStyle={{ color: 'var(--foreground)' }}
                  cursor={{fill: 'var(--muted)', opacity: 0.2}}
                />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
                <Bar dataKey="expected" name="AI Prediction" fill="var(--muted-foreground)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Harvest" fill="var(--primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
