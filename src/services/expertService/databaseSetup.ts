
import { supabase } from '@/lib/supabase';
import { mockGraphData } from '@/data';

export async function setupDatabase(): Promise<boolean> {
  try {
    // Check if experts table exists and create it if it doesn't
    const { error: expertsTableError } = await supabase.rpc('create_experts_table_if_not_exists');
    
    if (expertsTableError) {
      console.error('Error creating experts table:', expertsTableError);
      return false;
    }

    // Check if topics table exists and create it if it doesn't
    const { error: topicsTableError } = await supabase.rpc('create_topics_table_if_not_exists');
    
    if (topicsTableError) {
      console.error('Error creating topics table:', topicsTableError);
      return false;
    }

    // Check if connections table exists and create it if it doesn't
    const { error: connectionsTableError } = await supabase.rpc('create_connections_table_if_not_exists');
    
    if (connectionsTableError) {
      console.error('Error creating connections table:', connectionsTableError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Database setup error:', error);
    return false;
  }
}
