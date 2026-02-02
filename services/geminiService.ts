
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFuturePrediction = async (sender: string, recipient: string): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Write a short, whimsical, and romantic 2-sentence "Future Decree" for a couple named ${sender} and ${recipient}. 
            Make it sound like a poetic prophecy. For example: "The stars align to show a lifetime where their laughter echoes in a house filled with morning sunlight. 
            A journey where every step taken together becomes a beautiful story written in the sands of time." 
            Keep it under 50 words. Do not use hashtags.`,
            config: {
                temperature: 0.8,
            }
        });
        return response.text || "A lifetime of laughter, shared sunrises, and quiet moments that turn into forever.";
    } catch (error) {
        console.error("Gemini Future Prediction Error:", error);
        return "A future where every day is a new reason to fall in love all over again, signed by destiny itself.";
    }
};
