
import { Header, SearchHeader } from "@/components/layout/Header";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { activities } from "@/data/index";
import { useQuery } from "@tanstack/react-query";
import { expertsApi } from "@/services/apiService";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

export function ActivityView() {
  const [recentActivities, setRecentActivities] = useState(activities);

  // Fetch recent expert data to generate activity items
  const { data: experts, isLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: expertsApi.getAll,
    meta: {
      onSuccess: (data: any) => {
        console.log('Successfully fetched experts data:', data);
      },
      onError: (error: any) => {
        console.error("Failed to fetch experts:", error);
        toast({
          title: "Error fetching expert data",
          description: "Using mock data as fallback",
          variant: "destructive",
        });
      }
    }
  });

  // Generate activity items from real expert data when available
  useEffect(() => {
    if (experts && experts.length) {
      const newActivities = experts.slice(0, 5).map((expert: any, index: number) => {
        return {
          id: `activity-${index}`,
          type: index % 2 === 0 ? 'connection' : 'insight',
          expert: {
            name: expert.name,
            title: expert.title,
            avatar: expert.image_url || `https://i.pravatar.cc/40?img=${index + 10}`
          },
          timestamp: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
          content: `New ${index % 2 === 0 ? 'connection' : 'insight'} for ${expert.name} related to ${
            expert.skills && expert.skills.length ? expert.skills[0] : 'industry expertise'
          }`
        };
      });
      
      setRecentActivities(newActivities);
    }
  }, [experts]);

  return (
    <>
      <Header title="Expert Knowledge Graph" />
      <SearchHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Recent Activities</h1>
          {isLoading ? (
            <div className="flex justify-center p-12">
              <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <ActivityFeed activities={recentActivities} />
          )}
        </div>
      </div>
    </>
  );
}
