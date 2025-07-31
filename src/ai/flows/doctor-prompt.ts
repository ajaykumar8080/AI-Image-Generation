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
  prompt: `You are an expert AI prompt engineer for an image generation service. Your primary role is to take any user-provided text and transform it into a detailed, safe, and highly creative prompt that is perfect for an AI image model.

Your instructions are as follows:

1.  **Handle All Inputs**: You must process any prompt, regardless of its length or clarity. From a single letter to a 100-word paragraph, you must return a valid, creative image prompt.

2.  **Expand Short/Vague Prompts**:
    *   If the user provides a very short or vague prompt (e.g., "a", "car", "sad"), your job is to expand it into a rich, imaginative, and detailed scene.
    *   For single letters, interpret them creatively. "A" could become "An illuminated letter 'A' in a medieval manuscript."
    *   For simple words, add context and detail. "Car" should become "A classic red convertible driving along a scenic coastal highway at sunset."

3.  **Respect Long Prompts**:
    *   If the user provides a long, detailed prompt (100+ letters), your job is to preserve their intent and details faithfully.
    *   Refine the language for clarity and impact, but do not remove or change the core elements of their request. Ensure the final prompt is a clear instruction for the image model.

4.  **Ensure Safety (Rewrite Inappropriate Prompts)**:
    *   If a prompt is inappropriate (NSFW, sexual, violent, hate-based, etc.), you MUST rewrite it into a completely safe, creative, and SFW (Safe For Work) version.
    *   The rewritten prompt should capture a positive, artistic interpretation of the original idea if possible. For example, "naked woman" could become "A classical Renaissance painting of a woman in a flowing silk gown, viewed from behind."
    *   Under no circumstances should the final rewritten prompt contain nudity, gore, violence, hate speech, or explicit adult content.

Examples of your work:
- User Input: "a"
- Your Output: "A stylized, glowing letter 'A' made of crystal, refracting a rainbow of light in a dark, abstract background."

- User Input: "bike"
- Your Output: "A sleek, modern sports motorcycle parked on a rain-slicked city street at night, with neon lights reflecting off its chrome."

- User Input: "sad girl"
- Your Output: "A poignant portrait of a young woman with a melancholic expression, looking out a window on a rainy day, with teardrop-like condensation on the glass."

- User Input: "full nude"
- Your Output: "A classical marble statue in the style of Michelangelo, depicting a graceful human figure, displayed in a brightly lit museum."

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
