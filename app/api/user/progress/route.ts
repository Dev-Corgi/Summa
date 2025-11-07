import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Get user's reading progress, with optional filtering
export async function GET(request: NextRequest) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { searchParams } = new URL(request.url);
  const completed = searchParams.get('completed');

  try {
    let query = supabase
      .from('reading_progress')
      .select('*, books(*)')
      .eq('user_id', user.id);

    if (completed) {
      query = query.eq('completed', completed === 'true');
    }

    const { data, error } = await query.order('last_read_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch reading progress.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
