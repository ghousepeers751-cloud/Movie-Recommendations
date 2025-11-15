'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { augmentMovieAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles } from 'lucide-react';

export default function AugmentMoviePage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{reviewSummary: string} | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const input = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            reviews: formData.get('reviews') as string,
        };
        
        const res = await augmentMovieAction(input);
        setIsLoading(false);
        setResult(res);
        
        if (res.reviewSummary && !res.reviewSummary.startsWith('Error:')) {
            toast({
                title: "Augmentation Complete",
                description: "Review summary generated successfully.",
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: res.reviewSummary || 'An unexpected error occurred.',
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Augment Movie Details</CardTitle>
                <CardDescription>
                    Generate a one-sentence review summary using GenAI.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Movie Title</Label>
                        <Input id="title" name="title" type="text" placeholder="e.g., The Matrix" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Plot Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            placeholder="A computer hacker learns from mysterious rebels about the true nature of his reality..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="reviews">Reviews</Label>
                        <Textarea
                            id="reviews"
                            name="reviews"
                            placeholder="Mind-bending and action-packed! A must-see.&#10;A bit confusing, but visually stunning.&#10;Revolutionized the sci-fi genre."
                            className="min-h-40"
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Summary'}
                    </Button>
                </form>
                
                {result && (
                    <Alert className="mt-6">
                        <Sparkles className="h-4 w-4" />
                        <AlertTitle>Generated Summary</AlertTitle>
                        <AlertDescription>
                            <p>{result.reviewSummary}</p>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
