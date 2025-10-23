import { Navigation } from "@/components/Navigation";
import { DeckCard } from "@/components/DeckCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

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
  {
    id: 5,
    title: "Spanish Verbs",
    subject: "Languages",
    totalCards: 35,
    cardsToReview: 7,
    lastPracticed: "4 hours ago",
    accuracy: 81,
  },
  {
    id: 6,
    title: "Music Theory",
    subject: "Arts",
    totalCards: 28,
    cardsToReview: 5,
    lastPracticed: "6 hours ago",
    accuracy: 89,
  },
];

const Decks = () => {
  const navigate = useNavigate();

  const handleStartPractice = () => {
    navigate("/practice");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Your <span className="text-primary">Decks</span>
            </h1>
            <p className="text-muted-foreground">Manage and practice your flashcard collections</p>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Deck
          </Button>
        </header>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search your decks..."
            className="pl-10 bg-card border-border"
          />
        </div>

        {/* Decks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_DECKS.map((deck) => (
            <DeckCard
              key={deck.id}
              title={deck.title}
              subject={deck.subject}
              totalCards={deck.totalCards}
              cardsToReview={deck.cardsToReview}
              lastPracticed={deck.lastPracticed}
              accuracy={deck.accuracy}
              onStart={handleStartPractice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Decks;
