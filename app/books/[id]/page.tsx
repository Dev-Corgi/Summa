import { BookHero } from '@/components/BookHero';
import { BookDescription } from '@/components/BookDescription';
import { BookCarousel } from '@/components/BookCarousel';

async function getBookDetails(id: string) {
  try {
    // Mock data for demonstration
    return {
      id: id,
      title: 'Discourse on Method',
      authors: ['René Descartes'],
      short_description: 'A Radical Guide to Clear Thinking, Doubt, and Self-Discovery',
      rating: 4.3,
      rating_count: 94,
      reading_time: 16,
      key_ideas_count: 6,
    };
  } catch (error) {
    console.error('Failed to fetch book details:', error);
    return null;
  }
}

async function getSimilarBooks(category: string, currentBookId: string) {
  // Mock data for demonstration
  return [
    { id: '101', title: 'Brain', authors: ['Elizabeth R. Ricker'] },
    { id: '102', title: 'The Stoic Capitalist', authors: ['Robert Rosenkranz'] },
    { id: '103', title: 'Calm the F*ck Down', authors: ['Sarah Knight'] },
    { id: '104', title: 'Ecce Homo', authors: ['Friedrich Nietzsche'] },
    { id: '105', title: 'We Can Do Hard Things', authors: ['Glennon Doyle'] },
  ].filter(b => b.id !== currentBookId);
}

async function getTrendingBooks() {
  // Mock data for demonstration
  return [
    { id: '201', title: 'A High-Performing Mind', authors: ['Andrew D. Thompson'] },
    { id: '202', title: '12 Rules For Life', authors: ['Jordan B. Peterson'] },
    { id: '203', title: 'The Gift of Not Belonging', authors: ['Rami Kaminski'] },
    { id: '204', title: 'Aware', authors: ['Les Csorba'] },
    { id: '205', title: 'Emotional Intelligence', authors: ['Daniel Goleman'] },
  ];
}

export default async function BookInfoPage({ params }: { params: { id: string } }) {
  const book = await getBookDetails(params.id);

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

