
import express from 'express';
import { supabase } from '@/lib/supabase';

const router = express.Router();

// Get all experts
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('experts')
      .select('*');

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get expert by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    
    if (!data) {
      return res.status(404).json({ error: 'Expert not found' });
    }
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Search experts
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { data, error } = await supabase
      .from('experts')
      .select('*')
      .or(`name.ilike.%${query}%,skills.cs.{${query}},industries.cs.{${query}},title.ilike.%${query}%`);

    if (error) throw error;
    
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Create new expert
router.post('/', async (req, res) => {
  try {
    const expertData = req.body;
    const { data, error } = await supabase
      .from('experts')
      .insert([expertData])
      .select();

    if (error) throw error;
    
    res.status(201).json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update expert
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const expertData = req.body;
    const { data, error } = await supabase
      .from('experts')
      .update(expertData)
      .eq('id', id)
      .select();

    if (error) throw error;
    
    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'Expert not found' });
    }
    
    res.json(data[0]);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete expert
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('experts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
