
import { getExperts } from './expertApi';
import { getTopics } from './topicApi';
import { getConnections } from './connectionApi';
import { transformToGraphData } from './graphDataTransformer';
import { GraphData } from './graphTypes';
import { mockGraphData as originalMockData } from '@/data';

/**
 * Utility function to assign default colors based on node group
 * @param group The node group identifier
 * @returns A color hex code
 */
function getColorByGroup(group: number): string {
  const colorMap = {
    0: '#8884d8', // experts
    1: '#82ca9d', // topics
    2: '#ffc658', // industries
  };
  
  return colorMap[group as keyof typeof colorMap] || '#cccccc';
}

// Process mock data to ensure consistency with GraphData type
const mockGraphData: GraphData = {
  nodes: originalMockData.nodes.map(node => ({
    ...node,
    color: node.color || getColorByGroup(node.group),
  })),
  links: originalMockData.links
};

/**
 * Fetches knowledge graph data for visualization
 * 
 * Attempts to use API data first, falls back to mock data when:
 * - Running in development environment
 * - API data is unavailable
 * - API data format is invalid
 * 
 * @returns Promise<GraphData> - Graph data for visualization
 */
export async function getKnowledgeGraphData(): Promise<GraphData> {
  try {
    const isDevEnvironment = process.env.NODE_ENV === 'development' || 
                             window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1';
    
    // For production environments, attempt to fetch live data
    if (!isDevEnvironment) {
      console.log("Fetching production API data...");
    }
    
    // Fetch all required data in parallel
    const [experts, topics, connections] = await Promise.all([
      getExperts(),
      getTopics(),
      getConnections()
    ]);

    // Validate data completeness
    if (!experts?.length || !topics?.length || !connections?.length) {
      console.warn("Incomplete data returned from API, using mock data instead");
      return mockGraphData;
    }

    // Transform API data into visualization format
    const transformedData = transformToGraphData(experts, topics, connections);
    
    // Validate transformed data structure
    if (!transformedData?.nodes?.length || !transformedData?.links?.length) {
      console.warn("Invalid graph structure after transformation, using mock data");
      return mockGraphData;
    }
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching knowledge graph data:', error);
    return mockGraphData;
  }
}
