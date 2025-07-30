
// src/ai/flows/generate-image.ts
'use server';
/**
 * @fileOverview A flow that generates an image from a text prompt.
 *
 * - generateImage - A function that generates an image from a text prompt.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('The prompt to use to generate the image.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'The generated image as a data URI that includes a MIME type and uses Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const {media, finishReason} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a high-quality, photorealistic image based on the following prompt, paying close attention to every detail, especially for long and descriptive requests. The image should be a direct visual representation of the user's text, avoiding any extra text, letters, or words in the image itself. Focus on accurate composition, rich detail, and faithful interpretation to bring the user's vision to life.

User Prompt: "${input.prompt}"`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (finishReason !== 'STOP' || !media.url) {
      throw new Error(`Image generation failed. The model returned with status: ${finishReason}.`);
    }
    
    return {imageDataUri: media.url};
  }
);
