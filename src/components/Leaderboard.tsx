import { Trophy, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  xp: number;
  accuracy: number;
  avatar?: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserId?: string;
  title?: string;
}

export const Leaderboard = ({ entries, title = "Leaderboard" }: LeaderboardProps) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-primary" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-muted-foreground" />;
    if (rank === 3) return <Award className="w-5 h-5 text-secondary" />;
    return <span className="text-muted-foreground font-semibold">{rank}</span>;
  };

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-card">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-2">
        {entries.map((entry) => (
          <div
            key={entry.rank}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <div className="w-8 flex items-center justify-center">
              {getRankIcon(entry.rank)}
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              {entry.avatar || entry.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-semibold text-foreground">{entry.username}</p>
              <p className="text-xs text-muted-foreground">{entry.accuracy}% accuracy</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">{entry.xp.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
