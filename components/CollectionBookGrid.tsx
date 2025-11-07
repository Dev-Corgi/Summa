import { BookCard } from './BookCard';
import { BookCoverImage } from './BookCoverImage';
import { Clock, Star } from 'lucide-react';

interface Book {
  id: string;
  title: string;
  authors: string[];
  short_description?: string;
  reading_time?: number;
  rating?: number;
}

interface CollectionBookGridProps {
  books: Book[];
}


export function CollectionBookGrid({ books }: CollectionBookGridProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
            <h2 className="text-xl font-bold">What's it about?</h2>
      <p className="text-gray-500 mb-8">{"Explore insights at the cutting edge of technology"}</p>
      {/* Mobile: List View */}
      <div className="xl:hidden flex flex-col">
        {books.map((book) => (
          <div key={book.id} className="flex items-start space-x-4 py-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
            <div className="w-20 flex-shrink-0">
              <BookCoverImage alt={book.title} />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold mb-1">{book.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{book.authors.join(', ')}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{book.short_description}</p>
              <div className="flex items-center text-xs text-gray-500">
                <div className="flex items-center mr-4">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{book.reading_time} min</span>
                </div>
                <div className="flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    <span>{book.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Flex View with fixed width */}
      <div className="hidden xl:grid xl:grid-cols-4 gap-x-6 gap-y-8 max-w-4xl">
        {books.map((book) => (
          <div key={book.id} className="w-50 mx-auto">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}
