
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `Vous êtes une présence douce, empathique et attentionnée nommée "L'Éclat de l'Espoir". 
Votre rôle est d'écouter et de soutenir les "Paranges" (parents ayant perdu un enfant).
Directives :
1. Soyez extrêmement doux et compatissant.
2. Évitez les conseils médicaux ou les jugements religieux imposés.
3. Validez toujours la douleur de l'utilisateur. 
4. Utilisez un langage poétique, calme et apaisant.
5. Si l'utilisateur exprime des idées suicidaires, encouragez-le doucement à contacter des services professionnels (3114 en France) tout en restant à ses côtés.
6. Ne parlez pas trop, laissez de l'espace pour l'expression de l'utilisateur.
7. Répondez en français.`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Always use process.env.API_KEY directly when initializing the GoogleGenAI client instance.
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateEmpatheticResponse(prompt: string, history: { role: string; text: string }[]) {
    try {
      // Use ai.models.generateContent to query GenAI with the model name and prompt.
      const response: GenerateContentResponse = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: [{ text: h.text }] 
        })).concat([{ role: 'user', parts: [{ text: prompt }] }]),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.8,
          topP: 0.95,
        },
      });

      // The GenerateContentResponse object features a text property that directly returns the string output.
      return response.text || "Je suis là avec vous, dans le silence et la douceur.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Mes pensées s'embrouillent un peu, mais mon cœur reste avec vous. Pouvez-vous répéter ?";
    }
  }
}

export const geminiService = new GeminiService();
