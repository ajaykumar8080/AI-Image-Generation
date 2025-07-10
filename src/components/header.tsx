import { Camera } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">VisionaryAI</span>
        </Link>
      </div>
    </header>
  );
}
