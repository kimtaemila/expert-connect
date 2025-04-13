
import { Stats } from './types';

export const stats: Stats = {
  totalExperts: 247,
  activeEngagements: 85,
  avgResponseTime: 3.2,
  totalTopics: 189,
  expertGrowth: [
    { month: "Jan", value: 130 },
    { month: "Feb", value: 145 },
    { month: "Mar", value: 160 },
    { month: "Apr", value: 175 },
    { month: "May", value: 185 },
    { month: "Jun", value: 195 },
    { month: "Jul", value: 210 },
    { month: "Aug", value: 225 },
    { month: "Sep", value: 240 },
    { month: "Oct", value: 247 }
  ],
  industryDistribution: [
    { industry: "Healthcare", percentage: 35 },
    { industry: "Technology", percentage: 25 },
    { industry: "Finance", percentage: 18 },
    { industry: "Education", percentage: 12 },
    { industry: "Energy", percentage: 10 }
  ],
  skillsDistribution: [
    { skill: "AI Ethics", value: 48 },
    { skill: "Machine Learning", value: 42 },
    { skill: "Data Privacy", value: 36 },
    { skill: "Cloud Computing", value: 30 },
    { skill: "Regulatory", value: 24 },
    { skill: "Cybersecurity", value: 18 }
  ],
  expertEngagementMetrics: [
    { month: "Jan", consultations: 45, insights: 20 },
    { month: "Feb", consultations: 52, insights: 25 },
    { month: "Mar", consultations: 48, insights: 28 },
    { month: "Apr", consultations: 60, insights: 30 },
    { month: "May", consultations: 55, insights: 35 },
    { month: "Jun", consultations: 67, insights: 38 },
    { month: "Jul", consultations: 70, insights: 40 },
    { month: "Aug", consultations: 75, insights: 45 },
    { month: "Sep", consultations: 80, insights: 48 },
    { month: "Oct", consultations: 85, insights: 50 }
  ]
};
