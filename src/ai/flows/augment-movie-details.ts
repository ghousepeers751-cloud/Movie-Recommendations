'use server';

/**
 * @fileOverview This file defines a Genkit flow to augment movie details with a GenAI-powered review summary.
 *
 * - augmentMovieDetails - A function that accepts movie details and returns the details with an added review summary.
 * - AugmentMovieDetailsInput - The input type for the augmentMovieDetails function.
 * - AugmentMovieDetailsOutput - The return type for the augmentMovieDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AugmentMovieDetailsInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  description: z.string().describe('The plot description of the movie.'),
  reviews: z.string().describe('A collection of movie reviews.'),
});
export type AugmentMovieDetailsInput = z.infer<typeof AugmentMovieDetailsInputSchema>;

const AugmentMovieDetailsOutputSchema = z.object({
  reviewSummary: z.string().describe('A short, one-sentence summary of the movie reviews.'),
});
export type AugmentMovieDetailsOutput = z.infer<typeof AugmentMovieDetailsOutputSchema>;

export async function augmentMovieDetails(input: AugmentMovieDetailsInput): Promise<AugmentMovieDetailsOutput> {
  return augmentMovieDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'augmentMovieDetailsPrompt',
  input: {schema: AugmentMovieDetailsInputSchema},
  output: {schema: AugmentMovieDetailsOutputSchema},
  prompt: `Summarize the following movie reviews into a single, concise sentence. The movie is called {{{title}}}.\n\nReviews: {{{reviews}}}`,
});

const augmentMovieDetailsFlow = ai.defineFlow(
  {
    name: 'augmentMovieDetailsFlow',
    inputSchema: AugmentMovieDetailsInputSchema,
    outputSchema: AugmentMovieDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
