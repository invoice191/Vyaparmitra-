
import { GoogleGenAI } from "@google/genai";
import { BusinessInsightResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBusinessInsights = async (dashboardType: string, data: any): Promise<BusinessInsightResponse> => {
  try {
    const prompt = `
      Act as a senior business analyst and market strategist specialized in the Indian retail sector. 
      Analyze the following ${dashboardType} data for an Indian retail vendor:
      ${JSON.stringify(data)}
      
      Tasks:
      1. Provide a concise summary of business health.
      2. Identify 3 key internal strengths.
      3. Identify 3 actionable recommendations.
      4. Search for current Indian market trends in this retail category and suggest how the vendor can capitalize on them right now.
      
      Constraints:
      - Use Indian Rupee (₹) for all currency mentions.
      - Use the Indian numbering system (Lakhs/Crores) where appropriate.
      - Format as clean Markdown. Use bold for key metrics.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "Unable to generate insights at this time.";
    
    const sources: { uri: string; title: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.web?.uri && chunk.web?.title) {
          sources.push({ uri: chunk.web.uri, title: chunk.web.title });
        }
      });
    }

    return {
      text,
      sources: Array.from(new Map(sources.map(s => [s.uri, s])).values())
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      text: "Error connecting to AI analyst. Please try again later." 
    };
  }
};

export const getSupportResponse = async (userMessage: string, chatHistory: {role: string, parts: string}[]): Promise<string> => {
  try {
    const prompt = `
      You are the AI Assistant for Vyaparmitra, a BI platform for Indian retail vendors.
      Your goal is to help users understand how to use the platform and answer business growth questions.
      Platform features: Executive Summary, Customer Analytics, Inventory Management (Aging, Supplier Matrix), AI Insights.
      User asked: "${userMessage}"
      Be helpful, concise, and professional. Use Indian business context.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "I'm sorry, I'm having trouble connecting right now. How else can I help you?";
  } catch (error) {
    console.error("Support API Error:", error);
    return "I am currently offline. Please try again in a moment.";
  }
};