import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Trophy, Crown, Sword, Brain, Moon } from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface BadgesProps {
  badges: BadgeData[];
}

export const Badges = ({ badges }: BadgesProps) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common": return "bg-gray-100 text-gray-800 border-gray-200";
      case "rare": return "bg-blue-100 text-blue-800 border-blue-200";
      case "epic": return "bg-purple-100 text-purple-800 border-purple-200";
      case "legendary": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearnedBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="space-y-6">
      {/* Earned Badges */}
      <div>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Earned Badges ({earnedBadges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map((badge) => (
            <TooltipProvider key={badge.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className={`bg-card border-2 border-primary shadow-card hover:shadow-elevated transition-all cursor-pointer ${getRarityColor(badge.rarity)}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          {badge.icon}
                        </div>
                        <div>
                          <CardTitle className="text-base">{badge.name}</CardTitle>
                          {badge.earnedDate && (
                            <p className="text-xs text-muted-foreground">
                              Earned {new Date(badge.earnedDate).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {badge.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">{badge.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>

      {/* Unearned Badges */}
      {unearnedBadges.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-muted-foreground">
            Available Badges ({unearnedBadges.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unearnedBadges.map((badge) => (
              <TooltipProvider key={badge.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card className="bg-card border border-border shadow-card opacity-60 hover:opacity-80 transition-all cursor-pointer">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                            {badge.icon}
                          </div>
                          <div>
                            <CardTitle className="text-base text-muted-foreground">{badge.name}</CardTitle>
                            <p className="text-xs text-muted-foreground">Not earned yet</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <Badge variant="outline" className="mt-2 text-xs border-muted-foreground text-muted-foreground">
                          {badge.rarity}
                        </Badge>
                      </CardContent>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{badge.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sample badge data
export const SAMPLE_BADGES: BadgeData[] = [
  {
    id: "consistency-warrior",
    name: "Consistency Warrior",
    description: "Maintain a daily study streak for 30 days",
    icon: <Sword className="w-5 h-5" />,
    earned: true,
    earnedDate: "2024-10-15",
    rarity: "rare"
  },
  {
    id: "consistency-king",
    name: "Consistency King",
    description: "Maintain a daily study streak for 90 days",
    icon: <Crown className="w-5 h-5" />,
    earned: true,
    earnedDate: "2024-09-20",
    rarity: "epic"
  },
  {
    id: "consistency-conqueror",
    name: "Consistency Conqueror",
    description: "Maintain a daily study streak for 180 days",
    icon: <Trophy className="w-5 h-5" />,
    earned: false,
    rarity: "legendary"
  },
  {
    id: "brainiac",
    name: "Brainiac",
    description: "Answer 1000 cards correctly",
    icon: <Brain className="w-5 h-5" />,
    earned: true,
    earnedDate: "2024-08-10",
    rarity: "epic"
  },
  {
    id: "night-owl",
    name: "Night Owl",
    description: "Study consistently between 10 PM and 2 AM for 7 days",
    icon: <Moon className="w-5 h-5" />,
    earned: false,
    rarity: "rare"
  }
];
