import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Delete a book from user's library
export async function DELETE(request: NextRequest, { params }: { params: { bookId: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { bookId } = params;

  if (!bookId) {
    return apiError('Book ID is required.', 400);
  }

  try {
    const { error } = await supabase
      .from('user_library')
      .delete()
      .eq('user_id', user.id)
      .eq('book_id', bookId);

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to delete book from library.', 500);
    }

    // Optionally, you could decrement the save_count here, but it might not be necessary.

    return apiSuccess({ message: 'Book removed from library successfully.' });

  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
