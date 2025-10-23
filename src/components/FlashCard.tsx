import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Sparkles, Check } from "lucide-react";

interface FlashCardProps {
  question: string;
  answer: string;
  onFeedback: (level: "incorrect" | "partial" | "correct") => void;
}

export const FlashCard = ({ question, answer, onFeedback }: FlashCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-slide-up">
      <div className="perspective-1000">
        <div
          onClick={handleFlip}
          className={`relative w-full h-[400px] cursor-pointer transition-transform duration-600 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front of card */}
          <div
            className="absolute inset-0 bg-gradient-card rounded-2xl border-2 border-border shadow-elevated p-8 flex items-center justify-center backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wide">Question</p>
              <p className="text-2xl font-medium text-foreground leading-relaxed">{question}</p>
              <p className="text-sm text-primary">Click to reveal answer</p>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute inset-0 bg-gradient-card rounded-2xl border-2 border-primary shadow-elevated shadow-glow p-8 flex items-center justify-center backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="text-center space-y-4">
              <p className="text-sm text-primary uppercase tracking-wide">Answer</p>
              <p className="text-2xl font-medium text-foreground leading-relaxed">{answer}</p>
            </div>
          </div>
        </div>
      </div>

      {isFlipped && (
        <div className="flex gap-4 justify-center animate-slide-up">
          <Button
            onClick={() => onFeedback("incorrect")}
            variant="outline"
            className="flex-1 max-w-[200px] border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="w-4 h-4 mr-2" />
            Didn't Know
          </Button>
          <Button
            onClick={() => onFeedback("partial")}
            variant="outline"
            className="flex-1 max-w-[200px] border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Partial
          </Button>
          <Button
            onClick={() => onFeedback("correct")}
            variant="outline"
            className="flex-1 max-w-[200px] border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Check className="w-4 h-4 mr-2" />
            Knew It
          </Button>
        </div>
      )}
    </div>
  );
};
