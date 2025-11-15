'use server';

/**
 * @fileOverview Recommends movies based on a text description of what the user wants to watch.
 *
 * - recommendFromText - A function that takes a text description and returns a list of movie recommendations.
 * - RecommendFromTextInput - The input type for the recommendFromText function.
 * - RecommendFromTextOutput - The return type for the recommendFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendFromTextInputSchema = z.object({
  description: z.string().describe('A description of the type of movie the user wants to watch.'),
  k: z.number().default(10).describe('The number of recommendations to return.'),
});
export type RecommendFromTextInput = z.infer<typeof RecommendFromTextInputSchema>;

const MovieSchema = z.object({
  movieId: z.number().describe('The movie ID.'),
  title: z.string().describe('The title of the movie.'),
  language: z.string().describe('The language of the movie.'),
  genres: z.string().describe('The genres of the movie.'),
  year: z.number().optional().describe('The year the movie was released.'),
  poster: z.string().describe('URL of the movie poster image.'),
  description: z.string().describe('A short description of the movie.'),
  youtube_trailer: z.string().describe('The URL of the movie trailer on YouTube.'),
  youtube_embed_id: z.string().describe('The YouTube embed ID for the trailer.'),
  google_link: z.string().describe('A link to search for the movie on Google.'),
  download_link: z.string().describe('A link to download the movie, if available.'),
  score: z.number().describe('The recommendation score for the movie.'),
});

const RecommendFromTextOutputSchema = z.object({
  recommendations: z.array(MovieSchema).describe('A list of movie recommendations.'),
});
export type RecommendFromTextOutput = z.infer<typeof RecommendFromTextOutputSchema>;

export async function recommendFromText(input: RecommendFromTextInput): Promise<RecommendFromTextOutput> {
  return recommendFromTextFlow(input);
}

const recommendFromTextPrompt = ai.definePrompt({
  name: 'recommendFromTextPrompt',
  input: {schema: RecommendFromTextInputSchema},
  output: {schema: RecommendFromTextOutputSchema},
  prompt: `You are a movie recommendation expert. Given the following description of what the user wants to watch, recommend {{k}} movies. 

Description: {{{description}}}

Return ONLY a JSON object with a 'recommendations' property, which is an array of movies. Each movie object should include the movieId, title, language, genres, year, poster, description, youtube_trailer, youtube_embed_id, google_link, download_link, and score.
`,
});

const recommendFromTextFlow = ai.defineFlow(
  {
    name: 'recommendFromTextFlow',
    inputSchema: RecommendFromTextInputSchema,
    outputSchema: RecommendFromTextOutputSchema,
  },
  async input => {
    const {output} = await recommendFromTextPrompt(input);
    return output!;
  }
);
