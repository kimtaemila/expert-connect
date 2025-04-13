
import { GraphData, GraphNode, GraphLink } from './graphTypes';
import { Expert } from '@/data/types';
import { Topic } from '@/data/types';
import { Connection } from './connectionApi';

// Transform expert, topic, and connection data into graph format
export function transformToGraphData(
  experts: Expert[], 
  topics: Topic[], 
  connections: Connection[]
): GraphData {
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  // Add expert nodes (group 0)
  experts.forEach(expert => {
    nodes.push({
      id: `e-${expert.id}`,
      name: expert.name,
      group: 0, // Experts are group 0
      val: 10, // Size value for visualization
      color: '#ff6b6b', // Color for experts
      title: expert.title,
      company: expert.company || '', // Handle potential undefined
      industry: expert.industry || '', // Handle potential undefined
      type: 'expert'
    });
  });

  // Add topic nodes (group 1)
  topics.forEach(topic => {
    nodes.push({
      id: `t-${topic.id}`,
      name: topic.name,
      group: 1, // Topics are group 1
      val: topic.count || 5, // Size based on count or default
      color: '#4ecdc4', // Color for topics
      type: topic.type,
      count: topic.count,
      nodeType: 'topic'
    });
  });

  // Add connections
  connections.forEach(conn => {
    // Use the correct properties according to the Connection type definition
    const source = `e-${conn.source}`;
    const target = `t-${conn.target}`;
    
    links.push({
      source,
      target,
      value: conn.strength || 1, // Connection strength or default
      type: 'knows'
    });
  });

  return { nodes, links };
}
