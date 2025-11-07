'use client';

import { PlayCircle, History } from 'lucide-react';
import { BookCoverImage } from './BookCoverImage';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';

// Define a type for the component's props
interface ReadingProgress {
  chapter_index: number;
  books: {
    title: string;
    authors: string[];
    summary_chapters: any[]; // Assuming chapters have a structure
  };
}

interface PickUpSectionProps {
  latestProgress: ReadingProgress | null;
}

export function PickUpSectionSkeleton() {
  return (
    <section className="mb-12">
      <Skeleton className="h-8 w-1/2 mb-4" />
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
        <Skeleton className="h-24 w-24 rounded-md flex-shrink-0" />
        <div className="space-y-2 flex-grow">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex items-center">
            <Skeleton className="h-2 w-full mr-4" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function PickUpSection({ latestProgress }: PickUpSectionProps) {
  if (!latestProgress || !latestProgress.books) {
    return null; // Don't render if there's no progress
  }

  const { books, chapter_index } = latestProgress;
  const totalChapters = books.summary_chapters?.length || 1;
  const progressPercentage = (chapter_index / totalChapters) * 100;

  return (
    <section className="mb-12">
      <div className="flex items-center mb-4">
        <div className='p-3 bg-gray-100 mr-3 rounded-sm'>
        <History className="w-7 h-7 text-gray-600" />
        </div>
        <h2 className="text-xl font-bold">Pick up where you left off</h2>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-w-xl">
        <div className="flex items-center space-x-4">
          <div className='relative w-36'>
          <BookCoverImage alt={books.title} />
          </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-md truncate">{books.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {books.authors?.join(', ')}
                </p>
                <div className="flex items-center pt-2">
                    <Progress value={progressPercentage} className="flex-1 h-2 mr-4" />
                    <button className="p-2 rounded-full bg-black text-white dark:bg-white dark:text-black flex-shrink-0">
                        <PlayCircle className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
