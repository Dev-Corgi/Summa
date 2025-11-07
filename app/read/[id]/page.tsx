import { ChapterContent } from '@/components/ChapterContent';
import Link from 'next/link';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getBookContent(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/books/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch book content:', error);
    return null;
  }
}

export default async function ReadPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookContent(id);

  if (!book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Sorry, we couldn't find the book you were looking for.</p>
        <Link href="/">
          <Button variant="outline">Go back to Home</Button>
        </Link>
      </div>
    );
  }

  if (!book.chapters) {
    return <div>Book content not found.</div>;
  }

  // The 'chapters' field from Supabase might be a JSON string, so we need to parse it.
  const parsedChapters = typeof book.chapters === 'string' 
    ? JSON.parse(book.chapters) 
    : book.chapters;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
            <Link href={`/books/${book.id}`} className="flex items-center text-md text-blue-600 font-semibold hover:underline">
                <ChevronLeft className="size-6 mr-1" />
                <span>{book.title}</span>
            </Link>
            <Button variant="ghost" size="icon-lg">
                <Bookmark className="size-6" />
            </Button>
        </div>
      <ChapterContent chapters={parsedChapters} />
    </div>
  );
}

