
// Type definitions for knowledge graph data

export interface GraphNode {
  id: string;
  name: string;
  group: number;
  val: number;
  color?: string; // Made optional with '?'
  [key: string]: any;
}

export interface GraphLink {
  source: string;
  target: string;
  value: number;
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Extended Expert interface to include optional properties we're using
export interface ExtendedExpert {
  id: string;
  name: string;
  title: string;
  industry?: string;
  company?: string;
  skills: string[];
  [key: string]: any;
}
