'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Movie } from '@/lib/types';

interface PlayerModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export function PlayerModal({ movie, onClose }: PlayerModalProps) {
  const isOpen = !!movie;
  
  if (!isOpen) return null;

  const embedUrl = movie.youtube_embed_id
    ? `https://www.youtube.com/embed/${movie.youtube_embed_id}?autoplay=1`
    : movie.youtube_trailer;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="font-headline text-2xl">{movie.title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-video">
          {embedUrl ? (
            <iframe
              title="YouTube video player"
              src={embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="h-full w-full"
            ></iframe>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-black text-muted-foreground">
              Trailer not available.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
