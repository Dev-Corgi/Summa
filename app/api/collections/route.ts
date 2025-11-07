import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('collections')
      .select(`
        id,
        title,
        description,
        short_description,
        image_type,
        curator,
        collection_items(count)
      `);

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch collections.', 500);
    }

    // Remap the data to include item_count directly
    const collections = data.map(c => ({
      ...c,
      item_count: c.collection_items[0]?.count || 0,
      collection_items: undefined, // Remove the nested structure
    }));

    return apiSuccess(collections);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
