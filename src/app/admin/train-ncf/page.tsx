'use client';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { trainModelAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function TrainNcfPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<{modelTrained: boolean, message: string} | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        const formData = new FormData(e.currentTarget);
        const input = {
            ratingsData: formData.get('ratingsData') as string,
            epochs: Number(formData.get('epochs')),
            embeddingSize: Number(formData.get('embeddingSize')),
            ratingsThreshold: Number(formData.get('ratingsThreshold')),
        };
        
        const res = await trainModelAction(input);
        setIsLoading(false);

        if (res.message) {
            setResult(res);
            toast({
                title: res.modelTrained ? "Training Successful" : "Training Update",
                description: res.message,
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Error',
                description: 'An unexpected error occurred.',
            });
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">NCF Model Trainer</CardTitle>
                <CardDescription>
                    Train the Neural Collaborative Filtering model with user ratings data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="ratingsData">Ratings Data (CSV)</Label>
                        <Textarea
                            id="ratingsData"
                            name="ratingsData"
                            placeholder="userId,movieId,rating&#10;1,101,5&#10;1,102,4&#10;2,101,3"
                            className="min-h-48 font-code"
                            required
                        />
                         <p className="text-sm text-muted-foreground">
                           Must include 'userId', 'movieId', and 'rating' columns.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label htmlFor="epochs">Epochs</Label>
                            <Input id="epochs" name="epochs" type="number" defaultValue="5" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="embeddingSize">Embedding Size</Label>
                            <Input id="embeddingSize" name="embeddingSize" type="number" defaultValue="64" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ratingsThreshold">Ratings Threshold</Label>
                            <Input id="ratingsThreshold" name="ratingsThreshold" type="number" defaultValue="100" required />
                        </div>
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Training...' : 'Start Training'}
                    </Button>
                </form>

                {result && (
                    <Alert className="mt-6">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Training Result</AlertTitle>
                        <AlertDescription className="space-y-1">
                            <p>Status: {result.modelTrained ? 'Success' : 'Info'}</p>
                            <p className="font-code">{result.message}</p>
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
}
