import { Button } from '@/components/ui/button';
import { Share2, BookOpen } from 'lucide-react';

interface CollectionDescriptionProps {
  collection: {
    categories: string[];
    description: string;
  };
}

export function CollectionDescription({ collection }: CollectionDescriptionProps) {
  const { categories, description } = collection;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 ">
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">What's it about?</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Button key={cat} variant="outline" size="lg" className="bg-gray-100 dark:bg-gray-800 text-md">
              <BookOpen className="size-5 mr-2" /> 
              {cat}
            </Button>
          ))}
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          {description}
        </p>
        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
            <button className="flex items-center text-blue-600 font-semibold text-md">
                <Share2 className="w-5 h-5 mr-2" /> Share with friends
            </button>
        </div>
      </div>
    </div>
  );
}
