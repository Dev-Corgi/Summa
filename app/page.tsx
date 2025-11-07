

import { PickUpSection } from '@/components/PickUpSection';
import { RecommendedSection } from '@/components/RecommendedSection';
import { BookCarousel } from '@/components/BookCarousel';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

// Fetch data on the server
async function getLatestProgress() {
  // This is a placeholder for the actual API call.
  // In a real app, you would use fetch with authentication headers.
  // For now, we'll simulate a fetch call and return mock data.
  try {
    // const res = await fetch('http://localhost:3000/api/user/progress/latest', {
    //   headers: { 'Authorization': 'Bearer your-user-id-or-token' }, // Replace with actual auth
    //   cache: 'no-store', // Ensure fresh data
    // });
    // if (!res.ok) return null;
    // const { data } = await res.json();
    // return data;

    // Mock data for demonstration:
    return {
      chapter_index: 3,
      books: {
        title: 'How to Make Your Brain Your Best Friend',
        authors: ['Rachel Barr'],
        summary_chapters: new Array(10), // Simulate 10 chapters
      },
    };

  } catch (error) {
    console.error('Failed to fetch latest progress:', error);
    return null;
  }
}

async function getRecommendedBooks() {
  try {
    // Mock data for demonstration:
    return [
      { id: '1', title: 'Discourse on Method', authors: ['René Descartes'] },
      { id: '2', title: 'Eat, Move, Sleep', authors: ['Tom Rath'] },
      { id: '3', title: 'The Art of War (new version)', authors: ['Sun Tzu'] },
      { id: '4', title: 'The Metabolism Reset Diet', authors: ['Alan Christianson'] },
      { id: '5', title: 'Don\'t Talk About Politics', authors: ['Sarah Stein Lubrano'] },
      { id: '6', title: 'Another Book', authors: ['Some Author'] },
      { id: '7', title: 'The Metabolism Reset Diet', authors: ['Alan Christianson'] },
      { id: '8', title: 'Don\'t Talk About Politics', authors: ['Sarah Stein Lubrano'] },
      { id: '9', title: 'Another Book', authors: ['Some Author'] },
    ];
  } catch (error) {
    console.error('Failed to fetch recommended books:', error);
    return [];
  }
}

async function getCollections() {
    // Mock data for demonstration:
    return [
      { id: '1', title: 'Insomnia No More', description: 'Take control of your sleep for health and wellbeing!', item_count: 10, image_type: 'stack' },
      { id: '2', title: 'Intermittent Fasting', description: 'Intermittent Fasting', item_count: 8, image_type: 'single' },
      { id: '3', title: 'This is Alternative Medicine', description: 'The wonders and limits of natural remedies', item_count: 8, image_type: 'single' },
      { id: '4', title: 'This is the History of Food', description: 'Discover evolution of cooking and history of ingredients', item_count: 9, image_type: 'single' },
      { id: '5', title: '6 Days to a Plant-based Diet', description: 'The essentials on switching to a plant-based diet', item_count: 9, image_type: 'single' },
      { id: '6', title: '6 Days to a Plant-based Diet', description: 'The essentials on switching to a plant-based diet', item_count: 9, image_type: 'single' },
      { id: '7', title: '6 Days to a Plant-based Diet', description: 'The essentials on switching to a plant-based diet', item_count: 9, image_type: 'single' },
      { id: '8', title: '6 Days to a Plant-based Diet', description: 'The essentials on switching to a plant-based diet', item_count: 9, image_type: 'single' },
      { id: '9', title: '6 Days to a Plant-based Diet', description: 'The essentials on switching to a plant-based diet', item_count: 9, image_type: 'single' },
    
    ];
}



async function getRecommendedBook() {
  try {
    // Mock data for demonstration:
    return {
        title: 'The Daily Laws',
        authors: ['Robert Greene'],
    };
  } catch (error) {
    console.error('Failed to fetch recommended book:', error);
    return null;
  }
}

export default async function Home() {
  const latestProgress = await getLatestProgress();
  const recommendedBook = await getRecommendedBook();
  const recommendedBooks = await getRecommendedBooks();
  const collections = await getCollections();

  return (
    <div className='py-6  md:py-16 space-y-24'>
      <PickUpSection latestProgress={latestProgress} />
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





