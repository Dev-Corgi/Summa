import { PickUpSection } from '@/components/PickUpSection';
import { BookCarousel } from '@/components/BookCarousel';
import { CollectionsCarousel, type Collection } from '@/components/CollectionsCarousel';

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

async function getSavedBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/library`, {
      next: { revalidate: 0 } // Always fetch fresh data for user-specific content
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch saved books');
    }
    
    const data = await res.json();
    // Map the response to match the expected format
    return (data.data || []).map((item: any) => ({
      id: item.book_id,
      ...item.books
    }));
  } catch (error) {
    console.error('Failed to fetch saved books:', error);
    return [];
  }
}

async function getCollections(): Promise<Collection[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/collections`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch collections');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return [];
  }
}

async function getFinishedBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/user/progress?completed=true`, {
      next: { revalidate: 0 } // Always fetch fresh data for user-specific content
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch finished books');
    }
    
    const data = await res.json();
    // Map the response to match the expected format
    return (data.data || []).map((item: any) => ({
      id: item.book_id,
      ...item.books
    }));
  } catch (error) {
    console.error('Failed to fetch finished books:', error);
    return [];
  }
}

export default async function LibraryPage() {
  const savedBooks = await getSavedBooks();
  const finishedBooks = await getFinishedBooks();
  const collections = await getCollections();

  return (
    <div className='py-6  md:py-16 space-y-24'>
      <PickUpSection />
      <BookCarousel title="Saved" subtitle={`${savedBooks.length} items`} books={savedBooks} />
      <BookCarousel title="Finished" subtitle={`${finishedBooks.length} items`} books={finishedBooks} />
      <CollectionsCarousel title="My Collections" subtitle={`${collections.length} collections`} collections={collections} />
    </div>
  );
}
