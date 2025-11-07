import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Get the most recent reading progress for a user
export async function GET(request: NextRequest) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*, books(*)') // Join with books to get details
      .eq('user_id', user.id)
      .order('last_read_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
      console.error('Supabase error:', error);
      return apiError('Failed to fetch latest reading progress.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
