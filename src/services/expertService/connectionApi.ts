
import { supabase } from '@/lib/supabase';

export interface Connection {
  source: string;
  target: string;
  strength: number;
}

export async function getConnections(): Promise<Connection[]> {
  try {
    const { data, error } = await supabase
      .from('connections')
      .select('*');

    if (error) {
      console.error('Error fetching connections:', error);
      throw error;
    }

    return data.map(connection => ({
      source: connection.source_id,
      target: connection.target_id,
      strength: connection.strength
    }));
  } catch (error) {
    console.error('Error fetching connections:', error);
    // Return empty array instead of throwing
    return [];
  }
}
