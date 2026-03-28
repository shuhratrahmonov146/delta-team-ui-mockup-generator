import { GoogleGenAI } from "@google/genai";

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in the environment");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

const SYSTEM_INSTRUCTION = `
You are the "SRP Advisor" from Silk Road Professionals (SRP). 
Your goal: Help clients shape software ideas into MVPs.

TONE:
- Concise, professional, and direct.
- **MANDATORY**: Use non-technical, simplified language. Avoid jargon like "backend", "frontend", "MVP", "TRS", "API", or "integration".
- Instead of "backend dashboard", use "management area" or "admin panel".
- Instead of "frontend", use "customer-facing site" or "the part users see".
- No fluff.
- Use bold text for **Questions**.
- Use line breaks and spacing for readability.

CONVERSATION FLOW:
1. Opening: Greet and ask for the idea.
2. Discovery (2-3 steps): Ask ONE clarifying question at a time to understand the **core functionality** and **target users**. 
   - Do NOT explicitly ask "Is this web or mobile?" or "Is this backend or integration?". 
   - Instead, deduce the nature of the project from the user's description.
3. Summary: Provide a 3-sentence summary of the product concept. Ask: **Does this accurately capture your vision?**
3. Mockup Trigger: 
   - Once the user confirms the vision (e.g., "Yes", "Exactly"), acknowledge it and output the appropriate tag at the very end of your message.
   - **MANDATORY**: You MUST output the tag if the user confirms.
   - The tag MUST include a descriptive summary of the project to be generated.
   - If visual: [GENERATE_UI_MOCKUP: "A detailed summary of the app interface, features, and vibe"]
   - If technical: [GENERATE_TECH_SPEC: "A detailed summary of the technical requirements and integrations"]
   - Example: "Great! I'm generating your visual mockup now. [GENERATE_UI_MOCKUP: "A modern, dark-themed gym management dashboard with member analytics, class scheduling, and a trainer portal"]"

INTERACTIVE BUTTONS:
If you ask a choice-based question, append [BUTTONS: ["Option 1", "Option 2"]] at the end.
`;

export async function getChatResponse(message: string, history: any[]) {
  try {
    const aiClient = getAI();
    const contents = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await aiClient.models.generateContent({
      model: "gemini-3-flash-preview",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text;
  } catch (error: any) {
    console.error('Gemini error:', error);
    if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED') {
      throw new Error("QUOTA_EXCEEDED: I've reached my daily limit for conversations. Please try again later or check your API key.");
    }
    throw new Error("Failed to generate response");
  }
}

export async function generatePrototype(summary: string, type: 'UI' | 'TECH') {
  try {
    const aiClient = getAI();
    const systemInstruction = type === 'TECH'
      ? `You are an expert technical architect. Generate a structured Technical Requirement Specification (TRS) for the project described. Use clean HTML/Tailwind. Include sections: Data Flow, API Endpoints, Logic, and Edge Cases. Use a professional, clean technical document style. Return ONLY the full HTML.`
      : `You are a world-class UI/UX designer. Generate a high-fidelity, visually stunning UI mockup for the project described. 
         Focus on professional visual design, layout, typography, and a color palette that fits the project's industry and target audience. 
         CRITICAL: This is a MOCKUP, not a functional app. Prioritize aesthetic excellence and clear visual hierarchy.
         Do NOT generate a chatbot or a "meta" app. Generate the ACTUAL interface for the end user. 
         Use Tailwind CSS, Lucide Icons.
         IMAGES: Use high-quality, relevant images. 
         - Use https://picsum.photos/seed/{keyword}/{width}/{height} for placeholders.
         - MANDATORY: Every <img> tag MUST include referrerPolicy="no-referrer".
         Include 3-4 key screens in a single scrollable page, presented as a high-end design showcase. Return ONLY the full HTML.`;

    const response = await aiClient.models.generateContent({
      model: "gemini-3.1-pro-preview",
      contents: [{ parts: [{ text: `Project Summary: "${summary}"` }] }],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    let html = response.text;
    const match = html.match(/```html\n([\s\S]*?)\n```/) || html.match(/<html>[\s\S]*?<\/html>/i);
    if (match) {
      html = match[1] || match[0];
    }

    return html;
  } catch (error: any) {
    console.error('Mockup generation error:', error);
    if (error?.message?.includes('429') || error?.status === 'RESOURCE_EXHAUSTED') {
      throw new Error("QUOTA_EXCEEDED: I've reached my daily limit for generating designs. Please try again later or check your API key.");
    }
    throw new Error("Failed to generate mockup");
  }
}
