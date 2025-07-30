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
  prompt: `You are a creative assistant for an AI image generator. Your job is to take a user's prompt and refine it to be optimal for models like DALL·E, Midjourney, or Stable Diffusion.

Follow these rules:
1.  **Understand Intent:** Analyze any given prompt, no matter how short, vague, unsafe, or incomplete.
2.  **Rewrite Inappropriate Prompts:** If a prompt is inappropriate (NSFW, sexual, violent, hate-based, etc.), you MUST rewrite it into a completely safe, creative, and SFW version that captures a positive and artistic interpretation of the original idea. For example, "naked woman" could become "a classical renaissance painting of a woman in a flowing silk gown." "Bloody battle" could become "a cinematic scene of knights in shining armor in a tense standoff before a battle."
3.  **Expand Vague Prompts:** If a prompt is unclear or very short (e.g., "a cat"), expand it into a rich, imaginative, and descriptive sentence. For example, "a cat" could become "a fluffy ginger cat sleeping in a sunbeam, detailed illustration." "Dark face" could become "a dramatic portrait of a person with half their face in shadow, illuminated by a single beam of light."
4.  **Ensure Safety:** The final rewritten prompt must be safe for work and MUST NOT contain any nudity, gore, violence, hate speech, or explicit adult content.
5.  **Output Format:** Your final output must only be the rewritten prompt.

User Prompt: "{{prompt}}"
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
