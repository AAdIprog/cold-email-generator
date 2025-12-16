import { GoogleGenerativeAI } from '@google/generative-ai';

export interface EmailGenerationParams {
    audience: string;
    product: string;
    valueProps: string;
    tone: string;
    length: string;
    cta: string;
    additionalReqs?: string;
}

import { RateLimiter } from '../utils/rateLimit';

// Limit to 14 requests per minute to be safe (under 15 limit)
const limiter = new RateLimiter(14, 60000);

export const generateEmail = async (params: EmailGenerationParams): Promise<{ subject: string; body: string }> => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error('Gemini API Key is missing');
    }

    // Wait for rate limit token
    await limiter.waitForToken();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

    const prompt = `
    You are an expert cold email copywriter. Generate a cold email based on these requirements:

    Target Audience: ${params.audience}
    Product/Service: ${params.product}
    Key Value Propositions: ${params.valueProps}
    Desired Tone: ${params.tone}
    Email Length: ${params.length}
    Call-to-Action: ${params.cta}
    Additional Requirements: ${params.additionalReqs || 'None'}

    Follow these best practices:
    - Personalized subject line
    - Strong opening hook
    - Clear value proposition
    - Social proof if relevant
    - Single clear CTA
    - Professional closing

    Output the email in this JSON format ONLY, do not add any markdown formatting or code blocks:
    {
      "subject": "The generated subject line",
      "body": "The generated email body"
    }
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up potential markdown code block artifacts if the model ignores instruction
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);
    } catch (error: any) {
        console.warn('Gemini API Error:', error.message);
        console.log('Falling back to MOCK response for development...');

        // Mock response to unblock development
        return {
            subject: `[MOCK] Unlock Growth for ${params.audience}`,
            body: `Hi there,\n\nI noticed you're targeting ${params.audience} and I wanted to reach out.\n\nOur tool, ${params.product}, helps you ${params.valueProps.split(',')[0] || 'achieve your goals'}.\n\n(Note: This is a generated mock email because the AI API key is invalid or missing).\n\nBest,\n[Your Name]`
        };
    }
};
