'use server';

import { recommendFromText, RecommendFromTextInput } from '@/ai/flows/recommend-from-text';
import { augmentMovieDetails, AugmentMovieDetailsInput } from '@/ai/flows/augment-movie-details';
import type { Movie } from '@/lib/types';
import * as fs from 'fs/promises';
import path from 'path';

export async function getRecommendations(
  description: string,
  genre?: string,
  language?: string
): Promise<{ recommendations: Movie[]; error?: string }> {
  try {
    let prompt = description;
    if (genre && genre !== "Any Genre") prompt += ` in the ${genre} genre`;
    if (language && language !== "Any Language") prompt += ` in ${language} language`;
    
    const input: RecommendFromTextInput = { description: prompt, k: 12 };
    const result = await recommendFromText(input);

    if (!result || !result.recommendations) {
        return { recommendations: [], error: "Could not generate recommendations." };
    }

    return { recommendations: result.recommendations };
  } catch (e: any) {
    console.error(e);
    return { recommendations: [], error: e.message || 'Failed to fetch recommendations.' };
  }
}

export async function augmentMovieAction(input: AugmentMovieDetailsInput) {
    try {
        const result = await augmentMovieDetails(input);
        return result;
    } catch (e: any) {
        console.error(e);
        return { reviewSummary: `Error: ${e.message || 'Failed to augment details.'}` };
    }
}

export async function updateMoviesAction(moviesJson: string): Promise<{ success: boolean; message: string; }> {
    try {
        // Validate JSON
        JSON.parse(moviesJson);
    } catch (e: any) {
        return { success: false, message: `Invalid JSON: ${e.message}` };
    }

    try {
        const filePath = path.join(process.cwd(), 'src', 'data', 'movies.json');
        await fs.writeFile(filePath, moviesJson);
        return { success: true, message: 'Movie data updated successfully.' };
    } catch (e: any) {
        console.error(e);
        return { success: false, message: `Failed to write file: ${e.message}` };
    }
}
