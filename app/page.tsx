

import { PickUpSection } from '@/components/PickUpSection';
import { RecommendedSection } from '@/components/RecommendedSection';
import { BookCarousel } from '@/components/BookCarousel';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

// Fetch data on the server
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getRecommendedBook() {
  try {
    const res = await fetch(`${API_URL}/api/books/recommended`, { cache: 'no-store' });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch recommended book:', error);
    return null;
  }
}

async function getRecommendedBooks() {
  try {
    const res = await fetch(`${API_URL}/api/books?limit=10`, { cache: 'no-store' });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch recommended books:', error);
    return [];
  }
}

async function getCollections() {
  try {
    const res = await fetch(`${API_URL}/api/collections`, { cache: 'no-store' });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch collections:', error);
    return [];
  }
}

export default async function Home() {
  const recommendedBook = await getRecommendedBook();
  const recommendedBooks = await getRecommendedBooks();
  const collections = await getCollections();

  return (
    <div className='py-6  md:py-16 space-y-24'>
      <PickUpSection />
      <RecommendedSection recommendedBook={recommendedBook} />
      <BookCarousel 
        title="Recommended for you"
        subtitle="We think you'll like these"
        books={recommendedBooks} 
      />
      <CollectionsCarousel 
        title="Collections for you"
        subtitle="Based on your past preferences"
        collections={collections} 
      />
      {/* Other sections of the main page can be added here */}
    </div>
  );
}





