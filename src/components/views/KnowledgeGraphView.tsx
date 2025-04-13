
import { useState } from "react";
import { Header, SearchHeader } from "@/components/layout/Header";
import { ExpertDetails } from "@/components/dashboard/ExpertDetails";
import { ExpertSelector } from "@/components/dashboard/ExpertSelector";
import { GraphContainer } from "@/components/dashboard/GraphContainer";
import { GraphStats } from "@/components/dashboard/GraphStats";
import { mockExpert, mockGraphData } from "@/data/index";
import { useQuery } from "@tanstack/react-query";
import { connectionsApi, expertsApi } from "@/services/apiService";
import { industryExperts } from "@/data/experts";

interface KnowledgeGraphViewProps {
  onExpertSelect?: (node: any) => void;
  selectedExpert?: any;
}

export function KnowledgeGraphView({ onExpertSelect, selectedExpert = mockExpert }: KnowledgeGraphViewProps) {
  const [showExpertDetails, setShowExpertDetails] = useState(true);
  const [currentExpert, setCurrentExpert] = useState(selectedExpert);
  const [experts, setExperts] = useState(industryExperts);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  
  // Fetch experts data
  const { data: fetchedExperts, isLoading: loadingExperts } = useQuery({
    queryKey: ['experts'],
    queryFn: expertsApi.getAll,
    meta: {
      onSuccess: (data: any) => {
        if (data && data.length) {
          setExperts([...industryExperts, ...data]);
        }
      }
    }
  });
  
  // Fetch graph data statistics with error handling and fallback
  const { data: graphStats } = useQuery({
    queryKey: ['graphStats'],
    queryFn: async () => {
      try {
        const graphData = await connectionsApi.getGraphData();
        
        if (!graphData || !graphData.nodes) {
          console.warn("Using fallback graph data");
          // Use mockGraphData as fallback
          return {
            expertCount: mockGraphData.nodes.filter((n: any) => n.group === 0).length,
            topicCount: mockGraphData.nodes.filter((n: any) => n.group === 1).length,
            connectionCount: mockGraphData.links.length,
            lastUpdated: new Date().toISOString()
          };
        }
        
        const expertCount = graphData.nodes.filter((n: any) => n.group === 0).length;
        const topicCount = graphData.nodes.filter((n: any) => n.group === 1).length;
        const connectionCount = graphData.links.length;
        
        return {
          expertCount,
          topicCount,
          connectionCount,
          lastUpdated: new Date().toISOString()
        };
      } catch (error) {
        console.error("Failed to fetch graph stats, using fallback data:", error);
        return {
          expertCount: mockGraphData.nodes.filter((n: any) => n.group === 0).length,
          topicCount: mockGraphData.nodes.filter((n: any) => n.group === 1).length,
          connectionCount: mockGraphData.links.length,
          lastUpdated: new Date().toISOString()
        };
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  // Format the last updated time
  const lastUpdatedText = graphStats?.lastUpdated 
    ? getTimeAgo(new Date(graphStats.lastUpdated))
    : '5 minutes ago';

  const handleExpertSelect = (expert: any) => {
    setCurrentExpert(expert);
    if (onExpertSelect) {
      onExpertSelect(expert);
    }
  };

  const handleNodeClick = (node: any) => {
    handleExpertSelect(node);
  };

  return (
    <>
      <Header title="Expert Knowledge Graph" />
      <SearchHeader />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 p-6 overflow-y-auto">
          <GraphContainer onNodeClick={handleNodeClick} />
          
          <GraphStats 
            expertCount={graphStats?.expertCount || 5}
            topicCount={graphStats?.topicCount || 6}
            connectionCount={graphStats?.connectionCount || 29}
            lastUpdated={lastUpdatedText}
          />
        </div>

        <div className="w-80 border-l border-border overflow-y-auto">
          <ExpertSelector 
            experts={experts}
            onExpertSelect={handleExpertSelect}
            selectedIndustry={selectedIndustry}
            setSelectedIndustry={setSelectedIndustry}
          />
          
          {showExpertDetails ? (
            <ExpertDetails expert={currentExpert} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p>Select a node to view details</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Helper function to format time
function getTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  
  return Math.floor(seconds) + ' seconds ago';
}
