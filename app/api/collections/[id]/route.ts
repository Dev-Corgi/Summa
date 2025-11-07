import { supabase } from '@/lib/supabase';
import { apiSuccess, apiError } from '@/lib/api-helpers';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return apiError('Collection ID is required.', 400);
  }

  try {
    // Fetch collection details
    const { data: collectionData, error: collectionError } = await supabase
      .from('collections')
      .select('*')
      .eq('id', id)
      .single();

    if (collectionError) {
      console.error('Supabase error fetching collection:', collectionError);
      return apiError('Failed to fetch collection details.', 500);
    }

    // Fetch books in the collection
    const { data: booksData, error: booksError } = await supabase
      .from('collection_items')
      .select('position, books(*)')
      .eq('collection_id', id)
      .order('position');

    if (booksError) {
      console.error('Supabase error fetching collection books:', booksError);
      return apiError('Failed to fetch books in collection.', 500);
    }

    // Combine the data into the expected structure
    const response = {
      collection: collectionData,
      books: booksData.map(item => ({ ...item.books, position: item.position }))
    };

    return apiSuccess(response);

  } catch (e: any) {
    console.error('Unexpected error:', e);
    return apiError(e.message || 'An unexpected error occurred.', 500);
  }
}
