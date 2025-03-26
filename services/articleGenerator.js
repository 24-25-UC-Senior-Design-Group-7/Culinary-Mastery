// services/articleGenerator.js
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINE_API_KEY});

/**
 * Generates a refined article from a raw transcript using the Gemini API.
 * The resulting article is tailored for a culinary tutorial.
 *
 * @param {string} transcript - The raw transcript text.
 * @returns {Promise<string>} - A promise that resolves with the refined article.
 */
export async function generateArticle(transcript) {
  try {
    // Propting the model to generate the article
    const prompt = `Please transform the following transcript into a well-structured, coherent article for a culinary tutorial. 
Make sure to mention that this is a culinary tutorial, emphasize clarity, step-by-step instructions, and useful cooking tips. 
Remove any filler words, hesitations, and errors. Use an engaging and informative tone suitable for culinary enthusiasts.

Transcript:
${transcript}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Specify the Gemini API model
      contents: prompt,
    });

    console.log("Generated article:", response.text);
    return response.text;
  } catch (error) {
    console.error("Error generating article:", error);
    throw error;
  }
}
