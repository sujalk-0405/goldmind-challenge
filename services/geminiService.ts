import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// We handle missing API key gracefully in the UI, but initializing here.
const ai = new GoogleGenAI({ apiKey });

export const getAiHint = async (question: string, options: string[], subject: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I cannot connect to the AI service right now (API Key missing). However, try to eliminate the least likely options based on your subject knowledge!";
  }

  try {
    const prompt = `
      You are a helpful assistant in a high-stakes quiz game show.
      The subject is ${subject}.
      The question is: "${question}"
      The options are: ${options.join(', ')}.
      
      Please provide a helpful, concise hint to guide the player towards the correct answer without explicitly stating it. 
      Keep it under 30 words. Be encouraging.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "I couldn't generate a hint at this moment.";
  } catch (error) {
    console.error("Error fetching AI hint:", error);
    return "I'm having trouble thinking right now. You're on your own for this one!";
  }
};