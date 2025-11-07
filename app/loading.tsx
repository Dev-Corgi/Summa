import { PickUpSectionSkeleton } from '@/components/PickUpSectionSkeleton';
import { BookCarouselSkeleton } from '@/components/BookCarousel';
import { CollectionsCarouselSkeleton } from '@/components/CollectionsCarousel';

export default function Loading() {
  return (
    <div className="space-y-12">
      <PickUpSectionSkeleton />
      {/* Placeholder for RecommendedSection skeleton if it were complex */}
      <BookCarouselSkeleton />
      <CollectionsCarouselSkeleton />
    </div>
  );
}
