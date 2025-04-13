
import express from 'express';
import { supabase } from '@/lib/supabase';

const router = express.Router();

// Get all connections
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('connections')
      .select('*');

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get connections for a specific expert
router.get('/expert/:expertId', async (req, res) => {
  try {
    const { expertId } = req.params;
    const { data, error } = await supabase
      .from('connections')
      .select('*')
      .or(`source_id.eq.${expertId},target_id.eq.${expertId}`);

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new connection
router.post('/', async (req, res) => {
  try {
    const connectionData = req.body;
    const { data, error } = await supabase
      .from('connections')
      .insert([connectionData])
      .select();

    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update connection
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const connectionData = req.body;
    const { data, error } = await supabase
      .from('connections')
      .update(connectionData)
      .eq('id', id)
      .select();

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Connection not found' });
    }
    
    res.json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete connection
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('connections')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get network graph data
router.get('/graph', async (req, res) => {
  try {
    const [experts, topics, connections] = await Promise.all([
      supabase.from('experts').select('*').then(result => result.data || []),
      supabase.from('topics').select('*').then(result => result.data || []),
      supabase.from('connections').select('*').then(result => result.data || [])
    ]);

    // Transform data into graph format
    const nodes = [
      ...experts.map(expert => ({
        id: `e-${expert.id}`,
        name: expert.name,
        group: 0,
        val: 10,
        color: '#ff6b6b',
        title: expert.title,
        type: 'expert'
      })),
      ...topics.map(topic => ({
        id: `t-${topic.id}`,
        name: topic.name,
        group: 1,
        val: topic.count || 5,
        color: '#4ecdc4',
        type: topic.type,
        count: topic.count,
        nodeType: 'topic'
      }))
    ];

    const links = connections.map(conn => ({
      source: `e-${conn.source_id}`,
      target: `t-${conn.target_id}`,
      value: conn.strength || 1
    }));

    res.json({ nodes, links });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
