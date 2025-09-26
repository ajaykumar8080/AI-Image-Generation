
"use client";

import { Menu, Wand2, User, Settings, History, Trash2 } from 'lucide-react';
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
import { useHistory } from '@/context/history-context';

export function Header() {
  const { history, clearHistory } = useHistory();

  const handleHistoryClick = (prompt: string) => {
    // This is a placeholder for future functionality.
    // For now, we can just log it to the console.
    console.log(`Selected history item: ${prompt}`);
  };

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center mx-auto px-4">
        <div className="flex items-center space-x-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs sm:max-w-sm">
              <SheetHeader className="flex flex-row items-center justify-between">
                <SheetTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5" />
                  Menu
                </SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <nav className="flex flex-col space-y-2">
                  <Button asChild variant="ghost" className="justify-start">
                    <Link href="#">
                      <User className="mr-2 h-5 w-5" />
                      Profile
                    </Link>
                  </Button>
                </nav>
              </div>
              <Separator />
              <div className="py-4">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <History className="h-5 w-5" />
                      History
                    </h3>
                    <Button variant="ghost" size="icon" onClick={clearHistory} aria-label="Clear history">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                {history.length > 0 ? (
                  <ul className="space-y-2">
                    {history.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleHistoryClick(item)}
                          className="w-full text-left p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors duration-200 text-sm truncate"
                        >
                          {item}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground text-center">No history yet.</p>
                )}
              </div>
              <Separator />
              <div className="py-4">
                <nav className="flex flex-col space-y-2">
                   <Button asChild variant="ghost" className="justify-start">
                    <Link href="#">
                      <Settings className="mr-2 h-5 w-5" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <Wand2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">PixelForge</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Sign In</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
