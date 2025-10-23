import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PerformanceChartProps {
  data: Array<{ date: string; accuracy: number; xp: number }>;
  title?: string;
}

export const PerformanceChart = ({ data, title = "Performance Over Time" }: PerformanceChartProps) => {
  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-card">
      <h3 className="text-xl font-bold mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: "hsl(var(--muted-foreground))" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "0.5rem",
              color: "hsl(var(--foreground))",
            }}
          />
          <Line 
            type="monotone" 
            dataKey="accuracy" 
            stroke="hsl(var(--primary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--primary))", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="xp" 
            stroke="hsl(var(--secondary))" 
            strokeWidth={3}
            dot={{ fill: "hsl(var(--secondary))", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-muted-foreground">Accuracy %</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-secondary" />
          <span className="text-sm text-muted-foreground">XP Gained</span>
        </div>
      </div>
    </div>
  );
};
