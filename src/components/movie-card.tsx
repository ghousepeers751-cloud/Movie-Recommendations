import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlayCircle, Download, ExternalLink } from 'lucide-react';
import type { Movie } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

interface MovieCardProps {
  movie: Movie;
  onPlayTrailer: (movie: Movie) => void;
}

export function MovieCard({ movie, onPlayTrailer }: MovieCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden border-2 border-transparent transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader className="p-0">
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={movie.poster || `https://picsum.photos/seed/${movie.movieId}/400/600`}
            alt={`Poster for ${movie.title}`}
            fill
            className="object-cover"
            data-ai-hint="movie poster"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-1 font-headline text-lg">{movie.title}</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {movie.year}
        </CardDescription>
        <div className="mt-2 flex flex-wrap gap-1">
          {movie.genres.split(/,|\|/).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre.trim()}
            </Badge>
          ))}
        </div>
        <p className="mt-3 line-clamp-4 text-sm text-foreground/80">
          {movie.description}
        </p>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 p-4 pt-0">
        <Button onClick={() => onPlayTrailer(movie)} variant="default">
          <PlayCircle />
          Watch Trailer
        </Button>
        <div className="grid grid-cols-2 gap-2">
            {movie.download_link ? (
                <Button variant="outline" asChild>
                    <a href={movie.download_link} target="_blank" rel="noopener noreferrer">
                        <Download />
                        Download
                    </a>
                </Button>
            ) : (
                <Button variant="outline" disabled>
                    <Download />
                    Download
                </Button>
            )}
            <Button variant="outline" asChild>
                <a href={movie.google_link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink />
                    More info
                </a>
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
