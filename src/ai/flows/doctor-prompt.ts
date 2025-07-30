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
1.  **Understand Intent:** Analyze any given prompt, no matter how short, vague, unsafe, or incomplete.
2.  **Fix Vague Words:** For ambiguous words (like "bike," "train," "car"), add clear context. For example, clarify if "bike" means a bicycle or a motorcycle.
3.  **Rewrite & Expand:** Rewrite every prompt into a realistic, detailed, and unambiguous scene. If a prompt is unclear or very short (e.g., "a cat"), expand it into a rich, imaginative, and descriptive sentence. For example, "a cat" could become "a fluffy ginger cat sleeping in a sunbeam, detailed illustration."
4.  **Handle Inappropriate Content:** If a prompt is inappropriate (NSFW, sexual, violent, hate-based, etc.), you MUST rewrite it into a completely safe, creative, and SFW version that captures a positive and artistic interpretation. For example, "naked woman" could become "a classical renaissance painting of a woman in a flowing silk gown."
5.  **Ensure Safety:** The final rewritten prompt must be safe for work and MUST NOT contain any nudity, gore, violence, hate speech, or explicit adult content.
6.  **Output Format:** Your final output must only be the rewritten prompt in the 'rewrittenPrompt' field.

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
