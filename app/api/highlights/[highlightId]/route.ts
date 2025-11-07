import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError, getSupabaseUser } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// Delete a highlight
export async function DELETE(request: NextRequest, { params }: { params: { highlightId: string } }) {
  const user = getSupabaseUser(request);
  if (!user) {
    return apiError('Unauthorized.', 401);
  }

  const { highlightId } = params;

  if (!highlightId) {
    return apiError('Highlight ID is required.', 400);
  }

  try {
    // The RLS policy ensures users can only delete their own highlights.
    const { error } = await supabase
      .from('highlights')
      .delete()
      .eq('id', highlightId)
      .eq('user_id', user.id); // Double-check ownership

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to delete highlight.', 500);
    }

    return apiSuccess({ message: 'Highlight deleted successfully.' });

  } catch (e: any) {
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
