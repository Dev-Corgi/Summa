import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return apiError('Search query is required.', 400);
  }

  try {
    // Use textSearch for finding matches in title and authors.
    // For better performance, a tsvector column and a GIN index should be created.
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .textSearch('title', `'${query}'`); // Basic search, can be improved with different configs

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to perform search.', 500);
    }

    return apiSuccess(data);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
