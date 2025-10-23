import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlashCard } from "@/components/FlashCard";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trophy } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_CARDS = [
  {
    id: 1,
    question: "What is the capital of France?",
    answer: "Paris - the City of Light, known for the Eiffel Tower and rich cultural heritage.",
  },
  {
    id: 2,
    question: "Who wrote 'Romeo and Juliet'?",
    answer: "William Shakespeare, the renowned English playwright and poet from the 16th century.",
  },
  {
    id: 3,
    question: "What is the chemical symbol for gold?",
    answer: "Au - derived from the Latin word 'aurum', meaning gold.",
  },
  {
    id: 4,
    question: "What is photosynthesis?",
    answer: "The process by which plants convert sunlight, water, and CO₂ into glucose and oxygen.",
  },
  {
    id: 5,
    question: "When did World War II end?",
    answer: "1945 - marked by the surrender of Japan after the atomic bombings of Hiroshima and Nagasaki.",
  },
];

const Practice = () => {
  const navigate = useNavigate();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [results, setResults] = useState<("incorrect" | "partial" | "correct")[]>([]);
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentCard = SAMPLE_CARDS[currentCardIndex];
  const progress = ((currentCardIndex + 1) / SAMPLE_CARDS.length) * 100;

  const handleFeedback = (level: "incorrect" | "partial" | "correct") => {
    const newResults = [...results, level];
    setResults(newResults);

    if (currentCardIndex < SAMPLE_CARDS.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setSessionComplete(true);
      
      const correct = newResults.filter(r => r === "correct").length;
      const xpEarned = correct * 10;
      
      toast.success(`Session Complete! +${xpEarned} XP earned`, {
        description: `${correct}/${SAMPLE_CARDS.length} cards mastered`,
      });
    }
  };

  const handleBackToDashboard = () => {
    navigate("/");
  };

  if (sessionComplete) {
    const correct = results.filter(r => r === "correct").length;
    const partial = results.filter(r => r === "partial").length;
    const incorrect = results.filter(r => r === "incorrect").length;
    const accuracy = Math.round((correct / SAMPLE_CARDS.length) * 100);
    const xpEarned = correct * 10;

    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-gradient-card rounded-2xl border-2 border-primary shadow-elevated shadow-glow p-12 text-center space-y-8 animate-slide-up">
          <div className="flex justify-center">
            <div className="p-6 bg-primary/10 rounded-full">
              <Trophy className="w-16 h-16 text-primary" />
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Session Complete!</h1>
            <p className="text-xl text-primary">+{xpEarned} XP Earned</p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">{correct}</p>
              <p className="text-sm text-muted-foreground">Correct</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-secondary">{partial}</p>
              <p className="text-sm text-muted-foreground">Partial</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-destructive">{incorrect}</p>
              <p className="text-sm text-muted-foreground">Incorrect</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Accuracy</p>
            <p className="text-5xl font-bold text-foreground">{accuracy}%</p>
          </div>

          <Button 
            onClick={handleBackToDashboard}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <Button 
            onClick={handleBackToDashboard}
            variant="outline"
            className="border-border"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Progress</p>
            <p className="text-lg font-bold text-foreground">
              {currentCardIndex + 1} / {SAMPLE_CARDS.length}
            </p>
          </div>
          
          <div className="w-24" />
        </div>

        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
        </div>

        <FlashCard
          question={currentCard.question}
          answer={currentCard.answer}
          onFeedback={handleFeedback}
        />
      </div>
    </div>
  );
};

export default Practice;
