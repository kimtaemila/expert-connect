
import { Header } from "@/components/layout/Header";
import { BarChart } from "@/components/visualizations/BarChart";
import { LineChart } from "@/components/visualizations/LineChart";
import { PieChart } from "@/components/visualizations/PieChart";
import { AIInsights } from "@/components/dashboard/AIInsights";
import { StatCard } from "@/components/dashboard/StatCard";
import { 
  Users, 
  MessageSquare, 
  Clock, 
  Tag,
} from "lucide-react";
import { stats } from "@/data";

export function AnalyticsView() {
  return (
    <>
      <Header title="Expert Analytics" />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Expert Network Analytics</h1>
        <p className="text-muted-foreground mb-6">Insights and trends across the expert knowledge graph</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCard 
            title="Total Experts" 
            value={stats.totalExperts} 
            change={{ value: "+12% from last month", positive: true }}
            icon={<Users className="w-4 h-4" />}
          />
          <StatCard 
            title="Active Engagements" 
            value={stats.activeEngagements} 
            change={{ value: "+8% from last month", positive: true }}
            icon={<MessageSquare className="w-4 h-4" />}
          />
          <StatCard 
            title="Avg. Response Time" 
            value={`${stats.avgResponseTime} hrs`} 
            change={{ value: "+15% faster than goal", positive: true }}
            icon={<Clock className="w-4 h-4" />}
          />
          <StatCard 
            title="Total Topics" 
            value={stats.totalTopics} 
            change={{ value: "+8% from last month", positive: true }}
            icon={<Tag className="w-4 h-4" />}
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-xl shadow-sm">
            <LineChart 
              title="Expert Network Growth" 
              data={stats.expertGrowth}
              lines={[{ key: "value", color: "#8B5CF6", name: "Experts" }]}
              xAxisKey="month"
            />
          </div>
          
          <div className="bg-card rounded-xl shadow-sm">
            <PieChart 
              title="Industry Distribution" 
              data={stats.industryDistribution.map(item => ({
                name: item.industry,
                value: item.percentage,
                color: item.industry === "Healthcare" ? "#6366F1" : 
                       item.industry === "Technology" ? "#8B5CF6" : 
                       item.industry === "Finance" ? "#2563EB" : 
                       item.industry === "Education" ? "#10B981" : 
                       "#F59E0B"
              }))}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-card rounded-xl shadow-sm">
            <BarChart 
              title="Top Skills Distribution" 
              data={stats.skillsDistribution}
              xAxisKey="skill"
              barKey="value"
              barColor="#8B5CF6"
            />
          </div>
          
          <div className="bg-card rounded-xl shadow-sm">
            <LineChart 
              title="Expert Engagement Metrics" 
              data={stats.expertEngagementMetrics}
              lines={[
                { key: "consultations", color: "#8B5CF6", name: "Consultations" },
                { key: "insights", color: "#10B981", name: "Insights" }
              ]}
              xAxisKey="month"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AIInsights />
        </div>
      </div>
    </>
  );
}
