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
    const { data, error } = await supabase
      .from('summaries')
      .select('id, title, authors, category, summary_introduction, summary_chapters')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === 'PGRST116') {
        return apiError('Book not found.', 404);
      }
      return apiError('Failed to fetch book preview.', 500);
    }

    if (!data) {
      return apiError('Book not found.', 404);
    }

    // Slice the chapters to return only the first two for the preview
    const previewChapters = Array.isArray(data.summary_chapters) 
      ? data.summary_chapters.slice(0, 2) 
      : [];

    const previewData = {
      ...data,
      summary_chapters: previewChapters,
    };

    return apiSuccess(previewData);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
