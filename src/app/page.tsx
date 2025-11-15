'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/header';
import { RecommendationForm } from '@/components/recommendation-form';
import { MovieCard } from '@/components/movie-card';
import { PlayerModal } from '@/components/player-modal';
import { MovieGridSkeleton } from '@/components/skeletons';
import type { Movie } from '@/lib/types';
import { getRecommendations } from './actions';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  const handleSearch = async (description: string, genre: string, language: string) => {
    setIsLoading(true);
    setRecommendations([]);
    const result = await getRecommendations(description, genre, language);
    setIsLoading(false);
    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else {
      setRecommendations(result.recommendations);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow">
        <section className="relative h-64 w-full md:h-96">
            {heroImage && 
                <Image 
                    src={heroImage.imageUrl} 
                    alt={heroImage.description} 
                    fill 
                    className="object-cover" 
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="container text-center">
                    <h1 className="text-4xl font-bold text-white drop-shadow-lg font-headline md:text-6xl">
                        Discover Your Next Obsession
                    </h1>
                    <p className="mt-4 text-lg text-white/80 drop-shadow-md md:text-xl">
                        AI-powered recommendations, just for you.
                    </p>
                </div>
            </div>
        </section>

        <div className="container relative z-10 -mt-20 md:-mt-16">
          <RecommendationForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <section className="container pb-12">
            {isLoading && <MovieGridSkeleton />}
            {!isLoading && recommendations.length > 0 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                    {recommendations.map((movie) => (
                        <MovieCard key={movie.movieId} movie={movie} onPlayTrailer={setPlayingMovie} />
                    ))}
                </div>
            )}
            {!isLoading && recommendations.length === 0 && (
                 <div className="py-16 text-center text-muted-foreground">
                    <p className="text-lg">Let's find something to watch!</p>
                    <p>Describe a movie or show above to get started.</p>
                </div>
            )}
        </section>

        <PlayerModal movie={playingMovie} onClose={() => setPlayingMovie(null)} />
      </main>
    </div>
  );
}
