'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wand2 } from 'lucide-react';

const genres = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Adventure"];
const languages = ["Hindi", "Telugu", "Kannada", "English", "Tamil", "Malayalam"];

interface RecommendationFormProps {
    onSearch: (description: string, genre: string, language: string) => void;
    isLoading: boolean;
}

export function RecommendationForm({ onSearch, isLoading }: RecommendationFormProps) {
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSearch(description, genre, language);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border bg-card p-6 shadow-md">
        <div className="relative">
            <Input
                type="text"
                placeholder="Describe what you want to watch... e.g., 'a funny sci-fi movie with a talking animal'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="h-12 pr-12 text-base"
                required
            />
            <Wand2 className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Select value={genre} onValueChange={setGenre}>
                <SelectTrigger>
                    <SelectValue placeholder="Any Genre" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Any Genre">Any Genre</SelectItem>
                    {genres.map((g) => (
                        <SelectItem key={g} value={g}>{g}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                    <SelectValue placeholder="Any Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Any Language">Any Language</SelectItem>
                    {languages.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button type="submit" disabled={isLoading} className="h-10 w-full md:col-span-1">
                {isLoading ? 'Thinking...' : 'Get Recommendations'}
            </Button>
        </div>
    </form>
  );
}
