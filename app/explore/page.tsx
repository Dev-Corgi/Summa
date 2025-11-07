import { BookCarousel } from '@/components/BookCarousel';
import { CategoriesGrid } from '@/components/CategoriesGrid';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

async function getTrendingBooks() {
  try {
    // Mock data for demonstration:
    return [
      { id: '1', title: 'A High-Performing Mind', authors: ['Andrew D. Thompson'] },
      { id: '2', title: '12 Rules For Life', authors: ['Jordan B. Peterson'] },
      { id: '3', title: 'The Gift of Not Belonging', authors: ['Rami Kaminski'] },
      { id: '4', title: 'Aware', authors: ['Les Csorba'] },
      { id: '5', title: 'Emotional Intelligence', authors: ['Daniel Goleman'] },
      { id: '6', title: 'A High-Performing Mind', authors: ['Andrew D. Thompson'] },
      { id: '7', title: '12 Rules For Life', authors: ['Jordan B. Peterson'] },
      { id: '8', title: 'The Gift of Not Belonging', authors: ['Rami Kaminski'] },
      { id: '9', title: 'Aware', authors: ['Les Csorba'] },
      { id: '10', title: 'Emotional Intelligence', authors: ['Daniel Goleman'] },
    ];
  } catch (error) {
    console.error('Failed to fetch trending books:', error);
    return [];
  }
}

async function getLatestCollections() {
    // Mock data for demonstration:
    return [
      { id: '1', title: 'AI Must-Reads in 2025', description: 'Explore insights at the cutting edge of technology', item_count: 8, image_type: 'stack' },
      { id: '2', title: 'Bestsellers Everyone\'s Reading', description: 'Stay current with chart-topping ideas and insights', item_count: 7, image_type: 'stack' },
      { id: '3', title: 'Our Ways of Working', description: 'Insights into Blinkist\'s core values', item_count: 11, image_type: 'stack' },
      { id: '4', title: 'The Five-Hour Rule Playbook', description: 'Build a weekly habit of deliberate learning', item_count: 8, image_type: 'stack' },
      { id: '5', title: 'Book Recommendation: Lenny Rachitsky', description: 'Practical, no-fluff playbooks to level up work', item_count: 12, image_type: 'single' },
      { id: '6', title: 'AI Must-Reads in 2025', description: 'Explore insights at the cutting edge of technology', item_count: 8, image_type: 'stack' },
      { id: '7', title: 'Bestsellers Everyone\'s Reading', description: 'Stay current with chart-topping ideas and insights', item_count: 7, image_type: 'stack' },
      { id: '8', title: 'Our Ways of Working', description: 'Insights into Blinkist\'s core values', item_count: 11, image_type: 'stack' },
      { id: '9', title: 'The Five-Hour Rule Playbook', description: 'Build a weekly habit of deliberate learning', item_count: 8, image_type: 'stack' },
      { id: '10', title: 'Book Recommendation: Lenny Rachitsky', description: 'Practical, no-fluff playbooks to level up work', item_count: 12, image_type: 'single' },
    ];
}

async function getLatestBooks() {
    // Mock data for demonstration:
    return [
      { id: '1', title: 'Decision-Driven Analytics', authors: ['Bart de Langhe & Stefano Puntoni'] },
      { id: '2', title: 'Framed', authors: ['John Grisham & Jim McCloskey'] },
      { id: '3', title: 'Effective Meetings', authors: ['Chris Fenning'] },
      { id: '4', title: 'Streaming Wars', authors: ['Charlotte Henry'] },
      { id: '5', title: 'The Ten Types of Human', authors: ['Dexter Dias'] },
       { id: '6', title: 'Decision-Driven Analytics', authors: ['Bart de Langhe & Stefano Puntoni'] },
      { id: '7', title: 'Framed', authors: ['John Grisham & Jim McCloskey'] },
      { id: '8', title: 'Effective Meetings', authors: ['Chris Fenning'] },
      { id: '9', title: 'Streaming Wars', authors: ['Charlotte Henry'] },
      { id: '10', title: 'The Ten Types of Human', authors: ['Dexter Dias'] },
    ];
}

async function getCategories() {
  try {
    // Mock data for demonstration:
    return [
        'Entrepreneurship', 'Politics', 'Marketing & Sales', 'Science', 'Health & Nutrition',
        'Personal Development', 'Economics', 'History', 'Communication Skills', 'Corporate Culture',
        'Management & Leadership', 'Motivation & Inspiration', 'Money & Investments', 'Psychology', 'Productivity',
        'Sex & Relationships', 'Technology & the Future', 'Mindfulness & Happiness', 'Parenting', 'Society & Culture',
        'Nature & the Environment', 'Biography & Memoir', 'Career & Success', 'Education', 'Religion & Spirituality',
        'Creativity', 'Philosophy', 'Fiction'
    ];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export default async function ExplorePage() {
  const trendingBooks = await getTrendingBooks();
  const categories = await getCategories();
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
