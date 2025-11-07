'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { CollectionCard } from './CollectionCard';
import { Skeleton } from './ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface Collection {
    id: string;
    title: string;
    description: string;
    item_count: number;
    image_type: 'stack' | 'single';
    thumbnail_url?: string | null;
}

interface CollectionsCarouselProps {
  title: string;
  subtitle?: string;
  collections: Collection[];
}

export function CollectionsCarouselSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1/2 md:w-1/3 lg:w-1/5 shrink-0">
            <Skeleton className="aspect-square w-full mb-2 rounded-md" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mt-1" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function CollectionsCarousel({ title, subtitle, collections }: CollectionsCarouselProps) {
  if (!collections || collections.length === 0) {
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
          {collections.map((collection) => (
            <CarouselItem key={collection.id} className="basis-50 ml-6">
              <CollectionCard collection={collection} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
