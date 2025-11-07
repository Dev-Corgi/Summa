'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu, Search, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SidebarContent } from './Sidebar';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex md:w-full items-center max-w-7xl justify-end">
        {/* Logo */}
        <Link href="/" className="mr-6">
          <Droplet className="w-8 h-8 text-green-500" />
        </Link>

        {/* Desktop Search */}
        <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
          <Input 
            placeholder="Blinks, Guides, Shortcuts or Collections" 
            className="w-96 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
            <Search className="w-5 h-5 text-gray-500" />
          </button>
        </form>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center">
        <form onSubmit={handleSearch} className="relative flex-grow mx-4">
            <Input 
              placeholder="Search..." 
              className="w-full pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
        </form>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-3/4 sm:w-1/2">
            <div className="p-4">
                <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
