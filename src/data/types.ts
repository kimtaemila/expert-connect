
// Common type definitions for the application data

export interface Expert {
  id: string;
  name: string;
  title: string;
  company?: string;
  industry?: string;
  industries?: string[];
  skills: string[];
  connectionStrength: number;
  insights: string[];
  image?: string;
  imageUrl?: string;
  location?: string;
  email?: string;
  phone?: string;
  availability?: string;
  rating?: number;
  bio?: string;
}

export interface Topic {
  id: string;
  name: string;
  type: 'industry' | 'skill' | 'expertise';
  count: number;
}

export interface Connection {
  source: string;
  target: string;
  strength: number;
}

export interface Stats {
  totalExperts: number;
  activeEngagements: number;
  avgResponseTime: number;
  totalTopics: number;
  expertGrowth: {
    month: string;
    value: number;
  }[];
  industryDistribution: {
    industry: string;
    percentage: number;
  }[];
  skillsDistribution: {
    skill: string;
    value: number;
  }[];
  expertEngagementMetrics: {
    month: string;
    consultations: number;
    insights: number;
  }[];
}

export interface Activity {
  id: string;
  type: 'ai_matching' | 'expert_added' | 'graph_updated' | 'sentiment_analysis' | 'data_connected';
  title: string;
  description: string;
  time: string;
  icon: string;
}

export interface GraphNode {
  id: string;
  name: string;
  group: number;
  val: number;
  color?: string; // Made optional with '?'
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
