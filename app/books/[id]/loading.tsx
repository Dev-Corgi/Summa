import { Skeleton } from '@/components/ui/skeleton';
import { BookCarouselSkeleton } from '@/components/BookCarousel';

function BookHeroSkeleton() {
    return (
        <section className="bg-gray-50 dark:bg-gray-800/50 py-8 md:py-12">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:hidden w-48 h-64 relative mx-auto"><Skeleton className="w-full h-full rounded-lg" /></div>
                    <div className="md:col-span-2 text-center md:text-left">
                        <Skeleton className="h-10 w-3/4 mb-2 mx-auto md:mx-0" />
                        <Skeleton className="h-6 w-1/2 mb-4 mx-auto md:mx-0" />
                        <Skeleton className="h-5 w-full mb-6" />
                        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-8">
                            <Skeleton className="h-5 w-24" /><Skeleton className="h-5 w-20" /><Skeleton className="h-5 w-24" /><Skeleton className="h-5 w-20" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-6">
                            <Skeleton className="h-12 w-full sm:w-32" /><Skeleton className="h-12 w-full sm:w-32" />
                        </div>
                        <Skeleton className="h-6 w-32 mx-auto md:mx-0" />
                    </div>
                    <div className="hidden md:block w-48 h-64 relative justify-self-center"><Skeleton className="w-full h-full rounded-lg" /></div>
                </div>
            </div>
        </section>
    );
}

function BookDescriptionSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
                <Skeleton className="h-8 w-1/3 mb-4" />
                <div className="flex flex-wrap gap-2 mb-6">
                    <Skeleton className="h-10 w-32" /><Skeleton className="h-10 w-28" /><Skeleton className="h-10 w-36" />
                </div>
                <div className="space-y-2 mb-8">
                    <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" />
                </div>
                <Skeleton className="h-6 w-1/4 mb-3" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-5/6" />
                </div>
            </div>
        </div>
    );
}

export default function Loading() {
  return (
    <div className="space-y-12">
      <BookHeroSkeleton />
      <BookDescriptionSkeleton />
      <div className="container mx-auto px-4">
        <BookCarouselSkeleton />
        <BookCarouselSkeleton />
      </div>
    </div>
  );
}
