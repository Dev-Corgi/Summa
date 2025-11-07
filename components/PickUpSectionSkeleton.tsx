import { History } from 'lucide-react';
import { PickUpCardSkeleton } from './PickUpCardSkeleton';

export function PickUpSectionSkeleton() {
  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <div className='p-3 bg-muted mr-3 rounded-sm'>
          <History className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">Pick up where you left off</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <PickUpCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
