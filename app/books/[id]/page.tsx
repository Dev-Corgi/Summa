import { BookHero } from '@/components/BookHero';
import { BookDescription } from '@/components/BookDescription';
import { BookCarousel } from '@/components/BookCarousel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getBookDetails(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/books/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null;
  }
}

async function getSimilarBooks(category: string, currentBookId: string) {
  try {
    const res = await fetch(`${API_URL}/api/books?category=${encodeURIComponent(category)}&limit=5`, { cache: 'no-store' });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data.filter((b: any) => b.id !== currentBookId);
  } catch (error) {
    console.error('Failed to fetch similar books:', error);
    return [];
  }
}

async function getTrendingBooks() {
  try {
    const res = await fetch(`${API_URL}/api/books?sortBy=view_count&sortDirection=desc&limit=5`, { cache: 'no-store' });
    if (!res.ok) return [];
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch trending books:', error);
    return [];
  }
}

export default async function BookInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBookDetails(id);

  if (!book) {
    return <div>Book not found.</div>; // Or a proper 404 page
  }

  const similarBooks = await getSimilarBooks(book.category, book.id);
  const trendingBooks = await getTrendingBooks();

  return (
    <div className="space-y-12">
      <BookHero book={book} />
      <BookDescription book={book} />
      <div className="container mx-auto px-4 space-y-12">
        <BookCarousel 
          title="Similar Blinks"
          subtitle="Related Blinks you might enjoy"
          books={similarBooks} 
        />
        <BookCarousel 
          title="Trending"
          subtitle="What's popular right now"
          books={trendingBooks} 
        />
      </div>
      {/* Other sections of the book page can be added here, e.g., summary chapters */}
    </div>
  );
}

