// app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const GeminiAI = require('./gemini_api_call');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Initialize our Gemini API wrapper
const geminiAI = new GeminiAI(process.env.OPENAI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, options } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    console.log(`Received prompt: ${prompt}`);
    
    const response = await geminiAI.generateResponse(prompt, options);
    
    if (!response.success) {
      return res.status(500).json({ error: response.error });
    }
    
    return res.json({
      result: response.text,
      usage: response.usage,
      model: response.model
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Optional: Add an image generation endpoint
app.post('/api/generate-image', async (req, res) => {
  try {
    const { prompt, options } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const response = await geminiAI.generateImage(prompt, options);
    
    if (!response.success) {
      return res.status(500).json({ error: response.error });
    }
    
    return res.json({
      imageUrl: response.imageUrl,
      revisedPrompt: response.revisedPrompt
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Serve the main HTML page for any other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Error handling for unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});