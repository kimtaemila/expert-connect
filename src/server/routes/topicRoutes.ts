
import express from 'express';
import { supabase } from '@/lib/supabase';

const router = express.Router();

// Get all topics
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*');

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get topic by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new topic
router.post('/', async (req, res) => {
  try {
    const topicData = req.body;
    const { data, error } = await supabase
      .from('topics')
      .insert([topicData])
      .select();

    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update topic
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const topicData = req.body;
    const { data, error } = await supabase
      .from('topics')
      .update(topicData)
      .eq('id', id)
      .select();

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    
    res.json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete topic
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('topics')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Analyze topics (advanced endpoint)
router.get('/analyze/stats', async (req, res) => {
  try {
    const { data: topics, error: topicsError } = await supabase
      .from('topics')
      .select('*');

    const { data: connections, error: connectionsError } = await supabase
      .from('connections')
      .select('*');
      
    if (topicsError) throw topicsError;
    if (connectionsError) throw connectionsError;
    
    // Ensure we have data before processing
    const topicsArray = Array.isArray(topics) ? topics : [];
    const connectionsArray = Array.isArray(connections) ? connections : [];
    
    // Group topics by type
    const topicsByType = topicsArray.reduce((acc, topic) => {
      if (!acc[topic.type]) {
        acc[topic.type] = [];
      }
      acc[topic.type].push(topic);
      return acc;
    }, {} as Record<string, any[]>);
    
    const analysis = {
      topicsByType,
      totalTopics: topicsArray.length,
      totalConnections: connectionsArray.length,
      typeBreakdown: Object.entries(topicsByType).map(([type, typeTopics]: [string, any[]]) => ({
        type,
        count: typeTopics.length,
        percentage: (typeTopics.length / Math.max(topicsArray.length, 1)) * 100
      }))
    };
    
    res.json(analysis);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
