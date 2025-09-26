import { Menu, Wand2, User, Settings, History } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Separator } from './ui/separator';

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
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  <nav className="flex flex-col space-y-2">
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <User className="mr-2 h-5 w-5" />
                        Profile
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <Settings className="mr-2 h-5 w-5" />
                        Settings
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" className="justify-start">
                      <Link href="#">
                        <History className="mr-2 h-5 w-5" />
                        Search History
                      </Link>
                    </Button>
                  </nav>
                </div>
                <Separator />
              </SheetContent>
            </Sheet>
          </nav>
        </div>
      </div>
    </header>
  );
}
