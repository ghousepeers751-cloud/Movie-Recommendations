'use server';

import { recommendFromText, RecommendFromTextInput } from '@/ai/flows/recommend-from-text';
import { trainNcfModel, TrainNcfModelInput } from '@/ai/flows/train-ncf-model';
import { augmentMovieDetails, AugmentMovieDetailsInput } from '@/ai/flows/augment-movie-details';
import type { Movie } from '@/lib/types';

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

export async function trainModelAction(input: TrainNcfModelInput) {
  try {
    const result = await trainNcfModel(input);
    return result;
  } catch (e: any) {
    console.error(e);
    return { modelTrained: false, message: e.message || 'Failed to train model.' };
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
