import { BookCarouselSkeleton } from '@/components/BookCarousel';
import { CategoriesGridSkeleton } from '@/components/CategoriesGrid';
import { CollectionsCarouselSkeleton } from '@/components/CollectionsCarousel';

export default function Loading() {
  return (
    <div className="space-y-12">
      <BookCarouselSkeleton />
      <CategoriesGridSkeleton />
      <BookCarouselSkeleton />
      <CollectionsCarouselSkeleton />
    </div>
  );
}
