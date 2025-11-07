import { BookCarousel } from '@/components/BookCarousel';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

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

async function getTrendingBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/trending?limit=10`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch trending books');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch trending books:', error);
    return [];
  }
}

async function getLatestCollections() {
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

async function getLatestBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books?limit=10&sort=created_at&order=desc`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch latest books');
    }
    
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to fetch latest books:', error);
    return [];
  }
}

// Categories are static and don't need API calls
const categories = [
  'Entrepreneurship', 'Politics', 'Marketing & Sales', 'Science', 'Health & Nutrition',
  'Personal Development', 'Economics', 'History', 'Communication Skills', 'Corporate Culture',
  'Management & Leadership', 'Motivation & Inspiration', 'Money & Investments', 'Psychology', 'Productivity',
  'Sex & Relationships', 'Technology & the Future', 'Mindfulness & Happiness', 'Parenting', 'Society & Culture',
  'Nature & the Environment', 'Biography & Memoir', 'Career & Success', 'Education', 'Religion & Spirituality',
  'Creativity', 'Philosophy'
];

export default async function ExplorePage() {
  const trendingBooks = await getTrendingBooks();
  const latestBooks = await getLatestBooks();
  const latestCollections = await getLatestCollections();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-20">
      <div className='py-6  md:py-16 space-y-24'>
        <BookCarousel 
          title="Trending"
          subtitle="What's popular right now"
          books={trendingBooks} 
        />
        <CategoriesGrid categories={categories} />
        <BookCarousel 
          title="Latest"
          subtitle="Titles recently added on Blinkist"
          books={latestBooks} 
        />
        <CollectionsCarousel 
          title="Latest Collections"
          subtitle="Handpicked selections of our best content"
          collections={latestCollections}
        />
      </div>
    </div>
  );
}
