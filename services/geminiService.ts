import { GoogleGenAI } from "@google/genai";
import { GenerationRequest } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLogoImage = async (request: GenerationRequest): Promise<string> => {
  try {
    const prompt = `
      Create a professional, high-quality logo design for a brand named "${request.brandName}".
      ${request.tagline ? `Tagline (optional text in logo): "${request.tagline}".` : ''}
      Brand Description: ${request.description}.
      Art Style: ${request.style}.
      Color Palette: ${request.colors}.
      
      Requirements:
      - Vector art aesthetic
      - Clean, professional background (solid color or transparent feel)
      - High contrast and visibility
      - No realistic photo elements, strictly graphic design
      - Centered composition
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1",
        }
      }
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("No image candidates returned from Gemini.");
    }

    const content = response.candidates[0].content;
    
    // Iterate to find the image part
    for (const part of content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        return `data:image/png;base64,${base64EncodeString}`;
      }
    }

    throw new Error("No image data found in response.");

  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
