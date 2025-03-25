import { OpenAI } from "openai";
import configsEnv from "../configs/configs.env";

export interface OpenAIResponse {
  success: boolean;
  data?: string;
  error?: string;
}

const openai = new OpenAI({
  apiKey: configsEnv.OPEN_AI_KEY,
});

class OpenAIService {
  async getUXInsights(promptData: string): Promise<OpenAIResponse> {
    try {
      const prompt = `Analyze the following website and provide actionable UX insights:
                  Website Info: ${promptData}
                  Provide structured insights with sections: UI Design, Accessibility, Conversion Rate Optimization, Performance, and Usability.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful UX expert." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      });
      const result = response.choices[0]?.message?.content?.trim();
      if (!result) throw new Error("No response from OpenAI");

      return {
        success: true,
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  }
}

export default new OpenAIService();
