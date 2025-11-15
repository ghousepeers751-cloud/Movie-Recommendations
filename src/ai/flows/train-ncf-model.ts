'use server';
/**
 * @fileOverview A tool to train the Neural Collaborative Filtering model.
 *
 * - trainNcfModel - A function that handles the training of the NCF model.
 * - TrainNcfModelInput - The input type for the trainNcfModel function.
 * - TrainNcfModelOutput - The return type for the trainNcfModel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as fs from 'fs/promises';

const TrainNcfModelInputSchema = z.object({
  ratingsData: z
    .string()
    .describe(
      'The user ratings data in CSV format. The CSV should have columns userId, movieId, and rating.'
    ),
  epochs: z.number().default(5).describe('The number of training epochs.'),
  embeddingSize: z.number().default(64).describe('The size of the embedding layer.'),
  ratingsThreshold: z.number().default(100).describe('The threshold for the minimum number of ratings for the model to consider training beneficial.'),
});
export type TrainNcfModelInput = z.infer<typeof TrainNcfModelInputSchema>;

const TrainNcfModelOutputSchema = z.object({
  modelTrained: z
    .boolean()
    .describe('Whether the NCF model was successfully trained.'),
  message: z.string().describe('A message indicating the training status.'),
});
export type TrainNcfModelOutput = z.infer<typeof TrainNcfModelOutputSchema>;

export async function trainNcfModel(input: TrainNcfModelInput): Promise<TrainNcfModelOutput> {
  return trainNcfModelFlow(input);
}

const trainNcfModelFlow = ai.defineFlow(
  {
    name: 'trainNcfModelFlow',
    inputSchema: TrainNcfModelInputSchema,
    outputSchema: TrainNcfModelOutputSchema,
  },
  async input => {
    const {
      ratingsData,
      epochs,
      embeddingSize,
      ratingsThreshold
    } = input;

    // Check if ratings data exceeds the threshold to proceed with training
    const lines = ratingsData.trim().split('\n');
    const numberOfRatings = lines.length - 1; // Subtract header

    if (numberOfRatings < ratingsThreshold) {
      return {
        modelTrained: false,
        message: `Number of ratings (${numberOfRatings}) is below the threshold (${ratingsThreshold}). Training skipped.`,
      };
    }

    // Save ratings data to a temporary file
    const ratingsCsvPath = 'ratings.csv';
    await fs.writeFile(ratingsCsvPath, ratingsData);

    try {
      // Dynamically import the ncf_train module
      const ncfTrainModule = await import(
        /* webpackChunkName: "ncf_train" */ '../../../backend/ncf_train'
      );
      // Call the train_ncf function from the imported module
      await ncfTrainModule.train_ncf(ratingsCsvPath, epochs, embeddingSize);

      // Clean up the temporary ratings file
      await fs.unlink(ratingsCsvPath);

      return {
        modelTrained: true,
        message: 'NCF model trained successfully.',
      };
    } catch (error: any) {
      console.error('Error training NCF model:', error);
      return {
        modelTrained: false,
        message: `Error training NCF model: ${error.message}`,
      };
    }
  }
);
