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

async function getSearchResults(query: string): Promise<any[]> {
  // Mock data for demonstration, mixing collections and books
  // @ts-ignore
  const items: SearchResult[] = [];
  for (let i = 0; i < 16; i++) {
    if (i % 3 === 0) {
      items.push({
        type: 'book',
        id: `book-${i}`,
        title: `The Art of War ${i}`,
        authors: ['Sun Tzu'],
        short_description: 'Classic military strategy for politics, business, and everyday life.',
        reading_time: 11,
        rating: 4.4
      });
    } else {
      items.push({
        type: 'collection',
        id: `collection-${i}`,
        title: `Blinks for True Crime Fans ${i}`,
        description: 'For those of us who enjoy mystery, intrigue, and suspense.',
        item_count: 10 + i,
        image_type: 'stack',
      });
    }
  }
  return items;
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const results = await getSearchResults(searchParams.q || '');

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
