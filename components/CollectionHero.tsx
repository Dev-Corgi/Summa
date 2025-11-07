import Image from 'next/image';
import Link from 'next/link';
import { FileText, Droplet, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Collection {
  id: string;
  title: string;
  description?: string | null;
  short_description?: string | null;
  curator?: string | null;
  thumbnail_url?: string | null;
  categories: string[];
}

interface CollectionHeroProps {
  collection: Collection;
}

export function CollectionHero({ collection }: CollectionHeroProps) {
  const primaryCategory = collection.categories?.[0] || 'Category';

  return (
    <div className="w-full bg-amber-50 dark:bg-amber-900/20">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4">
          <Link href={`/explore/${primaryCategory.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="hover:underline">
            {primaryCategory}
          </Link>
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="text-gray-600 dark:text-gray-400">{collection.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center">
          
          {/* Image */}
          <div className="w-48 h-48 relative mx-auto lg:justify-self-center">
            <Image
              src={collection.thumbnail_url || `/collection.png`}
              alt={collection.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>

          {/* Text Content */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{collection.title}</h1>
            <div className="flex items-center justify-center lg:justify-start text-base mb-4 text-gray-600 dark:text-gray-300">
                <FileText className="w-5 h-5 mr-2" />
                <p>{collection.short_description || collection.description || 'Explore insights at the cutting edge of technology'}</p>
            </div>
            <div className="flex items-center justify-center lg:justify-start text-sm font-semibold mb-6">
                <span className="mr-2">By</span>
                <div className="w-5 h-5 mr-1 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">B</div>
                <span>{collection.curator || 'The Blinkist Curators'}</span>
            </div>
            
            <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                <Play className="w-5 h-5 mr-2" /> Play first title
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
