
interface GraphStatsProps {
  expertCount: number;
  topicCount: number;
  connectionCount: number;
  lastUpdated: string;
}

export function GraphStats({ 
  expertCount, 
  topicCount, 
  connectionCount, 
  lastUpdated 
}: GraphStatsProps) {
  return (
    <div className="flex justify-between items-center text-sm text-muted-foreground pb-2 pt-2">
      <div>
        {expertCount} Experts • 
        {topicCount} Topics • 
        {connectionCount} Connections
      </div>
      <div>Last updated: {lastUpdated}</div>
    </div>
  );
}
