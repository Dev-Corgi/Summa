import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {

  try {
    // const { data: { user }, error: userError } = await supabase.auth.getUser();

    // if (userError || !user) {
    //   return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
    //     status: 401,
    //     headers: { 'Content-Type': 'application/json' },
    //   });
    // }

    // Hardcode user ID for testing without login
    const testUserId = '00000000-0000-0000-0000-000000000001';
    const { data, error } = await supabase.rpc('get_recent_unfinished_books', {
      p_user_id: testUserId
    } as any); // Type assertion to bypass the type checking

    if (error) {
      console.error('Error fetching pickup books:', error);
      return new NextResponse(JSON.stringify({ error: 'Failed to fetch data', details: error }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return NextResponse.json(data);
  } catch (e) {
    console.error('An unexpected error occurred:', e);
    return new NextResponse(JSON.stringify({ error: 'An unexpected error occurred' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
