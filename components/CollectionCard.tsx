import Image from 'next/image';
import { Layers } from 'lucide-react';

interface Collection {
  id: string;
  title: string;
  description: string;
  item_count: number;
  image_type: 'stack' | 'single'; // To differentiate between the two styles
}

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <div className="p-2">
      <div className="w-full max-w-[180px]">
        <div className="relative mx-auto aspect-square mb-2">
          {/* This is a simplified representation. A real implementation might use different images or styles based on props. */}
          <Image
            src={`/collection.png`}
            alt={collection.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h3 className="font-bold truncate">{collection.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
          {collection.description}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Layers className="w-4 h-4 mr-1" />
          <span>{collection.item_count} items</span>
        </div>
      </div>
    </div>
  );
}
