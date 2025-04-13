
import { supabase } from '@/lib/supabase';
import { Topic } from '@/data/types';
import * as ss from 'simple-statistics';

export async function getTopics(): Promise<Topic[]> {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*');

    if (error) {
      console.error('Error fetching topics:', error);
      throw error;
    }

    return data.map(topic => ({
      id: topic.id,
      name: topic.name,
      type: topic.type,
      count: topic.count
    }));
  } catch (error) {
    console.error('Error fetching topics:', error);
    // Return empty array instead of throwing
    return [];
  }
}

// Analyze topics with statistical methods to identify trends and patterns
export async function analyzeTopics(): Promise<any> {
  try {
    // Get topics and connections for analysis
    const [topics, connections] = await Promise.all([
      getTopics(),
      supabase.from('connections').select('*')
        .then(res => res.data || [])
    ]);
    
    // Group topics by type
    const topicsByType = topics.reduce((acc, topic) => {
      if (!acc[topic.type]) {
        acc[topic.type] = [];
      }
      acc[topic.type].push(topic);
      return acc;
    }, {} as Record<string, Topic[]>);

    // Calculate statistics for each topic type
    const analysisResults = {};
    
    for (const [type, topicsOfType] of Object.entries(topicsByType)) {
      const counts = topicsOfType.map(t => t.count);
      
      // Only calculate stats if we have data
      if (counts.length > 0) {
        analysisResults[type] = {
          total: topicsOfType.length,
          mean: ss.mean(counts),
          median: ss.median(counts),
          standardDeviation: counts.length > 1 ? ss.standardDeviation(counts) : 0,
          min: ss.min(counts),
          max: ss.max(counts),
          // Find topics with highest count
          top5: topicsOfType.sort((a, b) => b.count - a.count).slice(0, 5),
          // Perform quantile analysis
          quantiles: {
            q1: ss.quantile(counts, 0.25),
            q2: ss.quantile(counts, 0.5),
            q3: ss.quantile(counts, 0.75)
          }
        };
      }
    }
    
    return analysisResults;
  } catch (error) {
    console.error('Error analyzing topics:', error);
    return {};
  }
}
