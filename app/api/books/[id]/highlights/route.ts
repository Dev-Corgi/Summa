import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Get all highlights for a book by a user
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { id: bookId } = params;

  try {
    const { data, error } = await supabase
      .from('highlights')
      .select('*')
      .eq('user_id', user.id)
      .eq('book_id', bookId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch highlights.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}

// Create a new highlight
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { id: bookId } = params;
  const { chapterIndex, highlighted_text, note } = await request.json();

  if (!highlighted_text) {
    return apiError('Highlighted text is required.', 400);
  }

  try {
    const { data, error } = await supabase
      .from('highlights')
      .insert({
        user_id: user.id,
        book_id: bookId,
        chapter_index: chapterIndex,
        highlighted_text: highlighted_text,
        note: note,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to create highlight.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
