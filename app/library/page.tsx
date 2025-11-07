import { PickUpSection } from '@/components/PickUpSection';
import { BookCarousel } from '@/components/BookCarousel';
import { CollectionsCarousel, type Collection } from '@/components/CollectionsCarousel';

async function getLatestProgress() {
  // Mock data for demonstration
  return {
    chapter_index: 3,
    books: {
      title: 'How to Make Your Brain Your Best Friend',
      authors: ['Rachel Barr'],
      summary_chapters: new Array(10),
    },
  };
}

async function getSavedBooks() {
  // Mock data for demonstration
  return [
    { id: '1', title: 'Brain', authors: ['Elizabeth R. Ricker'], short_description: 'An Owner\'s Guide' },
  ];
}

async function getCollections(): Promise<Collection[]> {
  // Mock data for demonstration
  return [
    { id: '1', title: 'AI Must-Reads in 2025', description: 'Explore insights at the cutting edge of technology', item_count: 8, image_type: 'stack' },
    { id: '2', title: 'Bestsellers Everyone\'s Reading', description: 'Stay current with chart-topping ideas and insights', item_count: 7, image_type: 'stack' },
  ];
}

async function getFinishedBooks() {
  // Mock data for demonstration
  return [
    { id: '1', title: 'Burn', authors: ['Herman Pontzer'], short_description: 'The Misunderstood Science of Metabolism' },
  ];
}

export default async function LibraryPage() {
  const latestProgress = await getLatestProgress();
  const savedBooks = await getSavedBooks();
  const finishedBooks = await getFinishedBooks();
  const collections = await getCollections();

  return (
    <div className='py-6  md:py-16 space-y-24'>
      <PickUpSection latestProgress={latestProgress} />
      <BookCarousel title="Saved" subtitle={`${savedBooks.length} items`} books={savedBooks} />
      <BookCarousel title="Finished" subtitle={`${finishedBooks.length} items`} books={finishedBooks} />
      <CollectionsCarousel title="My Collections" subtitle={`${collections.length} collections`} collections={collections} />
    </div>
  );
}
