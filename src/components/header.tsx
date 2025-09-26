import { Menu, Wand2, User, Settings, History, Trash2, MessageSquare } from 'lucide-react';
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

interface HeaderProps {
  history: string[];
  onClearHistory: () => void;
  onHistoryClick: (prompt: string) => void;
}

export function Header({ history, onClearHistory, onHistoryClick }: HeaderProps) {
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
                  <MessageSquare className="h-5 w-5" />
                  History
                </SheetTitle>
                <Button variant="ghost" size="icon" onClick={onClearHistory} aria-label="Clear history">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </SheetHeader>
              <div className="py-4">
                {history.length > 0 ? (
                  <ul className="space-y-2">
                    {history.map((item, index) => (
                      <li key={index}>
                        <button
                          onClick={() => onHistoryClick(item)}
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
