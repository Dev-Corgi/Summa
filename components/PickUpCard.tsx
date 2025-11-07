import { PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { BookCoverImage } from './BookCoverImage';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export interface PickUpCardData {
  book_id: string;
  title: string;
  authors: string[];
  chapters: any[];
  chapter_index: number;
  thumbnail_url?: string | null;
}

interface PickUpCardProps {
  book: PickUpCardData;
}

export function PickUpCard({ book }: PickUpCardProps) {
  const totalChapters = book.chapters?.length || 1;
  const progressPercentage = (book.chapter_index / totalChapters) * 100;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Link href={`/books/${book.book_id}`} className="flex items-center space-x-4 flex-1 min-w-0 hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors">
            <div className="relative w-24 flex-shrink-0">
              <BookCoverImage alt={book.title} thumbnailUrl={book.thumbnail_url} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-md truncate">{book.title}</h3>
              <p className="text-sm text-muted-foreground truncate">
                {book.authors?.join(', ')}
              </p>
              <div className="flex items-center pt-3">
                <Progress value={progressPercentage} className="flex-1 h-1.5" />
              </div>
            </div>
          </Link>
          <button className="p-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0 ml-4">
            <PlayCircle className="w-7 h-7" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
