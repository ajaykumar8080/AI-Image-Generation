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
  prompt: `You are an advanced AI that rewrites image generation prompts.

Your job is to:
1. Fix vague or ambiguous words (like "bike", "train", "car") by adding clear context.
2. Clarify whether the user means a bicycle, motorcycle, etc.
3. Rewrite each prompt as a realistic, detailed, and unambiguous scene.
4. Avoid short or unclear descriptions.
5. If a prompt is inappropriate (NSFW, sexual, violent, hate-based, etc.), you MUST rewrite it into a completely safe, creative, and SFW version that captures a positive and artistic interpretation. For example, "naked woman" could become "a classical renaissance painting of a woman in a flowing silk gown."
6. Ensure the final rewritten prompt is safe for work and MUST NOT contain any nudity, gore, violence, hate speech, or explicit adult content.

Example:
User: "bike"
AI: "A sports motorcycle parked on a street with evening lights."

Now rewrite this user prompt with full clarity and detail:
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
