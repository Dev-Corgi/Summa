import { SearchTabs } from '@/components/SearchTabs';
import { SearchResultGrid } from '@/components/SearchResultGrid';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

// Get the base URL for server-side fetches
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  return 'http://localhost:3000';
}

const API_BASE_URL = getBaseUrl();

async function getSearchResults(query: string, type: string = 'all'): Promise<any[]> {
  if (!query) {
    return [];
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/books/search?q=${encodeURIComponent(query)}&type=${type}`, {
      next: { revalidate: 0 } // Don't cache search results
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch search results');
    }
    
    const data = await res.json();
    const results = data.data || { books: [], collections: [] };
    
    // Combine books and collections into a single array with type markers
    const items: any[] = [];
    
    results.books.forEach((book: any) => {
      items.push({
        type: 'book',
        ...book
      });
    });
    
    results.collections.forEach((collection: any) => {
      items.push({
        type: 'collection',
        ...collection
      });
    });
    
    return items;
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    return [];
  }
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; type?: string }> }) {
  const params = await searchParams;
  const results = await getSearchResults(params.q || '', params.type || 'all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
            <div className='p-2 bg-gray-100 dark:bg-gray-800 mr-3 rounded-md'>
                <Search className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </div>
            <h1 className="text-2xl font-bold">Search Results</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <SearchTabs />
            <div className="mt-4 md:mt-0">
                <Select>
                    <SelectTrigger className="w-full md:w-auto border-0 bg-transparent font-semibold">
                        Sort by: <SelectValue placeholder="Relevance" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
      <SearchResultGrid results={results} />
    </div>
  );
}
