import { Navigation } from "@/components/Navigation";
import { Leaderboard } from "@/components/Leaderboard";
import { DeckCard } from "@/components/DeckCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

// Sample data
const GLOBAL_LEADERBOARD = Array.from({ length: 10 }, (_, i) => ({
  rank: i + 1,
  username: `Student${i + 1}`,
  xp: 5000 - i * 400,
  accuracy: 95 - i * 2,
}));

const POPULAR_DECKS = [
  {
    id: 1,
    title: "Spanish Vocabulary",
    subject: "Languages",
    totalCards: 200,
    cardsToReview: 0,
    accuracy: 0,
    students: 1234,
    avgAccuracy: 87,
  },
  {
    id: 2,
    title: "Python Programming",
    subject: "Computer Science",
    totalCards: 150,
    cardsToReview: 0,
    accuracy: 0,
    students: 892,
    avgAccuracy: 82,
  },
  {
    id: 3,
    title: "Biology Fundamentals",
    subject: "Science",
    totalCards: 180,
    cardsToReview: 0,
    accuracy: 0,
    students: 756,
    avgAccuracy: 85,
  },
  {
    id: 4,
    title: "US History Timeline",
    subject: "History",
    totalCards: 120,
    cardsToReview: 0,
    accuracy: 0,
    students: 645,
    avgAccuracy: 90,
  },
  {
    id: 5,
    title: "Calculus Formulas",
    subject: "Mathematics",
    totalCards: 80,
    cardsToReview: 0,
    accuracy: 0,
    students: 534,
    avgAccuracy: 76,
  },
  {
    id: 6,
    title: "French Grammar",
    subject: "Languages",
    totalCards: 160,
    cardsToReview: 0,
    accuracy: 0,
    students: 423,
    avgAccuracy: 84,
  },
];

const DECK_LEADERBOARDS = {
  1: Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    username: `Linguist${i + 1}`,
    xp: 3000 - i * 250,
    accuracy: 98 - i * 2,
  })),
  2: Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    username: `Coder${i + 1}`,
    xp: 2800 - i * 230,
    accuracy: 96 - i * 2,
  })),
};

const Social = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            <span className="text-primary">Social</span> Hub
          </h1>
          <p className="text-muted-foreground">Compete with students worldwide and discover popular decks</p>
        </header>

        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="leaderboard">Global Leaderboard</TabsTrigger>
            <TabsTrigger value="decks">Popular Decks</TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard entries={GLOBAL_LEADERBOARD} title="🏆 Global Top Students" />
          </TabsContent>

          <TabsContent value="decks" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {POPULAR_DECKS.map((deck) => (
                <div key={deck.id} className="space-y-4">
                  <div className="bg-gradient-card p-6 rounded-xl border border-border shadow-card hover:shadow-elevated transition-all hover:scale-[1.02] group">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">{deck.title}</h3>
                        <p className="text-sm text-muted-foreground">{deck.subject}</p>
                      </div>

                      <div className="flex gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-primary">{deck.students}</span>
                          <span className="text-muted-foreground">students</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-foreground">{deck.totalCards}</span>
                          <span className="text-muted-foreground">cards</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-secondary">{deck.avgAccuracy}%</span>
                          <span className="text-muted-foreground">avg accuracy</span>
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/practice")}
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-lg font-semibold transition-all group-hover:shadow-glow"
                      >
                        Start Learning
                      </button>
                    </div>
                  </div>

                  {DECK_LEADERBOARDS[deck.id as keyof typeof DECK_LEADERBOARDS] && (
                    <Leaderboard
                      entries={DECK_LEADERBOARDS[deck.id as keyof typeof DECK_LEADERBOARDS].slice(0, 5)}
                      title={`Top 5 - ${deck.title}`}
                    />
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Social;
