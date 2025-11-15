'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { updateMoviesAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import moviesData from '@/data/movies.json';

export default function PasteMoviesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [moviesJson, setMoviesJson] = useState('');
    const { toast } = useToast();

    useEffect(() => {
        // Pretty-print the JSON data from the imported file
        setMoviesJson(JSON.stringify(moviesData, null, 2));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Basic validation to ensure it's a parseable JSON
            JSON.parse(moviesJson);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Invalid JSON',
                description: 'The content is not valid JSON. Please correct it and try again.',
            });
            setIsLoading(false);
            return;
        }

        const res = await updateMoviesAction(moviesJson);
        setIsLoading(false);

        if (res.success) {
            toast({
                title: "Update Successful",
                description: res.message,
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: res.message || 'An unexpected error occurred.',
            });
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Update Movie Database File</CardTitle>
                <CardDescription>
                    Paste the full content for `src/data/movies.json` below. The existing file will be completely overwritten.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="moviesJson">Movie Data (JSON)</Label>
                        <Textarea
                            id="moviesJson"
                            name="moviesJson"
                            value={moviesJson}
                            onChange={(e) => setMoviesJson(e.target.value)}
                            placeholder='[{"title": "My Movie", ...}]'
                            className="min-h-96 font-code"
                            required
                        />
                         <p className="text-sm text-muted-foreground">
                           The content must be a valid JSON array.
                        </p>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save and Overwrite File'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
