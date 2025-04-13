
import { supabase } from '@/lib/supabase';
import { Expert } from '@/data/types';
import nlp from 'compromise';

// Define the types for compromise
interface CompromiseDoc {
  topics: () => { out: (format: string) => string[] };
  sentiment?: () => number;
}

// Get all experts from the database
export async function getExperts(): Promise<Expert[]> {
  try {
    const { data, error } = await supabase
      .from('experts')
      .select('*');

    if (error) {
      console.error('Error fetching experts:', error);
      throw error;
    }

    return data.map(expert => ({
      id: expert.id,
      name: expert.name,
      title: expert.title,
      company: expert.company,
      industry: expert.industry,
      skills: expert.skills,
      location: expert.location,
      email: expert.email,
      phone: expert.phone,
      availability: expert.availability,
      rating: expert.rating,
      bio: expert.bio,
      image: expert.image
    }));
  } catch (error) {
    console.error('Error fetching experts:', error);
    return [];
  }
}

// Search experts by query term
export async function searchExperts(query: string): Promise<Expert[]> {
  try {
    // First attempt direct database search
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .or(`name.ilike.%${query}%,skills.cs.{${query}},industry.ilike.%${query}%,title.ilike.%${query}%,company.ilike.%${query}%`);

    if (error) {
      console.error('Error searching experts:', error);
      throw error;
    }
    
    // Process query with NLP if available
    let enhancedResults = data;
    try {
      const doc = nlp(query) as unknown as CompromiseDoc;
      // Only perform sentiment analysis if available in the library
      const hasSentiment = typeof doc.sentiment === 'function';
      
      if (hasSentiment && enhancedResults.length > 5) {
        // If we have many results, prioritize based on sentiment and query topics
        const sentiment = hasSentiment ? doc.sentiment!() : 0;
        const topics = doc.topics().out('array');
        
        // Custom ranking algorithm based on sentiment and topic relevance
        enhancedResults = enhancedResults
          .map(expert => {
            let score = 0;
            
            // Increase score for skill matches
            for (const skill of expert.skills || []) {
              if (query.toLowerCase().includes(skill.toLowerCase())) {
                score += 5;
              }
            }
            
            // Increase score for topic matches
            for (const topic of topics) {
              if (expert.bio && expert.bio.toLowerCase().includes(topic.toLowerCase())) {
                score += 3;
              }
              if (expert.skills && expert.skills.some((skill: string) => skill.toLowerCase().includes(topic.toLowerCase()))) {
                score += 2;
              }
            }
            
            return {
              ...expert,
              score
            };
          })
          .sort((a, b) => b.score - a.score);
      }
    } catch (nlpError) {
      console.warn('NLP processing error:', nlpError);
      // Return original results if NLP fails
    }

    return enhancedResults;
  } catch (error) {
    console.error('Error searching experts:', error);
    return [];
  }
}

// Get expert by ID
export async function getExpertById(id: string): Promise<Expert | null> {
  try {
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching expert with ID ${id}:`, error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching expert with ID ${id}:`, error);
    return null;
  }
}
