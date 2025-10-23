import { Navigation } from "@/components/Navigation";
import { PerformanceChart } from "@/components/PerformanceChart";
import { StatCard } from "@/components/StatCard";
import { Brain, Target, Trophy, TrendingUp, Clock, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heatmap } from "@/components/Heatmap";

// Sample data
const generatePerformanceData = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    accuracy: Math.floor(70 + Math.random() * 25),
    xp: Math.floor(50 + Math.random() * 150),
  }));
};

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

const DECK_ANALYTICS = [
  {
    id: 1,
    name: "World Capitals",
    totalCards: 50,
    masteredCards: 38,
    accuracy: 85,
    avgTime: "2.5s",
    totalSessions: 12,
  },
  {
    id: 2,
    name: "Literary Classics",
    totalCards: 40,
    masteredCards: 35,
    accuracy: 92,
    avgTime: "3.1s",
    totalSessions: 8,
  },
  {
    id: 3,
    name: "Chemistry Basics",
    totalCards: 60,
    masteredCards: 42,
    accuracy: 78,
    avgTime: "4.2s",
    totalSessions: 15,
  },
];

const Analytics = () => {
  const performanceData = generatePerformanceData();
  const heatmapData = generateHeatmapData();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <header>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-muted-foreground">Track your learning journey and progress</p>
        </header>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="decks">Per Deck</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Target}
                label="Total Cards"
                value="150"
                trend="3 decks active"
                accentColor="primary"
              />
              <StatCard
                icon={Brain}
                label="Mastered"
                value="115"
                trend="76% completion"
                accentColor="secondary"
              />
              <StatCard
                icon={Trophy}
                label="Total XP"
                value="3,450"
                trend="+250 this week"
                accentColor="primary"
              />
              <StatCard
                icon={TrendingUp}
                label="Avg. Accuracy"
                value="86%"
                trend="+4% improvement"
                accentColor="secondary"
              />
            </div>

            {/* Performance Chart */}
            <PerformanceChart data={performanceData} />

            {/* Activity Heatmap */}
            <Heatmap data={heatmapData} />
          </TabsContent>

          <TabsContent value="decks" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {DECK_ANALYTICS.map((deck) => (
                <div
                  key={deck.id}
                  className="bg-card p-6 rounded-xl border border-border shadow-card hover:shadow-elevated transition-all"
                >
                  <h3 className="text-xl font-bold mb-4">{deck.name}</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-primary">
                        {deck.masteredCards}/{deck.totalCards} cards
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(deck.masteredCards / deck.totalCards) * 100}%` }}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-2">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{deck.accuracy}%</p>
                        <p className="text-xs text-muted-foreground">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-secondary">{deck.avgTime}</p>
                        <p className="text-xs text-muted-foreground">Avg Time</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">{deck.totalSessions}</p>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card p-6 rounded-xl border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Best Study Time</h3>
                </div>
                <p className="text-3xl font-bold text-primary mb-2">6:00 PM - 8:00 PM</p>
                <p className="text-muted-foreground">Your peak performance window</p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold">Learning Streak</h3>
                </div>
                <p className="text-3xl font-bold text-secondary mb-2">12 Days</p>
                <p className="text-muted-foreground">Keep it up! You're on fire 🔥</p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold">Strongest Subject</h3>
                </div>
                <p className="text-3xl font-bold text-primary mb-2">Literature</p>
                <p className="text-muted-foreground">92% average accuracy</p>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-card">
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold">Focus Area</h3>
                </div>
                <p className="text-3xl font-bold text-secondary mb-2">Chemistry</p>
                <p className="text-muted-foreground">Needs more practice (78%)</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;
