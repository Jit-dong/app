// 'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting chips based on a text description of requirements.
 *
 * - chipSuggestion - A function that takes a text description and returns a component recommendation.
 * - ChipSuggestionInput - The input type for the chipSuggestion function.
 * - ChipSuggestionOutput - The return type for the chipSuggestion function.
 */

'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChipSuggestionInputSchema = z.object({
  description: z.string().describe('元件需求的文本描述。'),
});
export type ChipSuggestionInput = z.infer<typeof ChipSuggestionInputSchema>;

const ChipSuggestionOutputSchema = z.object({
  recommendation: z.string().describe('根据描述推荐的元件。'),
  reasoning: z.string().describe('推荐背后的理由。'),
});
export type ChipSuggestionOutput = z.infer<typeof ChipSuggestionOutputSchema>;

export async function chipSuggestion(input: ChipSuggestionInput): Promise<ChipSuggestionOutput> {
  return chipSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chipSuggestionPrompt',
  input: {schema: ChipSuggestionInputSchema},
  output: {schema: ChipSuggestionOutputSchema},
  prompt: `你是一个 AI 助手，帮助用户找到满足其需求的电子元件。

  根据用户的描述，建议一个元件并解释你的理由。

  描述: {{{description}}}
  `,
});

const chipSuggestionFlow = ai.defineFlow(
  {
    name: 'chipSuggestionFlow',
    inputSchema: ChipSuggestionInputSchema,
    outputSchema: ChipSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

