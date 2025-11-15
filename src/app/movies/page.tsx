'use client';

import { useState } from 'react';
import { Header } from '@/components/header';
import { LocalMovieCard } from '@/components/local-movie-card';
import { PlayerModal } from '@/components/player-modal';
import movies from '@/data/movies.json';
import type { Movie as RecommendedMovie } from '@/lib/types';

// Define a type for movies from the local JSON to avoid conflicts
export interface LocalMovie {
  title: string;
  description: string;
  language: string;
  year: number;
  genres: string;
  poster: string;
  youtube_trailer: string | null;
  youtube_embed_id: string | null;
  dailymotion_trailer_id?: string | null;
  google_link: string;
}

export default function MoviesPage() {
  const [playingMovie, setPlayingMovie] = useState<LocalMovie | null>(null);

  // Adapt LocalMovie to the structure expected by PlayerModal
  const adaptToPlayerModal = (localMovie: LocalMovie | null): RecommendedMovie | null => {
    if (!localMovie) return null;
    return {
      ...localMovie,
      movieId: 0, // dummy id
      download_link: '',
      score: 0,
      youtube_trailer: localMovie.youtube_trailer || '',
      youtube_embed_id: localMovie.youtube_embed_id || '',
    };
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container py-8">
        <h1 className="mb-8 font-headline text-3xl">Movie Database</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {(movies as LocalMovie[]).map((movie) => (
            <LocalMovieCard key={movie.title} movie={movie} onPlayTrailer={setPlayingMovie} />
          ))}
        </div>
        <PlayerModal movie={adaptToPlayerModal(playingMovie)} onClose={() => setPlayingMovie(null)} />
      </main>
    </div>
  );
}
