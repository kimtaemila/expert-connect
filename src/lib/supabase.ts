
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get Supabase URL and Key from environment variables or use provided values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qnjsvnzeudldlpgbqssl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuanN2bnpldWRsZGxwZ2Jxc3NsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzMDcyNjIsImV4cCI6MjA1OTg4MzI2Mn0.FpwlKgH_vsdrDjxYXhtavP9Y2I1TWJMMshATh4cYzDo';

let supabaseClient;

try {
  // Create the client with your Supabase credentials
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
  console.log('Supabase client initialized successfully');
} catch (error) {
  console.error('Error initializing Supabase client:', error);
  // Fallback is not needed anymore since we have valid credentials
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
