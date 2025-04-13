
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { KnowledgeGraphView } from "@/components/views/KnowledgeGraphView";
import { ActivityView } from "@/components/views/ActivityView";
import { AnalyticsView } from "@/components/views/AnalyticsView";
import { SettingsView } from "@/components/views/SettingsView";
import { InfoView } from "@/components/views/InfoView";
import { mockExpert, mockGraphData } from "@/data/index";
import { industryExperts } from "@/data/experts";
import { toast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("database");
  const [selectedExpert, setSelectedExpert] = useState<any>(industryExperts[0]);
  const location = useLocation();

  // Handle expert selection passed from other pages
  useEffect(() => {
    if (location.state && location.state.selectedExpert) {
      setSelectedExpert(location.state.selectedExpert);
    }
  }, [location.state]);

  // Show API error toast once on initial load
  useEffect(() => {
    // Check if we're running in a Lovable preview (no backend)
    const isPreviewEnv = window.location.hostname.includes('lovable.app');
    
    if (isPreviewEnv) {
      toast({
        title: "API Connection Notice",
        description: "Running in preview mode with mock data. Live API features are limited.",
        duration: 5000,
      });
    }
  }, []);

  const handleNodeClick = (node: any) => {
    // Only handle expert nodes (group 0)
    if (node.group === 0) {
      // Try to find in our experts list
      const expertMatch = industryExperts.find(exp => 
        exp.name === node.name || 
        exp.id === node.id || 
        `e-${exp.id}` === node.id
      );

      if (expertMatch) {
        setSelectedExpert(expertMatch);
      } else {
        setSelectedExpert({
          ...mockExpert,
          name: node.name,
          title: node.title || "Expert",
          skills: node.skills || mockExpert.skills,
          industry: node.industry || "Technology"
        });
      }
    }
  };

  const renderContent = () => {
    switch (activeNav) {
      case "database":
        return <KnowledgeGraphView onExpertSelect={handleNodeClick} selectedExpert={selectedExpert} />;
      case "activity":
        return <ActivityView />;
      case "analytics":
        return <AnalyticsView />;
      case "settings":
        return <SettingsView />;
      case "info":
        return <InfoView />;
      default:
        return <KnowledgeGraphView onExpertSelect={handleNodeClick} selectedExpert={selectedExpert} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onNavChange={setActiveNav} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
}
