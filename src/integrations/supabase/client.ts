import { createClient } from '@supabase/supabase-js';

// Note: These should be environment variables in a real application
const supabaseUrl = 'https://your-project.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);