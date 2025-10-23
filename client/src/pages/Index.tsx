import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { XPBar } from "@/components/XPBar";
import { StreakCounter } from "@/components/StreakCounter";
import { Heatmap } from "@/components/Heatmap";
import { DeckCard } from "@/components/DeckCard";
import { StatCard } from "@/components/StatCard";
import { SAMPLE_BADGES } from "@/components/Badges";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Brain, Target, Trophy, Zap } from "lucide-react";

// Sample data
const generateHeatmapData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (365 - i));
    data.push({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 20),
    });
  }
  
  return data;
};

const SAMPLE_DECKS = [
  {
    id: 1,
    title: "World Capitals",
    subject: "Geography",
    totalCards: 50,
    cardsToReview: 12,
    lastPracticed: "2 hours ago",
    accuracy: 85,
  },
  {
    id: 2,
    title: "Literary Classics",
    subject: "Literature",
    totalCards: 40,
    cardsToReview: 8,
    lastPracticed: "1 day ago",
    accuracy: 92,
  },
  {
    id: 3,
    title: "Chemistry Basics",
    subject: "Science",
    totalCards: 60,
    cardsToReview: 15,
    lastPracticed: "3 hours ago",
    accuracy: 78,
  },
  {
    id: 4,
    title: "Historical Events",
    subject: "History",
    totalCards: 45,
    cardsToReview: 10,
    lastPracticed: "5 hours ago",
    accuracy: 88,
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [heatmapData] = useState(generateHeatmapData());

  const handleStartPractice = () => {
    navigate("/practice");
  };

  const handleOpenDeck = (deckId: number) => {
    navigate(`/deck/${deckId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-primary">Student</span>
            </h1>
            <p className="text-muted-foreground">Let's crush some learning goals today</p>
          </div>
          
          <StreakCounter days={12} />
        </header>

        {/* XP Bar */}
        <div className="bg-card p-6 rounded-xl border border-border shadow-card">
          <XPBar currentXP={450} requiredXP={1000} level={7} />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Target}
            label="Today's Goal"
            value="12"
            trend="cards to review"
            accentColor="primary"
          />
          <StatCard
            icon={Brain}
            label="Cards Mastered"
            value="247"
            trend="+18 this week"
            accentColor="secondary"
          />
          <StatCard
            icon={Trophy}
            label="Total XP"
            value="3,450"
            trend="Level 7"
            accentColor="primary"
          />
          <StatCard
            icon={Zap}
            label="Avg. Accuracy"
            value="86%"
            trend="+4% vs last week"
            accentColor="secondary"
          />
        </div>

        {/* Heatmap */}
        <Heatmap data={heatmapData} />

        {/* Recent Badges Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recent Achievements</h2>
            <button 
              onClick={() => navigate("/account")}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {SAMPLE_BADGES.filter(badge => badge.earned).slice(0, 5).map((badge) => (
              <div key={badge.id} className="bg-card p-4 rounded-xl border border-border shadow-card hover:shadow-elevated transition-all group">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground mb-1">{badge.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{badge.description}</p>
                    {badge.earnedDate && (
                      <p className="text-xs text-primary mt-2">
                        {new Date(badge.earnedDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Decks Section */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Recent Decks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_DECKS.slice(0, 3).map((deck) => (
              <DeckCard
                key={deck.id}
                title={deck.title}
                subject={deck.subject}
                totalCards={deck.totalCards}
                cardsToReview={deck.cardsToReview}
                lastPracticed={deck.lastPracticed}
                accuracy={deck.accuracy}
                onStart={handleStartPractice}
                onOpen={() => handleOpenDeck(deck.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
