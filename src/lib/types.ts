import type { RecommendFromTextOutput } from '@/ai/flows/recommend-from-text';

// A single movie from the recommendation list
export type Movie = RecommendFromTextOutput['recommendations'][0] & { dailymotion_trailer_id?: string | null };
