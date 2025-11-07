import { CollectionHero } from '@/components/CollectionHero';
import { CollectionDescription } from '@/components/CollectionDescription';
import { CollectionBookGrid } from '@/components/CollectionBookGrid';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

async function getCollectionDetails(id: string) {
  // Mock data for demonstration
  return {
    id: id,
    title: 'Insomnia No More',
    description: 'Now more than ever, artificial intelligence is embedded in our every-day interactions and workflows, promising to revolutionize the future as the technology advances. From strategy and ethics to hiring, product, and the future of intelligence, this collection equips you to make smarter AI decisions now. Learn how to deploy AI with customers, build human-centered teams, navigate power shifts, and grasp breakthroughs shaping tomorrow.',
    curator: 'The Blinkist Curators',
    categories: ['Technology & the Future', 'Entrepreneurship', 'Management & Leadership'],
  };
}

async function getCollectionBooks(id: string) {
  // Mock data for demonstration
  return [
    { id: '1', title: 'Night School', authors: ['Richard Wiseman'], short_description: 'The Life-Changing Science of Sleep', reading_time: 19, rating: 3.9 },
    { id: '2', title: 'End the Insomnia Struggle', authors: ['Colleen Ehrnstrom and Alisha L. Brosse'], short_description: 'A Step-by-Step Guide to Help You Get to Sleep and Stay Asleep', reading_time: 16, rating: 4.0 },
    { id: '3', title: 'The Science and Technology of...', authors: ['Sergey Young'], short_description: 'An Insider\'s Guide to the Breakthroughs That Will Dramatically Extend Our...', reading_time: 24, rating: 4.4 },
    { id: '4', title: 'The Sleep Solution', authors: ['W. Chris Winter'], short_description: 'Why Your Sleep Is Broken and How to Fix It', reading_time: 18, rating: 4.2 },
    { id: '5', title: 'Biohack Your Brain', authors: ['Kristen Willeumier'], short_description: 'How to Boost Cognitive Health, Performance and Power', reading_time: 22, rating: 4.6 },
    { id: '6', title: 'What to Eat When', authors: ['Michael Roizen'], short_description: 'A Strategic Plan to Improve Your Health and Life through Food', reading_time: 25, rating: 4.4 },
    { id: '7', title: 'The No-Nonsense Meditation Book', authors: ['Steven Laureys'], short_description: 'A Scientist\'s Guide to the Power of Meditation', reading_time: 23, rating: 4.7 },
    { id: '8', title: 'Making Habits, Breaking Habits', authors: ['Jeremy Dean'], short_description: 'Why We Do Things, Why We Don\'t, and How to Make Any Change Stick', reading_time: 11, rating: 4.1 },
    { id: '9', title: 'The Sleep Revolution', authors: ['Arianna Huffington'], short_description: 'Transforming Your Life One Night At a Time', reading_time: 16, rating: 3.9 },
    { id: '10', title: 'The Mind at Night', authors: ['Andrea Rock'], short_description: 'The New Science of How and Why We Dream', reading_time: 15, rating: 4.3 },
  ];
}

async function getMoreCollections() {
  // Mock data for demonstration
  return [
    { id: '101', title: 'Better Digestion in 7 Days', description: 'The importance of listening to and feeding your gut', item_count: 6, image_type: 'stack' },
    { id: '102', title: 'This Is Alternative Medicine', description: 'The wonders and limits of natural remedies', item_count: 8, image_type: 'stack' },
    { id: '103', title: 'Get Into Top Form', description: 'Take control of your health', item_count: 9, image_type: 'stack' },
    { id: '104', title: 'Listen to Your Body', description: 'How to speak the language of and live in sync with your body', item_count: 11, image_type: 'stack' },
  ];
}

export default async function CollectionInfoPage({ params }: { params: { id: string } }) {
  const collection = await getCollectionDetails(params.id);
  const books = await getCollectionBooks(params.id);
  const moreCollections = await getMoreCollections();

  if (!collection) {
    return <div>Collection not found.</div>;
  }

  return (
    <div className="space-y-8">
      <CollectionHero collection={collection} />
      <CollectionDescription collection={collection} />
      <CollectionBookGrid books={books} />
      <div className="container mx-auto px-4">
        <CollectionsCarousel 
          title="More collections"
          subtitle="Other collections you might like"
          collections={moreCollections} 
        />
      </div>
      {/* Other sections of the collection page can be added here */}
    </div>
  );
}


