import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return apiError('Book ID is required.', 400);
  }

  try {
    // Increment view count in the background (fire and forget)
    supabase.rpc('increment_view_count', { book_id_param: id }).then(({ error }) => {
        if (error) console.error('Failed to increment view count:', error);
    });

    // Fetch book details
    const { data, error } = await supabase
      .from('summaries')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') { // PostgREST error for no rows found
        return apiError('Book not found.', 404);
      }
      return apiError('Failed to fetch book details.', 500);
    }

    if (!data) {
        return apiError('Book not found.', 404);
    }

    return apiSuccess(data);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
