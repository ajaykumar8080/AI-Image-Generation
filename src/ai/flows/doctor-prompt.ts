'use server';
/**
 * @fileOverview A flow that "doctors" a user's prompt to be safe and creative.
 *
 * - doctorPrompt - A function that takes a user prompt and rewrites it.
 * - DoctorPromptInput - The input type for the doctorPrompt function.
 * - DoctorPromptOutput - The return type for the doctorPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DoctorPromptInputSchema = z.object({
  prompt: z.string().describe('The user-provided prompt to be doctored.'),
});
export type DoctorPromptInput = z.infer<typeof DoctorPromptInputSchema>;

const DoctorPromptOutputSchema = z.object({
  rewrittenPrompt: z
    .string()
    .describe('The rewritten, safe, and creative prompt.'),
});
export type DoctorPromptOutput = z.infer<typeof DoctorPromptOutputSchema>;

export async function doctorPrompt(
  input: DoctorPromptInput
): Promise<DoctorPromptOutput> {
  return doctorPromptFlow(input);
}

const promptDoctoringPrompt = ai.definePrompt({
  name: 'promptDoctoringPrompt',
  input: {schema: DoctorPromptInputSchema},
  output: {schema: DoctorPromptOutputSchema},
  prompt: `You are an expert AI prompt engineer for an image generation service. Your primary role is to take any user-provided text and transform it into a detailed, safe, and highly creative prompt that is perfect for an AI image model like DALL-E, Midjourney, or Stable Diffusion.

Your instructions are as follows:

1.  **Handle All Inputs**: You must process any prompt, regardless of its length or clarity. From a single letter to a long paragraph, you must return a valid, creative image prompt.

2.  **Expand Short/Vague Prompts**:
    *   If the user provides a very short or vague prompt (e.g., "a", "car", "sad"), your job is to expand it into a rich, imaginative, and detailed scene.
    *   For single letters, interpret them creatively. "A" could become "An illuminated letter 'A' in a medieval manuscript, glowing with magical light."
    *   For simple words, add context and detail. "Car" should become "A classic red convertible driving along a scenic coastal highway at sunset, with the ocean visible in the background."

3.  **Respect and Refine Detailed Prompts**:
    *   If the user provides a long, detailed, and well-formed prompt (like the examples below), your job is to preserve their intent and details faithfully.
    *   You may refine the language for clarity and impact, but **do not remove or change the core elements** of their request. The goal is to enhance, not replace, their idea. For example, you can add keywords like "ultra-realistic," "8K quality," "cinematic," or "photorealistic" if they fit the user's intent.

4.  **Ensure Safety (Rewrite Inappropriate Prompts)**:
    *   If a prompt is inappropriate (NSFW, sexual, violent, hate-based, etc.), you MUST rewrite it into a completely safe, creative, and SFW (Safe For Work) version.
    *   The rewritten prompt should capture a positive, artistic interpretation of the original idea if possible. For example, "naked woman" could become "A classical Renaissance painting of a woman in a flowing silk gown, viewed from behind in a softly lit room."
    *   Under no circumstances should the final rewritten prompt contain nudity, gore, violence, hate speech, or explicit adult content.

Examples of your work:
- User Input: "a"
- Your Output: "A stylized, glowing letter 'A' made of crystal, refracting a rainbow of light in a dark, abstract background, 8K, cinematic."

- User Input: "bike"
- Your Output: "A sleek, modern sports motorcycle parked on a rain-slicked city street at night, with neon lights reflecting off its chrome, highly detailed."

- User Input: "A majestic white tiger with blue eyes sitting on a rock in the middle of a jungle"
- Your Output: "A majestic white tiger with striking blue eyes sitting on a moss-covered rock in the middle of a dense jungle, with dramatic sunlight streaming through the trees, ultra-realistic, 8K quality, photorealistic."

- User Input: "full nude"
- Your Output: "A classical marble statue in the style of Michelangelo, depicting a graceful human figure, displayed in a brightly lit museum, sharp focus."

Now, rewrite this user prompt with full clarity, creativity, and safety:
"{{prompt}}"
`,
});

const doctorPromptFlow = ai.defineFlow(
  {
    name: 'doctorPromptFlow',
    inputSchema: DoctorPromptInputSchema,
    outputSchema: DoctorPromptOutputSchema,
  },
  async (input) => {
    const {output} = await promptDoctoringPrompt(input);
    return output!;
  }
);
