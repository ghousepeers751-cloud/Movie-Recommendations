import Link from 'next/link';
import { Film, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Film className="h-6 w-6 text-primary" />
          <span className="font-bold font-headline text-xl">
            CineMatic
          </span>
        </Link>
        <nav className="flex flex-1 items-center space-x-4">
           <Button variant="link" asChild className="text-muted-foreground hover:text-primary">
              <Link href="/movies">
                <Clapperboard className="mr-2 h-4 w-4" />
                Movie DB
              </Link>
            </Button>
        </nav>
      </div>
    </header>
  );
}
