import { NextResponse } from 'next/server';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    total: number;
  };
}

export function apiSuccess<T>(data: T, pagination?: ApiResponse<T>['pagination']): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, pagination });
}

export function apiError(message: string, status: number = 500): NextResponse<ApiResponse<null>> {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function getSupabaseUser(request: Request) {
    // This is a placeholder. In a real app, you'd get the user from the request headers
    // or by using Supabase's `createServerComponentClient` or similar.
    // For now, we'll simulate getting a user ID.
    const authHeader = request.headers.get('Authorization');
    if (authHeader && authHeader.startsWith('Bearer '))
    {
        // In a real scenario, you would validate this token.
        // For this example, we'll just extract a dummy user ID.
        const token = authHeader.split(' ')[1];
        // Let's assume the token is the user ID for simplicity.
        return { id: token };
    }
    return null;
}
