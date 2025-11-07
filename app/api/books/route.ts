import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const category = searchParams.get('category');
  const sort = searchParams.get('sort') || 'created_at';
  const order = searchParams.get('order') || 'desc';

  const startIndex = (page - 1) * limit;

  try {
    let query = supabase
      .from('summaries')
      .select('*', { count: 'exact' })
      .range(startIndex, startIndex + limit - 1);

    if (category) {
      query = query.eq('category', category);
    }

    if (sort) {
      query = query.order(sort, { ascending: order === 'asc' });
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return apiError('Failed to fetch books.', 500);
    }

    const total = count || 0;
    const totalPages = Math.ceil(total / limit);

    return apiSuccess(data, {
      page,
      limit,
      totalPages,
      total,
    });

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
