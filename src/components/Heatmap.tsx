import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface HeatmapProps {
  data: { date: string; count: number }[];
}

export const Heatmap = ({ data }: HeatmapProps) => {
  const getIntensityClass = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 5) return "bg-heatmap-1";
    if (count <= 10) return "bg-heatmap-2";
    if (count <= 15) return "bg-heatmap-3";
    return "bg-heatmap-4";
  };

  // Generate last 12 weeks of data
  const weeks = 12;
  const daysInWeek = 7;
  const today = new Date();
  
  const heatmapData = Array.from({ length: weeks * daysInWeek }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (weeks * daysInWeek - i - 1));
    const dateStr = date.toISOString().split('T')[0];
    const entry = data.find(d => d.date === dateStr);
    return {
      date: dateStr,
      count: entry?.count || 0,
      day: date.getDay(),
    };
  });

  const weekData = Array.from({ length: weeks }, (_, weekIndex) => {
    return heatmapData.slice(weekIndex * daysInWeek, (weekIndex + 1) * daysInWeek);
  });

  return (
    <div className="bg-card p-6 rounded-xl border border-border shadow-card">
      <h3 className="text-lg font-semibold mb-4">Activity Heatmap</h3>
      <TooltipProvider>
        <div className="flex gap-1">
          {weekData.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1">
              {week.map((day, dayIdx) => (
                <Tooltip key={`${weekIdx}-${dayIdx}`}>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-3 h-3 rounded-sm transition-all hover:scale-110 ${getIntensityClass(day.count)}`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      {day.date}: {day.count} cards studied
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          ))}
        </div>
      </TooltipProvider>
      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 bg-muted rounded-sm" />
          <div className="w-3 h-3 bg-heatmap-1 rounded-sm" />
          <div className="w-3 h-3 bg-heatmap-2 rounded-sm" />
          <div className="w-3 h-3 bg-heatmap-3 rounded-sm" />
          <div className="w-3 h-3 bg-heatmap-4 rounded-sm" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
