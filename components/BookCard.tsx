import { Clock, Star } from "lucide-react";
import { BookCoverImage } from "./BookCoverImage";
interface Book {
  id: string;
  title: string;
  authors: string[];
  // This is a placeholder for a short description if available
  short_description?: string;
  // These would come from book_stats or be calculated
  reading_time?: number;
  rating?: number;
}

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <div className="p-2">
      <div className="w-full max-w-[180px]">
        <div className="relative mx-auto aspect-square mb-2">
          {/* This is a simplified representation. A real implementation might use different images or styles based on props. */}
          <BookCoverImage alt={book.title} />
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-bold truncate">{book.title}</h3>
          <p className="text-sm text-gray-500 truncate">
            {book.authors?.join(", ")}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate h-10">
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
    </div>
  );
}
