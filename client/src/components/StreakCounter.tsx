import { Flame } from "lucide-react";

interface StreakCounterProps {
  days: number;
}

export const StreakCounter = ({ days }: StreakCounterProps) => {
  return (
    <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-xl border border-border shadow-card">
      <div className="relative">
        <Flame className="w-6 h-6 text-destructive animate-streak-pulse" />
        <div className="absolute inset-0 bg-destructive/20 rounded-full blur-md animate-streak-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold text-foreground">{days}</span>
        <span className="text-xs text-muted-foreground">day streak</span>
      </div>
    </div>
  );
};
