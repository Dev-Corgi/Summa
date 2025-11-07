'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SearchTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') || 'all';

  const createQueryString = useCallback(
    (paramsToUpdate: { [key: string]: string }) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [name, value] of Object.entries(paramsToUpdate)) {
        params.set(name, value);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleFilterClick = (filter: 'books' | 'collections') => {
    let showBooks = type === 'all' || type === 'books';
    let showCollections = type === 'all' || type === 'collections';

    if (filter === 'books') {
      showBooks = !showBooks;
    } else if (filter === 'collections') {
      showCollections = !showCollections;
    }

    let newType: 'all' | 'books' | 'collections';
    if (showBooks && showCollections) {
      newType = 'all';
    } else if (showBooks) {
      newType = 'books';
    } else if (showCollections) {
      newType = 'collections';
    } else {
      // If both are toggled off, default to 'all'
      newType = 'all';
    }

    router.push(`${pathname}?${createQueryString({ type: newType })}`);
  };

  const handleAllClick = () => {
    router.push(`${pathname}?${createQueryString({ type: 'all' })}`);
  };

  const showBooks = type === 'all' || type === 'books';
  const showCollections = type === 'all' || type === 'collections';

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        className={cn(
          'rounded-full',
          type === 'all' ? 'bg-gray-200 dark:bg-gray-700' : ''
        )}
        onClick={handleAllClick}
      >
        All
      </Button>
      <Button
        variant={showBooks ? 'default' : 'outline'}
        className="rounded-full"
        onClick={() => handleFilterClick('books')}
      >
        Books
      </Button>
      <Button
        variant={showCollections ? 'default' : 'outline'}
        className="rounded-full"
        onClick={() => handleFilterClick('collections')}
      >
        Collections
      </Button>
    </div>
  );
}
