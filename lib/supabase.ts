import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database'; // We will create this type file next

// Ensure that the environment variables are not undefined
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}

if (!supabaseServiceRoleKey) {
  throw new Error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY');
}

// Create a single, reusable Supabase client for server-side operations
export const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    // In a server-side context, we don't need to persist the session
    persistSession: false,
  },
});
