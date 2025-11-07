import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Get reading progress for a book
export async function GET(request: NextRequest, { params }: { params: { bookId: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { bookId } = params;

  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .single();

    if (error && error.code !== 'PGRST116') { // Ignore 'not found' error
      console.error('Supabase error:', error);
      return apiError('Failed to fetch reading progress.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}

// Update reading progress for a book
export async function POST(request: NextRequest, { params }: { params: { bookId: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { bookId } = params;
  const { chapterIndex, completed, readingTimeSeconds } = await request.json();

  try {
    const { data, error } = await supabase
      .from('reading_progress')
      .upsert({
        user_id: user.id,
        book_id: bookId,
        chapter_index: chapterIndex,
        completed: completed,
        last_read_at: new Date().toISOString(),
        reading_time_seconds: readingTimeSeconds
      }, { onConflict: 'user_id, book_id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to update reading progress.', 500);
    }

    if (completed) {
        supabase.rpc('increment_completion_count', { book_id_param: bookId }).then();
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
