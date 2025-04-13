
import { Activity } from "@/data/types";
import { Zap, User, Activity as ActivityIcon, Clock, Database } from "lucide-react";

interface ActivityFeedProps {
  activities: Activity[];
}

const getIcon = (type: string) => {
  switch (type) {
    case "ai_matching":
      return <Zap className="w-4 h-4 text-primary" />;
    case "expert_added":
      return <User className="w-4 h-4 text-green-500" />;
    case "graph_updated":
      return <ActivityIcon className="w-4 h-4 text-violet-500" />;
    case "sentiment_analysis":
      return <Clock className="w-4 h-4 text-amber-500" />;
    case "data_connected":
      return <Database className="w-4 h-4 text-red-500" />;
    default:
      return <ActivityIcon className="w-4 h-4" />;
  }
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4">
            <div className="p-2 rounded-md bg-muted h-fit">
              {getIcon(activity.type)}
            </div>
            <div>
              <h3 className="font-medium">{activity.title}</h3>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
