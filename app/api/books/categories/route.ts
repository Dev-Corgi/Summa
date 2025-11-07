import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';

export const runtime = 'edge';

export async function GET() {
  try {
    // Create a Remote Procedure Call to a custom PostgreSQL function
    // for better performance than querying the whole table.
    // We'll need to create this function in a new migration.
    const { data, error } = await supabase.rpc('get_distinct_categories');

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch categories.', 500);
    }

    // The RPC function returns an array of objects, e.g., [{ category: 'Science' }]
    const categories = data.map((item: any) => item.category);

    return apiSuccess(categories);
  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
