interface Chapter {
  title: string;
  content: string;
}

interface ChapterContentProps {
  chapters: Chapter[];
}

export function ChapterContent({ chapters }: ChapterContentProps) {
  if (!chapters || chapters.length === 0) {
    return <p>No content available.</p>;
  }

  return (
    <div>
      {chapters.map((chapter, index) => (
        <div key={index} className="mb-12">
          <p className="text-md font-semibold text-gray-500 mb-2">Chapter {index + 1}</p>
          <h2 className="text-3xl font-bold mb-4">{chapter.title}</h2>
          <div className="text-lg prose dark:prose-invert max-w-none">
            {chapter.content.split('\n').map((paragraph, pIndex) => (
              <p key={pIndex}>{paragraph}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
