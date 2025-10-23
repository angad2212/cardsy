import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";

// Sample deck data
const SAMPLE_DECK_DATA = {
  id: 1,
  title: "World Capitals",
  subject: "Geography",
  cards: [
    {
      id: 1,
      question: "What is the capital of France?",
      answer: "Paris - the City of Light, known for the Eiffel Tower and rich cultural heritage.",
    },
    {
      id: 2,
      question: "What is the capital of Japan?",
      answer: "Tokyo - a bustling metropolis and the political, economic, and cultural center of Japan.",
    },
    {
      id: 3,
      question: "What is the capital of Australia?",
      answer: "Canberra - designed as the capital city, located between Sydney and Melbourne.",
    },
    {
      id: 4,
      question: "What is the capital of Brazil?",
      answer: "Brasília - a planned city built in the 1950s, known for its modern architecture.",
    },
  ],
};

const DeckManagement = () => {
  const navigate = useNavigate();
  const { deckId } = useParams();
  const [deck] = useState(SAMPLE_DECK_DATA);
  const [cards, setCards] = useState(deck.cards);
  const [editingCard, setEditingCard] = useState<number | null>(null);
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [isAddingCard, setIsAddingCard] = useState(false);

  const handleBack = () => {
    navigate("/");
  };

  const handleEditCard = (cardId: number) => {
    setEditingCard(cardId);
  };

  const handleSaveEdit = (cardId: number) => {
    setEditingCard(null);
  };

  const handleCancelEdit = () => {
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId: number) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleAddCard = () => {
    if (newCard.question.trim() && newCard.answer.trim()) {
      const card = {
        id: cards.length + 1,
        question: newCard.question,
        answer: newCard.answer,
      };
      setCards([...cards, card]);
      setNewCard({ question: "", answer: "" });
      setIsAddingCard(false);
    }
  };

  const handleCancelAdd = () => {
    setNewCard({ question: "", answer: "" });
    setIsAddingCard(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              onClick={handleBack}
              variant="outline"
              className="border-border"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{deck.title}</h1>
              <p className="text-muted-foreground">{deck.subject} • {cards.length} cards</p>
            </div>
          </div>
          
          <Dialog open={isAddingCard} onOpenChange={setIsAddingCard}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Card</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Question</label>
                  <Input
                    value={newCard.question}
                    onChange={(e) => setNewCard({ ...newCard, question: e.target.value })}
                    placeholder="Enter the question..."
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Answer</label>
                  <Textarea
                    value={newCard.answer}
                    onChange={(e) => setNewCard({ ...newCard, answer: e.target.value })}
                    placeholder="Enter the answer..."
                    className="w-full min-h-[100px]"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={handleCancelAdd}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCard}>
                    <Save className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </header>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Card key={card.id} className="bg-card border-border shadow-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">Card #{card.id}</Badge>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCard(card.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCard(card.id)}
                      className="h-8 w-8 p-0 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingCard === card.id ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Question</label>
                      <Input
                        defaultValue={card.question}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Answer</label>
                      <Textarea
                        defaultValue={card.answer}
                        className="w-full min-h-[80px]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(card.id)}>
                        <Save className="w-3 h-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                        <X className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Question</h3>
                      <p className="text-sm text-muted-foreground">{card.question}</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Answer</h3>
                      <p className="text-sm text-muted-foreground">{card.answer}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {cards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No cards yet</h3>
              <p>Start by adding your first card to this deck.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckManagement;
