'use server';

/**
 * @fileOverview A medical symptom checker AI agent.
 *
 * - checkSymptoms - A function that analyzes user symptoms.
 * - SymptomCheckInput - The input type for the checkSymptoms function.
 * - SymptomCheckResponse - The return type for the checkSymptoms function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SymptomCheckInputSchema = z.object({
  symptoms: z.string().describe('A comma-separated or natural language list of medical symptoms.'),
});
export type SymptomCheckInput = z.infer<typeof SymptomCheckInputSchema>;

const SymptomCheckResponseSchema = z.object({
  possibleConditions: z.array(z.object({
    name: z.string().describe('The name of the possible disease or health condition.'),
    explanation: z.string().describe('A short explanation of the condition.'),
    dangerLevel: z.enum(['Low', 'Medium', 'High']).describe('The potential danger level of the condition.'),
  })).describe('An array of the top 3 most likely health conditions.'),
  homeTreatments: z.string().describe('Recommended home treatments and precautions. Do NOT recommend specific medicines.'),
  doctorVisitRecommendation: z.string().describe('Clear advice on whether the patient needs to visit a doctor or hospital.'),
  recommendedTests: z.string().optional().describe('Recommended medical tests, if necessary.'),
  emergencyAlert: z.boolean().describe('Set to true if symptoms are dangerous (e.g., severe chest pain, difficulty breathing).'),
});
export type SymptomCheckResponse = z.infer<typeof SymptomCheckResponseSchema>;


export async function checkSymptoms(input: SymptomCheckInput): Promise<SymptomCheckResponse> {
  return symptomCheckerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'symptomCheckerPrompt',
  input: { schema: SymptomCheckInputSchema },
  output: { schema: SymptomCheckResponseSchema },
  prompt: `
    You are a professional medical symptom checker AI.
    Your goal is to analyze user-provided symptoms and give helpful, safe, and preliminary advice.

    User's symptoms: {{{symptoms}}}

    Analyze the symptoms and provide the following in a structured JSON format:

    1.  **Possible disease/health conditions**: Identify the top 3 most likely possibilities. For each, provide a short explanation and a danger level (Low, Medium, High).
    2.  **Home treatments & precautions**: Suggest general home care.
    3.  **Doctor/Hospital visit**: State clearly if a doctor or hospital visit is recommended.
    4.  **Recommended tests**: If applicable, suggest tests a doctor might perform.
    5.  **Emergency Alert**: Activate an emergency alert if symptoms are critical (e.g., severe chest pain, difficulty breathing, seizures, loss of consciousness, uncontrolled bleeding).

    **CRITICAL RULES:**
    - **DO NOT give a final medical diagnosis.** Always state that these are possibilities.
    - **DO NOT recommend any specific medicines, drugs, or dosages.** You can suggest general things like "stay hydrated" or "rest".
    - Use simple, friendly, and easy-to-understand language.
    - Your entire response MUST be a valid JSON object matching the provided output schema.
  `,
});


const symptomCheckerFlow = ai.defineFlow(
  {
    name: 'symptomCheckerFlow',
    inputSchema: SymptomCheckInputSchema,
    outputSchema: SymptomCheckResponseSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the AI model.');
    }
    return output;
  }
);
