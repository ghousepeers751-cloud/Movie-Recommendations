import { config } from 'dotenv';
config();

import '@/ai/flows/train-ncf-model.ts';
import '@/ai/flows/augment-movie-details.ts';
import '@/ai/flows/recommend-from-text.ts';