'use client';

import { useState, useEffect } from 'react';
import { History } from 'lucide-react';
import { PickUpCard, PickUpCardData } from './PickUpCard';
import { PickUpCardSkeleton } from './PickUpCardSkeleton';

export function PickUpSection() {
  const [books, setBooks] = useState<PickUpCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPickupBooks() {
      try {
        const response = await fetch('/api/user/pickup');
        if (!response.ok) {
          throw new Error('Failed to fetch pickup books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPickupBooks();
  }, []);

  if (isLoading) {
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

  if (books.length === 0) {
    return null; // Don't render the section if there are no books
  }

  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <div className='p-3 bg-muted mr-3 rounded-sm'>
          <History className="w-7 h-7 text-muted-foreground" />
        </div>
        <h2 className="text-xl font-bold">Pick up where you left off</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <PickUpCard key={book.book_id} book={book} />
        ))}
      </div>
    </section>
  );
}

