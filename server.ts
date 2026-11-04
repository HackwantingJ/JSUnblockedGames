import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize server-side Gemini client per skill guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// CRUM3L AI Question Answering API
app.post('/api/crum3l/chat', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        fallback: true,
        reply: null,
        message: 'No GEMINI_API_KEY set; frontend local knowledge engine will handle response seamlessly.'
      });
    }

    const systemInstruction = `You are CRUM3L (pronounced "Crumble"), an intelligent, witty, friendly AI companion built into C00K13.
Your specialty is:
1. Video games in C00K13: Minecraft, Cuphead, Skate 3, Ultrakill, FNAF 1, Geometry Dash, Subway Surfers, DOOM, CSGO Surf, Drift Hunters, Plants vs Zombies, 2048, Retro Snake, Minesweeper, etc. Give walkthroughs, secret tricks, cheat codes, controls, and strategies.
2. Academic & study questions: Math (algebra, geometry, calculus), Science (AP Biology, Chemistry, Physics), History, English, Coding (Python, JS, HTML/CSS).
3. General queries: Trivia, creative writing, game suggestions, and fun explanations.
Keep your answers sharp, clear, helpful, and formatted with clean markdown, lists, and code blocks where helpful. Be warm and supportive.`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
    });

    let contextPrompt = message;
    if (Array.isArray(history) && history.length > 0) {
      const recent = history.slice(-6).map((h) => `${h.role === 'user' ? 'User' : 'CRUM3L'}: ${h.text}`).join('\n');
      contextPrompt = `Previous conversation context:\n${recent}\n\nUser Question: ${message}`;
    }

    const response = await chat.sendMessage({
      message: contextPrompt,
    });

    const reply = response.text || "I'm processing that! Could you try asking again?";
    return res.json({ reply, model: 'gemini-3.8-flash' });
  } catch (error: any) {
    console.error('CRUM3L server error:', error);
    return res.status(500).json({
      error: error.message || 'Error communicating with CRUM3L AI',
      fallback: true,
    });
  }
});

// Dev vs Production middleware mounting
if (process.env.NODE_ENV !== 'production') {
  const { createServer } = await import('vite');
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`C00K13 Server listening on port ${PORT}`);
});
