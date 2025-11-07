import Link from 'next/link';
import {
  Rocket, Building, BarChart2, FlaskConical, HeartPulse, User, Landmark, History, MessageSquare, Briefcase,
  Users, Zap, DollarSign, Brain, Hourglass, Heart, Monitor, Smile, Baby, Globe, BookUser, Award, GraduationCap, Church, Sparkles, BookOpen, PenTool
} from 'lucide-react';
import { ComponentType } from 'react';
import { Skeleton } from './ui/skeleton';

const categoryIcons: { [key: string]: ComponentType<{ className?: string }> } = {
  'Entrepreneurship': Rocket,
  'Politics': Building,
  'Marketing & Sales': BarChart2,
  'Science': FlaskConical,
  'Health & Nutrition': HeartPulse,
  'Personal Development': User,
  'Economics': DollarSign,
  'History': History,
  'Communication Skills': MessageSquare,
  'Corporate Culture': Briefcase,
  'Management & Leadership': Users,
  'Motivation & Inspiration': Zap,
  'Money & Investments': DollarSign,
  'Psychology': Brain,
  'Productivity': Hourglass,
  'Sex & Relationships': Heart,
  'Technology & the Future': Monitor,
  'Mindfulness & Happiness': Smile,
  'Parenting': Baby,
  'Society & Culture': Globe,
  'Nature & the Environment': BookOpen, // Placeholder
  'Biography & Memoir': BookUser,
  'Career & Success': Award,
  'Education': GraduationCap,
  'Religion & Spirituality': Church,
  'Creativity': Sparkles,
  'Philosophy': PenTool, // Placeholder
  'Fiction': BookOpen, // Placeholder
};

const slugify = (text: string) => text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');

interface CategoriesGridProps {
  categories: string[];
}

export function CategoriesGridSkeleton() {
  return (
    <section>
      <Skeleton className="h-8 w-1/4 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {[...Array(15)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    </section>
  );
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-xl font-bold">Categories</h2>
      <p className="text-gray-500 mb-4">Explore all {categories.length} categories</p>
      {/* Mobile: Horizontally Scrollable Flex Wrap */}
      <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
        <div className="w-4xl flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              return (
                <Link
                  key={category}
                  href={`/explore/${slugify(category)}`}
                  className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
                  <span className="font-semibold text-sm">{category}</span>
                </Link>
              );
            })}
        </div>
      </div>

      {/* Desktop: Standard Flex Wrap */}
      <div className="hidden md:flex flex-wrap gap-3">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || BookOpen;
          return (
            <Link
              key={category}
              href={`/explore/${slugify(category)}`}
              className="flex items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <Icon className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-sm">{category}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
