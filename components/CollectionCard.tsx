import Image from 'next/image';
import { Layers } from 'lucide-react';
import Link from 'next/link';

interface Collection {
  id: string;
  title: string;
  description: string;
  item_count: number;
  image_type: 'stack' | 'single'; // To differentiate between the two styles
  thumbnail_url?: string | null;
  short_description?: string | null;
}

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link href={`/collections/${collection.id}`} className="block p-2 hover:bg-muted/50 rounded-lg transition-colors">
      <div className="w-full max-w-[180px]">
        <div className="relative mx-auto aspect-square mb-2">
          <Image
            src={collection.thumbnail_url || `/collection.png`}
            alt={collection.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
        <h3 className="font-bold truncate">{collection.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {collection.short_description}
        </p>
        <div className="flex items-center text-xs text-gray-500 mt-2">
          <Layers className="w-4 h-4 mr-1" />
          <span>{collection.item_count} items</span>
        </div>
      </div>
    </Link>
  );
}
