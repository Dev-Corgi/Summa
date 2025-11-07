'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SearchTabs() {
  const [showBooks, setShowBooks] = useState(true);
  const [showCollections, setShowCollections] = useState(true);

  const handleAllClick = () => {
    setShowBooks(true);
    setShowCollections(true);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        className={cn(
          'rounded-full',
          showBooks && showCollections ? 'bg-gray-200 dark:bg-gray-700' : ''
        )}
        onClick={handleAllClick}
      >
        All
      </Button>
      <Button
        variant={showBooks ? 'default' : 'outline'}
        className="rounded-full"
        onClick={() => setShowBooks(!showBooks)}
      >
        Books
      </Button>
      <Button
        variant={showCollections ? 'default' : 'outline'}
        className="rounded-full"
        onClick={() => setShowCollections(!showCollections)}
      >
        Collections
      </Button>
    </div>
  );
}
