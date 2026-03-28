import { GoogleGenAI } from "@google/genai";
import { ColourToken } from "../types";

// The API key is defined in vite.config.ts and injected via process.env
const API_KEY = (process.env as any).GEMINI_API_KEY || "";

const client = new GoogleGenAI({ apiKey: API_KEY });

export const getPaletteSuggestions = async (colours: ColourToken[]): Promise<Record<string, string>> => {
    if (!API_KEY) {
        console.warn("GEMINI_API_KEY is not defined. Returning mock suggestions.");
        return mockSuggestions(colours);
    }

    try {
        const prompt = `
            You are a professional UI/UX designer. I have a design system with the following color tokens:
            ${JSON.stringify(colours, null, 2)}

            Please suggest a harmonious color palette for these tokens. 
            Return the suggestions as a JSON object where the keys are the "name" of the color token and the values are the hex color codes.
            Only return the JSON object, nothing else.
        `;

        const result = await client.models.generateContent({
            model: "gemini-1.5-flash",
            contents: prompt
        });
        
        const text = result.text || "";
        
        // Extract JSON from the response text (it might be wrapped in code blocks)
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        
        throw new Error("Failed to parse JSON from Gemini response");
    } catch (error) {
        console.error("Error fetching palette suggestions:", error);
        return mockSuggestions(colours);
    }
};

const mockSuggestions = (colours: ColourToken[]): Record<string, string> => {
    const mocks: Record<string, string> = {
        primary: "#3B82F6",
        secondary: "#64748B",
        tertiary: "#F59E0B",
        error: "#EF4444",
        background: "#F8FAFC",
        surface: "#FFFFFF",
        onPrimary: "#FFFFFF",
        onSecondary: "#FFFFFF",
        onSurface: "#0F172A",
    };

    const suggestions: Record<string, string> = {};
    colours.forEach(c => {
        if (mocks[c.name]) {
            suggestions[c.name] = mocks[c.name];
        } else {
            suggestions[c.name] = c.value;
        }
    });

    return suggestions;
};
