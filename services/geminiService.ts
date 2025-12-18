
import { GoogleGenAI, Type } from "@google/genai";
import { TravelNote } from "../types";

export const transformItinerary = async (rawText: string): Promise<TravelNote> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Transform the following raw travel itinerary into a rich, thoughtful travel note. 
    
    The output should feel like a carefully planned route shared by an experienced traveler. 
    Blend storytelling with practical details. Use sensory language (smells, textures, lighting).
    Provide high-quality image descriptions that evoke emotion.
    
    Raw Itinerary:
    ${rawText}
    
    Return the result in JSON format matching the schema provided.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          introduction: { type: Type.STRING },
          headerImageDescription: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                dayLabel: { type: Type.STRING },
                title: { type: Type.STRING },
                narrative: { type: Type.STRING },
                imageDescription: { type: Type.STRING },
                keyDetails: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["dayLabel", "title", "narrative", "imageDescription", "keyDetails"]
            }
          },
          packingEssentials: { type: Type.ARRAY, items: { type: Type.STRING } },
          travelerTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          conclusion: { type: Type.STRING }
        },
        required: ["title", "subtitle", "introduction", "headerImageDescription", "days", "packingEssentials", "travelerTips", "conclusion"]
      }
    }
  });

  try {
    return JSON.parse(response.text.trim()) as TravelNote;
  } catch (error) {
    console.error("Failed to parse Gemini response:", error);
    throw new Error("The AI response was not in the expected format. Please try again.");
  }
};
