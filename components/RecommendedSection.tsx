import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  authors: string[];
  short_description?: string;
  reading_time?: number;
  thumbnail_url?: string | null;
}

interface RecommendedSectionProps {
  recommendedBook: Book | null;
}

export function RecommendedSection({ recommendedBook }: RecommendedSectionProps) {
  if (!recommendedBook) {
    return null; // Don't render if there's no book
  }

  return (
    <section className="mb-12 w-full">
      <h2 className="text-xl font-bold mb-4">Selected just for you</h2>
      <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg max-w-3xl">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0 ">
            <p className="text-md text-gray-700 dark:text-gray-300">
              {recommendedBook.short_description}
            </p>
          </div>

          <div className="hidden md:block h-24 border-l border-gray-300 dark:border-gray-600"></div>

          <Link href={`/books/${recommendedBook.id}`} className="flex items-center w-full md:w-auto hover:bg-amber-100/50 dark:hover:bg-amber-800/20 p-4 -m-4 rounded-md transition-colors">
            <div className="w-24 h-36 relative mr-4 shrink-0">
              <Image
                src={recommendedBook.thumbnail_url || "/bookcover.png"}
                alt={recommendedBook.title}
                fill
                className="object-cover rounded-md shadow-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{recommendedBook.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {recommendedBook.authors?.join(', ')}
              </p>
              <div className="flex items-center text-md font-semibold text-gray-800 dark:text-gray-200">
                <div className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mr-3">
                    <PlayCircle className="w-5 h-5" />
                </div>
                <span>{recommendedBook.reading_time} min</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
