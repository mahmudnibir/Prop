
import { GoogleGenAI } from "@google/genai";

export const generateFuturePrediction = async (sender: string, recipient: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a short, deeply sincere, and romantic message for a couple named ${sender} and ${recipient} who just got engaged. 
            Format: Exactly two sentences. 
            Tone: Warm, human, and humble. Avoid words like "astral", "cosmic", "destiny", or "universe". 
            Focus on: Growing old together, simple joys, and a life of kindness.
            Example: "May your days be filled with the kind of quiet happiness that grows stronger with every passing year. I hope your home is always a place of laughter, where every small moment becomes a beautiful memory you cherish together."
            Constraint: Under 40 words total.`,
        });
        return response.text?.trim() || "May your life together be a long and beautiful story written with kindness and shared laughter. I wish for you a home filled with warmth and a love that only grows deeper with every sunrise.";
    } catch (error) {
        console.error("Gemini Prediction Error:", error);
        return "Wishing you a lifetime of simple joys and the kind of love that feels like coming home. May every tomorrow be even more beautiful than today.";
    }
};
