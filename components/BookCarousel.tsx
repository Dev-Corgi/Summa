'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { BookCard } from './BookCard';
import { Skeleton } from './ui/skeleton';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Define a type for the book prop
interface Book {
    id: string;
    title: string;
    authors: string[];
}

interface BookCarouselProps {
  title: string;
  subtitle?: string;
  books: Book[];
}

export function BookCarouselSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1/2 md:w-1/3 lg:w-1/5 flex-shrink-0">
            <Skeleton className="aspect-[3/4] w-full mb-2 rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function BookCarousel({ title, subtitle, books }: BookCarouselProps) {
  if (!books || books.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      {subtitle && <p className="text-gray-500 mb-8">{subtitle}</p>}
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {books.map((book) => (
            <CarouselItem key={book.id} className="basis-50 ml-6">
              <BookCard book={book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
  className="hidden md:flex hover:bg-transparent" 
  variant="ghost"
  icon={<ChevronLeft className="size-10" />} 
/>
<CarouselNext 
  className="hidden md:flex hover:bg-transparent" 
  variant="ghost"
  icon={<ChevronRight className="size-10" />}
/>
      </Carousel>
    </section>
  );
}
