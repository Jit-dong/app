'use server';
/**
 * @fileOverview An AI agent that suggests components based on a Bill of Materials (BOM).
 *
 * - suggestComponentFromBOM - A function that handles the component suggestion process from a BOM.
 * - SuggestComponentFromBOMInput - The input type for the suggestComponentFromBOM function.
 * - SuggestComponentFromBOMOutput - The return type for the suggestComponentFromBOM function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestComponentFromBOMInputSchema = z.object({
  bomDataUri: z
    .string()
    .describe(
      "物料清单 (BOM) 文件，格式为数据 URI，必须包含 MIME 类型并使用 Base64 编码。预期格式：'data:<mimetype>;base64,<encoded_data>'。"
    ),
  description: z.string().describe('任何附加要求或背景信息。'),
});
export type SuggestComponentFromBOMInput = z.infer<typeof SuggestComponentFromBOMInputSchema>;

const SuggestComponentFromBOMOutputSchema = z.object({
  suggestedComponent: z.string().describe('基于 BOM 建议的元件。'),
  reasoning: z.string().describe('AI 建议元件的理由。'),
});
export type SuggestComponentFromBOMOutput = z.infer<typeof SuggestComponentFromBOMOutputSchema>;

export async function suggestComponentFromBOM(input: SuggestComponentFromBOMInput): Promise<SuggestComponentFromBOMOutput> {
  return suggestComponentFromBOMFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestComponentFromBOMPrompt',
  input: {schema: SuggestComponentFromBOMInputSchema},
  output: {schema: SuggestComponentFromBOMOutputSchema},
  prompt: `你是一个 AI 助手，根据物料清单 (BOM) 和附加要求建议电子元件。

  分析 BOM 并考虑附加要求，以建议最合适的元件。

  BOM 数据: {{media url=bomDataUri}}
  附加要求: {{{description}}}

  请建议一个元件并解释你的理由。`,
});

const suggestComponentFromBOMFlow = ai.defineFlow(
  {
    name: 'suggestComponentFromBOMFlow',
    inputSchema: SuggestComponentFromBOMInputSchema,
    outputSchema: SuggestComponentFromBOMOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

