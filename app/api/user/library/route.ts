import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Get user's library
export async function GET(request: NextRequest) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  try {
    const { data, error } = await supabase
      .from('user_library')
      .select('*, summaries(*)') // Join with books table to get book details
      .eq('user_id', user.id)
      .order('added_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch user library.', 500);
    }

    return apiSuccess(data);
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}

// Add a book to user's library
export async function POST(request: NextRequest) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { bookId } = await request.json();

  if (!bookId) {
    return apiError('Book ID is required.', 400);
  }

  try {
    const { data, error } = await supabase
      .from('user_library')
      .insert({ user_id: user.id, book_id: bookId })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '23505') { // Unique constraint violation
        return apiError('Book is already in the library.', 409);
      }
      return apiError('Failed to add book to library.', 500);
    }

    // Also increment the save_count for the book
    supabase.rpc('increment_save_count', { book_id_param: bookId }).then();

    return apiSuccess(data, {});
  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
