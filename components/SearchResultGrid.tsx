import { CollectionCard } from './CollectionCard';
import { BookCard } from './BookCard';

// Define types for search results
interface CollectionResult {
  type: 'collection';
  id: string;
  title: string;
  description: string;
  item_count: number;
  image_type: 'stack' | 'single';
}

interface BookResult {
  type: 'book';
  id: string;
  title: string;
  authors: string[];
  short_description?: string;
  reading_time?: number;
  rating?: number;
}

export type SearchResult = CollectionResult | BookResult;

interface SearchResultGridProps {
  results: SearchResult[];
}

export function SearchResultGrid({ results }: SearchResultGridProps) {
  if (!results || results.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {results.map((item) => {
        if (item.type === 'collection') {
          return (
            
          <CollectionCard key={item.id} collection={item} />
        );
        }
        if (item.type === 'book') {
          const bookForCard = { ...item, authors: item.authors || [] };
          return <BookCard key={item.id} book={bookForCard} />;
        }
        return null;
      })}
    </div>
  );
}
