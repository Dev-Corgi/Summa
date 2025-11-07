import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="mb-4">
            <Skeleton className="h-10 w-full md:w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
                <div key={i}>
                    <Skeleton className="aspect-square w-full mb-2 rounded-md" />
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                </div>
            ))}
        </div>
    </div>
  );
}
