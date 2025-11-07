import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="mb-12">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
