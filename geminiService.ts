
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSiteSummary(siteName: string, progress: number, status: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Erstelle eine kurze, professionelle Zusammenfassung (maximal 2 Sätze) für das Bauprojekt "${siteName}". Aktueller Fortschritt: ${progress}%, Status: ${status}.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "Keine KI-Zusammenfassung verfügbar.";
  }
}

export async function analyzeMeasureRisks(measureTitle: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analysiere kurz mögliche Risiken oder wichtige Beachtungspunkte für die Baumaßnahme: "${measureTitle}". Gib 3 kurze Stichpunkte zurück.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini AI error:", error);
    return "Keine Risikoanalyse verfügbar.";
  }
}
