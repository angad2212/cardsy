import { Progress } from "@/components/ui/progress";

interface XPBarProps {
  currentXP: number;
  requiredXP: number;
  level: number;
}

export const XPBar = ({ currentXP, requiredXP, level }: XPBarProps) => {
  const percentage = (currentXP / requiredXP) * 100;

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex flex-col items-center gap-1 min-w-[60px]">
        <div className="text-xs text-muted-foreground font-medium">Level</div>
        <div className="text-2xl font-bold text-primary">{level}</div>
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-primary transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
          <div 
            className="absolute inset-0 bg-gradient-primary opacity-50 animate-glow"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{currentXP} XP</span>
          <span>{requiredXP} XP</span>
        </div>
      </div>
    </div>
  );
};
