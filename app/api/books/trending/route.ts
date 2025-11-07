import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '10', 10);

  try {
    // Fetch books ordered by their view count from the book_stats table
    const { data, error } = await supabase
      .from('book_stats')
      .select('books(*)') // Select all columns from the joined books table
      .order('view_count', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch trending books.', 500);
    }

    // The result is an array of { books: { ... } }, so we map it to get the book objects
    const trendingBooks = data.map(item => item.books);

    return apiSuccess(trendingBooks);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
