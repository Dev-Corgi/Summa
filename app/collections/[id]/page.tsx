import { CollectionHero } from '@/components/CollectionHero';
import { CollectionDescription } from '@/components/CollectionDescription';
import { CollectionBookGrid } from '@/components/CollectionBookGrid';
import { CollectionsCarousel } from '@/components/CollectionsCarousel';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function getCollectionData(id: string) {
  try {
    const res = await fetch(`${API_URL}/api/collections/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch collection data:', error);
    return null;
  }
}

async function getMoreCollections(currentId: string) {
  try {
    const res = await fetch(`${API_URL}/api/collections`, { cache: 'no-store' });
    if (!res.ok) return [];
    const { data } = await res.json();
    // Filter out the current collection from the 'more collections' list
    return data.filter((collection: any) => collection.id !== currentId);
  } catch (error) {
    console.error('Failed to fetch more collections:', error);
    return [];
  }
}

export default async function CollectionInfoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const collectionData = await getCollectionData(id);
  const moreCollections = await getMoreCollections(id);

  const collection = collectionData?.collection;
  const books = collectionData?.books || [];

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


