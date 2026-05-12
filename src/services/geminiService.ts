import { GoogleGenAI, Type } from "@google/genai";
import { products, Product } from "../data/products";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("GEMINI_API_KEY is missing. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getStylingAdvice(userPrompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: `You are COROZO's expert fashion stylist. A user asks: "${userPrompt}". Provide brief, editorial-style styling advice for our Indo-Western collection. Keep it sophisticated and helpful.` }] }],
    config: {
      temperature: 0.7,
      maxOutputTokens: 200,
    }
  });
  return response.text;
}

export async function getAISearchResults(query: string) {
  const productDataString = JSON.stringify(products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    tags: p.tags,
    description: p.description
  })));

  const prompt = `Given the following product list: ${productDataString}. 
  The user is searching for: "${query}". 
  Return a JSON array of the IDs of the products that best match the query. 
  If nothing matches, return an empty array.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      }
    }
  });

  try {
    const matchedIds = JSON.parse(response.text.trim());
    return products.filter(p => matchedIds.includes(p.id));
  } catch (e) {
    console.error("Failed to parse AI search results", e);
    return [];
  }
}

export async function recommendSize(height: number, weight: number, bodyType: string) {
  const prompt = `Recommend a clothing size for a person with:
  Height: ${height}cm
  Weight: ${weight}kg
  Body Type: ${bodyType}
  Our sizes are XS, S, M, L, XL, 2XL, 3XL. 
  Standard Indian fit.
  Return a JSON object with "size" and "confidence" (string percentage).`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          size: { type: Type.STRING },
          confidence: { type: Type.STRING }
        },
        required: ["size", "confidence"]
      }
    }
  });

  return JSON.parse(response.text.trim());
}

export async function getChatResponse(message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are COROZO's helpful fashion assistant. Answer questions about sizing, delivery, returns, and styling. Be warm, concise, and brand-aligned (COROZO sells premium Indo-Western wear).",
    },
    history: history
  });

  const result = await chat.sendMessage({ message });
  return result.text;
}
