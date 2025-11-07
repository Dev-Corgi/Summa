import Image from 'next/image';
import { PlayCircle } from 'lucide-react';

// Define a type for the book prop
interface Book {
  title: string;
  authors: string[];
  // Add other book properties as needed
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
          {/* Caption - On mobile, this will be on top */}
          <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0 ">
            <p className="text-md text-gray-700 dark:text-gray-300">
              366 Meditations on Power, Seduction, Mastery, Strategy, and Human Nature
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-24 border-l border-gray-300 dark:border-gray-600"></div>

          {/* Book Info */}
          <div className="flex items-center w-full md:w-auto ">
            <div className="w-24 h-36 relative mr-4 flex-shrink-0">
              <Image
                src={"/bookcover.png"}
                alt={recommendedBook.title}
                layout="fill"
                objectFit="cover"
                className="rounded-md shadow-lg"
              />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{recommendedBook.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {recommendedBook.authors?.join(', ')}
              </p>
              <div className="flex items-center text-md font-semibold text-gray-800 dark:text-gray-200">
                <button className="w-8 h-8 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mr-3">
                    <PlayCircle className="w-5 h-5" />
                </button>
                <span>30 min</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
