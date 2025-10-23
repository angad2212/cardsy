import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Heatmap } from "@/components/Heatmap";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Brain, Zap } from "lucide-react";

// Sample user data
const SAMPLE_USER_DATA = {
  id: 1,
  username: "Student1",
  level: 15,
  xp: 4600,
  totalXP: 5000,
  accuracy: 93,
  joinDate: "2024-01-15",
  avatar: "S",
  recentDecks: [
    { id: 1, name: "World Capitals", subject: "Geography", completedCards: 45, totalCards: 50 },
    { id: 2, name: "Spanish Vocabulary", subject: "Languages", completedCards: 120, totalCards: 200 },
    { id: 3, name: "Python Programming", subject: "Computer Science", completedCards: 89, totalCards: 150 },
    { id: 4, name: "Biology Fundamentals", subject: "Science", completedCards: 67, totalCards: 180 },
    { id: 5, name: "US History Timeline", subject: "History", completedCards: 98, totalCards: 120 },
  ],
};

// Sample heatmap data for the user
const generateUserHeatmapData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < 365; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (365 - i));
    const month = date.getMonth();
    const dayOfWeek = date.getDay();
    
    // Create realistic activity pattern
    let count = 0;
    
    // Higher activity in recent months
    if (month >= 6) { // July onwards
      count = Math.floor(Math.random() * 18) + 5;
    } else if (month >= 4) { // May, June
      count = Math.floor(Math.random() * 10) + 2;
    } else {
      // Earlier months have lower activity
      count = Math.random() > 0.6 ? Math.floor(Math.random() * 8) : 0;
    }
    
    // Reduce activity on weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      count = Math.floor(count * 0.4);
    }
    
    data.push({
      date: date.toISOString().split('T')[0],
      count: count,
    });
  }
  
  return data;
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user] = useState(SAMPLE_USER_DATA);
  const [heatmapData] = useState(generateUserHeatmapData());

  const handleBack = () => {
    navigate("/social");
  };

  const calculateLevelProgress = () => {
    return (user.xp / user.totalXP) * 100;
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
              Back to Social
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{user.username}</h1>
              <p className="text-muted-foreground">Joined {new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="text-right">
            <Badge variant="secondary" className="text-lg px-3 py-1">
              Level {user.level}
            </Badge>
          </div>
        </header>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{user.xp.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">
                {user.totalXP - user.xp} XP to next level
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Target className="w-4 h-4" />
                Average Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{user.accuracy}%</div>
              <div className="text-xs text-muted-foreground">Overall performance</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Cards Mastered
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {user.recentDecks.reduce((sum, deck) => sum + deck.completedCards, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Total cards studied</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Study Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">42 days</div>
              <div className="text-xs text-muted-foreground">Current streak</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Level Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level {user.level}</span>
                <span className="text-muted-foreground">Level {user.level + 1}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div 
                  className="bg-primary h-3 rounded-full transition-all duration-300"
                  style={{ width: `${calculateLevelProgress()}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{user.xp.toLocaleString()} XP</span>
                <span>{user.totalXP.toLocaleString()} XP</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity Heatmap */}
        <Heatmap data={heatmapData} />

        {/* Recent Decks */}
        <Card className="bg-card border-border shadow-card">
          <CardHeader>
            <CardTitle>Recent Decks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {user.recentDecks.map((deck) => (
                <div key={deck.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{deck.name}</h3>
                    <p className="text-sm text-muted-foreground">{deck.subject}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">
                      {deck.completedCards}/{deck.totalCards} cards
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {Math.round((deck.completedCards / deck.totalCards) * 100)}% complete
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;