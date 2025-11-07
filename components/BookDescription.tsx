import { User, BookOpen, GraduationCap, Share2, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Book {
  category: string;
  summary_introduction: string;
  authors: string[];
  // Assuming we might add author_bio later
  author_bio?: string;
}

interface BookDescriptionProps {
  book: Book;
}

export function BookDescription({ book }: BookDescriptionProps) {
  // Placeholder for multiple categories if available
  const categories = ['Philosophy', 'Education'];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">

        <h2 className="text-2xl font-bold mb-4">What's it about?</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <Button key={cat} variant="outline" size="lg" className="bg-gray-100 dark:bg-gray-800 text-md">
              {/* Placeholder for category icons */}
              <BookOpen className="size-5 mr-2" /> 
              {cat}
            </Button>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p>{book.summary_introduction || 'Discourse on the Method (1637) presents a new approach...'}</p>
        </div>

        <h3 className="text-xl font-bold mb-3">About the author</h3>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-10">
          {book.author_bio || `René Descartes was a 17th-century French philosopher...`}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 text-blue-600 font-semibold">
            <button className="flex items-center"><Share2 className="w-5 h-5 mr-2" /> Share with friends</button>
            <button className="flex items-center"><ShoppingCart className="w-5 h-5 mr-2" /> Buy on Amazon</button>
        </div>
    </div>
  );
}
