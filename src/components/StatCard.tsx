import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  accentColor?: "primary" | "secondary" | "destructive";
}

export const StatCard = ({ 
  icon: Icon, 
  label, 
  value, 
  trend,
  accentColor = "primary" 
}: StatCardProps) => {
  const colorClasses = {
    primary: "text-primary bg-primary/10",
    secondary: "text-secondary bg-secondary/10",
    destructive: "text-destructive bg-destructive/10",
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-card hover:shadow-elevated transition-all">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className="text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[accentColor]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
