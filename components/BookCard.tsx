import { Clock, Star } from "lucide-react";
import Link from 'next/link';
import { BookCoverImage } from "./BookCoverImage";

interface Book {
  id: string;
  title: string;
  authors: string[];
  short_description?: string;
  reading_time?: number;
  rating?: number;
  thumbnail_url?: string | null;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/books/${book.id}`} className="block p-2 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="w-full max-w-[180px]">
        <div className="relative mx-auto aspect-square mb-2">
          <BookCoverImage alt={book.title} thumbnailUrl={book.thumbnail_url} />
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-bold truncate">{book.title}</h3>
          <p className="text-sm text-gray-500 truncate">
            {book.authors?.join(", ")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
            {book.short_description || "A radical guide to clear thinking."}
          </p>
          <div className="flex items-center justify-center md:justify-start text-xs text-gray-500 mt-2">
            <div className="flex items-center mr-4">
              <Clock className="w-4 h-4 mr-1" />
              <span>{book.reading_time || 16} min</span>
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1" />
              <span>{book.rating || 4.3}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
