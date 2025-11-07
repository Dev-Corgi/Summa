import Image from 'next/image';

interface BookCoverImageProps {
  alt: string;
  thumbnailUrl?: string | null;
}

export function BookCoverImage({ alt, thumbnailUrl }: BookCoverImageProps) {

  return (
    <div className={`relative w-full mb-2 pt-4 aspect-square`}>
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full bg-gray-200/50 dark:bg-gray-700/50 rounded-t-full aspect-2/1`}></div>
      <div className={`relative mx-auto w-[70%] aspect-3/4 bottom-[15px]`}>
        <Image
          src={thumbnailUrl || "/bookcover.png"}
          alt={alt}
          fill
          className="object-cover rounded-md shadow-md z-10"
        />
      </div>
      <div className="absolute z-20 bottom-2 right-[15%] w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">
        B
      </div>
    </div>
  );
}
