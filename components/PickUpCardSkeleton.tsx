import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PickUpCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-28 w-24 rounded-md flex-shrink-0" />
          <div className="space-y-3 flex-grow">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex items-center pt-2">
              <Skeleton className="h-1.5 w-full mr-4" />
              <Skeleton className="h-9 w-9 rounded-full" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
