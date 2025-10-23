import { Button } from "@/components/ui/button";
import { Play, Clock } from "lucide-react";

interface DeckCardProps {
  title: string;
  subject: string;
  totalCards: number;
  cardsToReview: number;
  lastPracticed?: string;
  accuracy?: number;
  onStart: () => void;
}

export const DeckCard = ({
  title,
  subject,
  totalCards,
  cardsToReview,
  lastPracticed,
  accuracy = 0,
  onStart,
}: DeckCardProps) => {
  const getDifficultyColor = () => {
    if (accuracy >= 80) return "text-primary";
    if (accuracy >= 60) return "text-secondary";
    return "text-destructive";
  };

  return (
    <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:shadow-elevated transition-all hover:scale-[1.02] group">
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{subject}</p>
        </div>

        <div className="flex gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">{cardsToReview}</span>
            <span className="text-muted-foreground">to review</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-foreground">{totalCards}</span>
            <span className="text-muted-foreground">total cards</span>
          </div>
          {accuracy > 0 && (
            <div className="flex flex-col">
              <span className={`text-2xl font-bold ${getDifficultyColor()}`}>{accuracy}%</span>
              <span className="text-muted-foreground">accuracy</span>
            </div>
          )}
        </div>

        {lastPracticed && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>Last practiced {lastPracticed}</span>
          </div>
        )}

        <Button 
          onClick={onStart}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group-hover:shadow-glow transition-all"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Session
        </Button>
      </div>
    </div>
  );
};
