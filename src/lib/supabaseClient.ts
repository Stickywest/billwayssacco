import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://loaahiigxyxsaukkkbiw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvYWFoaWlneHl4c2F1a2trYml3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NjI3NTksImV4cCI6MjA2NTEzODc1OX0.xVG_GQGRKAf88aciWG6WlgLXyYUXgGtmZGPDa_-fznM';
//const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Safe for frontend
export const supabase = createClient(supabaseUrl, supabaseKey);
//export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

