import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const type = searchParams.get('type') || 'all'; // 'all', 'books', 'collections'
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  if (!query) {
    return apiError('Search query is required.', 400);
  }

  try {
    const results: any = {
      books: [],
      collections: []
    };

    // Search books using full-text search
    if (type === 'all' || type === 'books') {
      const { data: booksData, error: booksError } = await supabase
        .from('books')
        .select('id, title, authors, short_description, thumbnail_url')
        .textSearch('fts', query, {
          type: 'websearch',
          config: 'english'
        })
        .limit(limit);

      if (booksError) {
        console.error('Books search error:', booksError);
      } else {
        results.books = booksData || [];
      }
    }

    // Search collections using full-text search
    if (type === 'all' || type === 'collections') {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('id, title, short_description, description, image_type, collection_items(count)')
        .textSearch('fts', query, {
          type: 'websearch',
          config: 'english'
        })
        .limit(limit);

      if (collectionsError) {
        console.error('Collections search error:', collectionsError);
      } else {
        results.collections = (collectionsData || []).map(c => ({
          ...c,
          item_count: c.collection_items[0]?.count || 0,
          collection_items: undefined,
        }));
      }
    }

    return apiSuccess(results);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
