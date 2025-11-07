import { Skeleton } from '@/components/ui/skeleton';
import { CollectionsCarouselSkeleton } from '@/components/CollectionsCarousel';

function CollectionHeroSkeleton() {
    return (
        <section className="bg-amber-50 dark:bg-amber-900/20 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="w-48 h-48 relative mx-auto md:justify-self-center"><Skeleton className="w-full h-full rounded-lg" /></div>
                    <div className="md:col-span-2 text-center md:text-left space-y-4">
                        <Skeleton className="h-5 w-1/3 mx-auto md:mx-0" />
                        <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-1/2 mx-auto md:mx-0" />
                        <Skeleton className="h-12 w-full sm:w-48" />
                    </div>
                </div>
            </div>
        </section>
    );
}

function CollectionBookGridSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Mobile Skeleton */}
            <div className="md:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start space-x-4 py-4">
                        <Skeleton className="w-16 h-24 rounded-md flex-shrink-0" />
                        <div className="flex-grow space-y-2">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-1/4" />
                        </div>
                    </div>
                ))}
            </div>
            {/* Desktop Skeleton */}
            <div className="hidden md:grid grid-cols-4 gap-x-6 gap-y-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i}>
                        <Skeleton className="w-full h-48 mb-2 rounded-md" />
                        <Skeleton className="h-5 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4 mb-2" />
                        <Skeleton className="h-10 w-full mb-2" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Loading() {
  return (
    <div className="space-y-8">
      <CollectionHeroSkeleton />
      <CollectionBookGridSkeleton />
      <div className="container mx-auto px-4">
        <CollectionsCarouselSkeleton />
      </div>
    </div>
  );
}
