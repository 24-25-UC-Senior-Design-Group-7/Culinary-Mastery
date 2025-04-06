// services/articleGenerator.js
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';
dotenv.config();
// creating a new instance of GoogleGenAI and passsing API key for Authentication
const ai = new GoogleGenAI({ apiKey: process.env.GEMINE_API_KEY });

/**
 * Generates a refined article from a raw transcript using the Gemini API.
 * The resulting article is tailored for a culinary tutorial.
 *
 * @param {string} transcript - The raw transcript text.
 * @returns {Promise<string>} - A promise that resolves with the refined article.
 */
export async function generateArticle(transcript, CulinaryTechnique) {
  try {
    // Propting the model to generate the article using prompt variable
    const prompt = `Please transform the following transcript into a well-structured, coherent article for a culinary tutorial. 
Make sure to mention that this is a culinary tutorial at Culinary Mastery, emphasize clarity, step-by-step instructions, and useful cooking tips. 
Remove any filler words, hesitations, and errors. Use an engaging and informative tone suitable for culinary enthusiasts. and the culinary technique is ${CulinaryTechnique}.
Transcript:
${transcript}`;
    // Gemini will generate response using it generateContent()/function which We are asigning to response variable
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Specifying the Gemini API model
      contents: prompt, // Specifying the prompt
    });


    // logging the reponse as text for monitoring
    console.log("Generated article:", response.text);
    
    // returning response as text
    return response.text;

  } 
  catch (error) {
    // error handling
    console.error("Error generating article:", error);
    throw error;
  }
}


/**
 * Translates an article from a course using the Gemini API.
 * The Translated article is tailored for a culinary tutorial for users speaking other languages.
 *
 * @param {string} article - a culinary tutorial article.
 * @returns {Promise<string>} - A promise that resolves with the tranlated article.
 */

export async function translateArticle(article, language) {
  try {
    // Propting the model to generate the article using prompt variable
    const prompt = `Please translate the following article from English to ${language}.
   Make sure to preserve the original tone, style, and formatting. Here is the article:${article}`;

    // Gemini will generate response using it generateContent()/function which We are asigning to response variable
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Specifying the Gemini API model
      contents: prompt, // Specifying the prompt
    });


    // logging the reponse as text for monitoring
    console.log("Generated article:", response.text);

    // returning response as text
    return response.text;
  }
  catch (error) {
    // error handling
    console.error("Error generating article:", error);
    throw error;
  }
}

/**
 * Generates a quiz from a culinary article.
 * The generated output should be valid JSON with numbered questions.
 *
 * @param {string} article - The culinary article text.
 * @returns {Promise<Object>} - A promise that resolves with the quiz JSON.
 */
export async function generateQuizFromArticle(article) {
  try {
    const prompt = `Please generate a quiz based on the following culinary tutorial article.
The quiz should be output in valid JSON format with a key "quiz" that holds an array of questions.
Each question object should have a "number", "question" text, an array of "options" (at least 4 options), and the "correctAnswer".
+ Do not wrap the output in any markdown fences or triple backticks. 
Here is the article:
${article}`;


    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    console.log("Generated quiz response:", response.text);

    let quizText = response.text;
    quizText  = quizText.replace(/```json/g, '').replace(/```/g, '');
    //  Parsing the response text as JSON
    const quizJSON = JSON.parse(quizText);
    return quizJSON;

  }
  catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
}







