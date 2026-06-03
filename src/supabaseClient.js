



import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uggdqjqnqjwbbjwxrhpj.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_0fXwcDjFyBV49rxNH9ooQA__fCl9M3L'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);