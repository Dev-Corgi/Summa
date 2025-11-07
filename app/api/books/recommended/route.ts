import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    // For now, we'll just get the latest book as the recommended one.
    // This can be replaced with a more sophisticated recommendation logic later.
    const { data, error } = await supabase
      .from('books')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch recommended book.', 500);
    }

    return apiSuccess(data);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
