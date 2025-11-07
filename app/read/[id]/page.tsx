import { ChapterContent } from '@/components/ChapterContent';
import Link from 'next/link';
import { ChevronLeft, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';

async function getBookContent(id: string) {
  try {
    // Mock data for demonstration
    const chapters = Array.from({ length: 8 }, (_, i) => ({
      title: `Key idea ${i + 1}`,
      content: `This is the detailed content for key idea ${i + 1}. It explains the core concepts and provides examples and insights. The text is structured to be easily readable and digestible.\nThis paragraph continues the explanation, delving deeper into the nuances of the topic. It aims to provide a comprehensive understanding within a short amount of time.`
    }));

    return {
      id: id,
      title: 'Discourse on Method',
      summary_chapters: chapters,
    };
  } catch (error) {
    console.error('Failed to fetch book content:', error);
    return null;
  }
}

export default async function ReadPage({ params }: { params: { id: string } }) {
  const book = await getBookContent(params.id);

  if (!book || !book.summary_chapters) {
    return <div>Book content not found.</div>;
  }

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
      <ChapterContent chapters={book.summary_chapters} />
    </div>
  );
}

