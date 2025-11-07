import Image from 'next/image';
import { Star, Clock, FileText, Key, Bookmark, Play, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BookCoverImage } from './BookCoverImage';
import { Separator } from '@/components/ui/separator';
interface Book {
  title: string;
  authors: string[];
  short_description?: string;
  rating?: number;
  rating_count?: number;
  reading_time?: number;
  key_ideas_count?: number;
}

interface BookHeroProps {
  book: Book;
}

export function BookHero({ book }: BookHeroProps) {
  return (
    <section className=" py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Mobile Image */}
          <div className="md:hidden w-62 relative mx-auto">
           <BookCoverImage alt={book.title} />
          </div>

          {/* Text Content */}
          <div className="md:col-span-2 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{book.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{book.authors?.join(', ')}</p>
            <p className="text-lg mb-6">{book.short_description || 'A Radical Guide to Clear Thinking, Doubt, and Self-Discovery'}</p>
            
            {/* Desktop Info */}
            <div className="hidden md:flex flex-wrap justify-start gap-x-6 gap-y-2 text-md text-gray-500 mb-8">
              <div className="flex items-center"><Star className="w-5 h-5 mr-1.5" /> {book.rating || 4.3} ({book.rating_count || 94} ratings)</div>
              <div className="flex items-center"><Clock className="w-5 h-5 mr-1.5" /> {book.reading_time || 16} mins</div>
              <div className="flex items-center"><FileText className="w-5 h-5 mr-1.5" /> Audio & text</div>
              <div className="flex items-center"><Key className="w-5 h-5 mr-1.5" /> {book.key_ideas_count || 6} Key ideas</div>
            </div>
       
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
              <Button size="lg" className="w-full sm:w-auto text-md"><BookOpen className="size-5 mr-2" /> Read</Button>
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-md"><Play className="size-5 mr-2" /> Play</Button>
            </div>

            <Button variant="link" className="text-blue-600 font-semibold text-md">
              <Bookmark className="size-6" /> Save to Library
            </Button>
          </div>

          {/* Mobile Info */}
          <div className="md:hidden col-span-1 border-t border-gray-200 dark:border-gray-700 mt-6 pt-6">
             <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center"><Star className="w-4 h-4 mr-2" /> {book.rating || 4.3} ({book.rating_count || 94} ratings)</div>
                <div className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {book.reading_time || 16} mins</div>
                <div className="flex items-center"><FileText className="w-4 h-4 mr-2" /> Audio & text</div>
                <div className="flex items-center"><Key className="w-4 h-4 mr-2" /> {book.key_ideas_count || 6} Key ideas</div>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="hidden md:block w-64 relative justify-self-center">
            <BookCoverImage alt={book.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
