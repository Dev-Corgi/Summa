import { PickUpSectionSkeleton } from '@/components/PickUpSection';
import { BookCarouselSkeleton } from '@/components/BookCarousel';

export default function Loading() {
  return (
    <div className="space-y-12">
      <PickUpSectionSkeleton />
      <BookCarouselSkeleton />
      <BookCarouselSkeleton />
    </div>
  );
}
