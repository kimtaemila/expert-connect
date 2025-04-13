
import { Expert } from "./types";

export const industryExperts: Expert[] = [
  // Healthcare & Medical
  {
    id: "exp-001",
    name: "Dr. Sarah Chen",
    title: "AI Ethics Specialist & Healthcare Consultant",
    company: "MedTech Innovations",
    industry: "Healthcare",
    skills: ["AI Ethics", "Healthcare Tech", "Medical Research", "Data Privacy", "Regulatory Compliance"],
    location: "Boston, MA",
    email: "sarah.chen@example.com",
    phone: "+1 (555) 123-4567",
    availability: "Available",
    rating: 4.9,
    connectionStrength: 85,
    bio: "Dr. Chen specializes in the ethical implications of AI in healthcare settings, with a focus on patient data privacy and medical research integrity.",
    insights: [
      "AI in diagnostics requires stringent ethical oversight to protect patient data while maximizing healthcare outcomes.",
      "The intersection of machine learning and healthcare presents unique challenges that require specialized regulatory frameworks."
    ]
  },
  
  // Cybersecurity
  {
    id: "exp-002",
    name: "Marcus Johnson",
    title: "Chief Information Security Officer",
    company: "SecureNet Technologies",
    industry: "Cybersecurity",
    skills: ["Threat Intelligence", "Network Security", "Penetration Testing", "Security Architecture", "Incident Response"],
    location: "Austin, TX",
    email: "marcus.johnson@example.com",
    phone: "+1 (555) 234-5678",
    availability: "Limited Availability",
    rating: 4.8,
    connectionStrength: 92,
    bio: "Marcus has 15+ years of experience in cybersecurity, specializing in protecting enterprise systems from advanced persistent threats.",
    insights: [
      "Zero trust architectures are becoming essential as remote work becomes the norm in enterprise environments.",
      "The most successful security strategies combine technical controls with robust human awareness training."
    ]
  },
  
  // Finance & FinTech
  {
    id: "exp-003",
    name: "Aisha Patel",
    title: "FinTech Innovation Lead",
    company: "Global Financial Partners",
    industry: "Finance",
    skills: ["Blockchain", "Digital Banking", "Risk Management", "Financial Analysis", "Regulatory Technology"],
    location: "New York, NY",
    email: "aisha.patel@example.com",
    phone: "+1 (555) 345-6789",
    availability: "Available",
    rating: 4.7,
    connectionStrength: 78,
    bio: "Aisha leads fintech strategy for major financial institutions, focusing on blockchain implementation and digital transformation.",
    insights: [
      "DeFi protocols are reshaping traditional banking models faster than regulations can adapt.",
      "The next wave of fintech will focus on financial inclusion and accessibility across global markets."
    ]
  },
  
  // Sustainability & Climate Tech
  {
    id: "exp-004",
    name: "Dr. Miguel Reyes",
    title: "Sustainability Strategist & Environmental Scientist",
    company: "EcoSolutions Global",
    industry: "Environmental",
    skills: ["Climate Modeling", "Renewable Energy", "Carbon Markets", "ESG Reporting", "Sustainable Supply Chain"],
    location: "Seattle, WA",
    email: "miguel.reyes@example.com",
    phone: "+1 (555) 456-7890",
    availability: "Available",
    rating: 4.9,
    connectionStrength: 88,
    bio: "Dr. Reyes combines environmental science with business strategy to help companies transition to sustainable operational models.",
    insights: [
      "Carbon market mechanisms are becoming the primary driver for corporate emissions reductions globally.",
      "Technology-enabled transparency in supply chains is revolutionizing how companies approach sustainability."
    ]
  },
  
  // Manufacturing & Industry 4.0
  {
    id: "exp-005",
    name: "Ingrid Schmidt",
    title: "Advanced Manufacturing Director",
    company: "Industry 4.0 Solutions",
    industry: "Manufacturing",
    skills: ["IoT Implementation", "Predictive Maintenance", "Digital Twin Technology", "Robotics", "Smart Factory Design"],
    location: "Detroit, MI",
    email: "ingrid.schmidt@example.com",
    phone: "+1 (555) 567-8901",
    availability: "Limited Availability",
    rating: 4.8,
    connectionStrength: 83,
    bio: "Ingrid specializes in transforming traditional manufacturing facilities into connected, intelligent production environments.",
    insights: [
      "Predictive maintenance powered by IoT sensors can reduce downtime by up to 45% in manufacturing settings.",
      "Digital twin implementation provides the highest ROI when applied to critical production bottlenecks."
    ]
  },
  
  // AI & Machine Learning
  {
    id: "exp-006",
    name: "Dr. James Park",
    title: "AI Research Director",
    company: "Cognitive Systems Inc.",
    industry: "Technology",
    skills: ["Deep Learning", "Natural Language Processing", "Computer Vision", "AI Ethics", "Neural Networks"],
    location: "San Francisco, CA",
    email: "james.park@example.com",
    phone: "+1 (555) 678-9012",
    availability: "Unavailable",
    rating: 4.9,
    connectionStrength: 95,
    bio: "Dr. Park leads cutting-edge research in machine learning algorithms with a focus on responsible AI development.",
    insights: [
      "Large language models are approaching general intelligence in narrow domains, but still lack true reasoning capabilities.",
      "The future of AI lies not in bigger models but in more efficient architecture design and training methodologies."
    ]
  }
];

export default industryExperts;
