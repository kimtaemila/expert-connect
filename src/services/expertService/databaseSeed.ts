import { supabase } from '@/lib/supabase';
import { mockGraphData } from '@/data/index';

export async function seedDatabase(): Promise<boolean> {
  try {
    // First check if we already have data
    const { data: existingExperts, error: checkError } = await supabase
      .from('experts')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking for existing data:', checkError);
      return false;
    }

    // If we already have experts data, don't seed
    if (existingExperts && existingExperts.length > 0) {
      console.log('Database already contains data, skipping seed');
      return true;
    }

    // Use the mock graph data to create our seed data
    const { nodes, links } = mockGraphData;
    
    // Extract experts from nodes (group 0 is experts)
    const experts = nodes
      .filter(node => node.group === 0)
      .map(node => ({
        id: node.id,
        name: node.name,
        title: 'Expert',  // Default title since it's not in mockGraphData
        industries: [],   // Will be populated from links
        skills: [],       // Will be populated from links
        connection_strength: 50,  // Default value
        insights: ['Generated insight for ' + node.name],
        image_url: undefined
      }));
    
    // Extract topics from nodes (groups 1 and 2 are skills and industries)
    const topics = nodes
      .filter(node => node.group === 1 || node.group === 2)
      .map(node => ({
        id: node.id,
        name: node.name,
        type: node.group === 1 ? 'skill' : 'industry',
        count: node.val || 1
      }));
    
    // Use links as connections
    const connections = links.map(link => ({
      source_id: link.source,
      target_id: link.target,
      strength: link.value
    }));
    
    // Process links to populate experts' skills and industries
    links.forEach(link => {
      // Find the connected nodes
      const sourceNode = nodes.find(node => node.id === link.source);
      const targetNode = nodes.find(node => node.id === link.target);
      
      if (!sourceNode || !targetNode) return;
      
      // If source is expert and target is skill/industry
      if (sourceNode.group === 0 && (targetNode.group === 1 || targetNode.group === 2)) {
        const expert = experts.find(e => e.id === sourceNode.id);
        if (!expert) return;
        
        if (targetNode.group === 1) { // Skill
          if (!expert.skills.includes(targetNode.name)) {
            expert.skills.push(targetNode.name);
          }
        } else { // Industry
          if (!expert.industries.includes(targetNode.name)) {
            expert.industries.push(targetNode.name);
          }
        }
      }
      
      // If target is expert and source is skill/industry
      if (targetNode.group === 0 && (sourceNode.group === 1 || sourceNode.group === 2)) {
        const expert = experts.find(e => e.id === targetNode.id);
        if (!expert) return;
        
        if (sourceNode.group === 1) { // Skill
          if (!expert.skills.includes(sourceNode.name)) {
            expert.skills.push(sourceNode.name);
          }
        } else { // Industry
          if (!expert.industries.includes(sourceNode.name)) {
            expert.industries.push(sourceNode.name);
          }
        }
      }
    });

    // Insert experts
    const { error: expertsError } = await supabase
      .from('experts')
      .insert(experts);

    if (expertsError) {
      console.error('Error seeding experts:', expertsError);
      return false;
    }

    // Insert topics
    const { error: topicsError } = await supabase
      .from('topics')
      .insert(topics);

    if (topicsError) {
      console.error('Error seeding topics:', topicsError);
      return false;
    }

    // Insert connections
    const { error: connectionsError } = await supabase
      .from('connections')
      .insert(connections);

    if (connectionsError) {
      console.error('Error seeding connections:', connectionsError);
      return false;
    }

    console.log('Database seeded successfully!');
    return true;
  } catch (error) {
    console.error('Database seed error:', error);
    return false;
  }
}
