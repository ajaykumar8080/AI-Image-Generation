import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center mx-auto px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Wand2 className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">PixelForge</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button variant="outline">Sign In</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
