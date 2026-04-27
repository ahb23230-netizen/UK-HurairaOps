import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// CORS configuration - allow ALL origins for production
app.use(cors({
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Chat endpoint - proxies to Anthropic securely
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Get API key from environment variable (secure, never exposed to frontend)
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      console.error('API key not found in environment');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Call Anthropic API from server-side (secure, no CORS issues)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: systemPrompt || 'You are a helpful assistant.',
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API Error:', data.error);
      return res.status(response.status).json({
        error: data.error?.message || 'API request failed'
      });
    }

    // Return the response
    res.json({ reply: data.content[0].text });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Secure API Proxy running on port ${PORT}`);
});
