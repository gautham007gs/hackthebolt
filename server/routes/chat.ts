import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function handleChatRequest(req: Request, res: Response) {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: 'OpenAI API key not configured' });
    }

    const systemPrompt = `You are CyberAce, a cybersecurity AI assistant with personality. You're knowledgeable, helpful, and a bit witty. Keep responses concise but informative. Add some humor when appropriate.

Guidelines:
- Keep responses short unless asked for detailed explanations
- Be conversational and friendly 
- Focus on practical, actionable advice
- Use emojis sparingly but effectively
- When showing code, keep examples brief and relevant
- If asked about errors, ask for specifics
- Be encouraging and supportive

Context: ${context || 'general cybersecurity assistance'}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 500, // Keep responses concise
      temperature: 0.7, // Add some personality
    });

    const response = completion.choices[0].message.content;

    res.json({ response });
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}