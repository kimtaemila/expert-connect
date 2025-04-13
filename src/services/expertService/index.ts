
// Re-export all service functions from the separate files
export { getExperts, searchExperts, getExpertById } from './expertApi';
export { getTopics, analyzeTopics } from './topicApi';
export { getConnections } from './connectionApi';
export { getKnowledgeGraphData, visualizeNetworkGraph } from './knowledgeGraphApi';
export { setupDatabase } from './databaseSetup';
export { seedDatabase } from './databaseSeed';
export { processNaturalLanguage } from './nlpService';
export { analyzeStatistics } from './dataAnalysisService';
export type { GraphData, GraphNode, GraphLink } from './graphTypes';
