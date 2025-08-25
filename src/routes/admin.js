const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { writeFileSync } = require('node:fs');
const path = require('path');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Admin dashboard - Main page
router.get('/', (req, res) => {
  res.render('admin/dashboard', {
    title: 'Admin Dashboard',
    page: 'dashboard',
    stats: {
      totalPhrases: 1,
      totalUsers: 0,
      todayRequests: 0
    }
  });
});

// Admin phrases management
router.get('/phrases', (req, res) => {
  res.render('admin/phrases', {
    title: 'Manage Phrases',
    page: 'phrases'
  });
});

// Admin users management
router.get('/users', (req, res) => {
  res.render('admin/users', {
    title: 'Manage Users',
    page: 'users'
  });
});

// Admin settings
router.get('/settings', (req, res) => {
  res.render('admin/settings', {
    title: 'Admin Settings',
    page: 'settings'
  });
});

// Admin audio generation
router.get('/audio', (req, res) => {
  res.render('admin/audio', {
    title: 'Generate Audio',
    page: 'audio'
  });
});

// Generate audio endpoint
router.post('/audio/generate', async (req, res) => {
  try {
    const { fileName, text, voice = 'alloy', format = 'mp3', model = 'tts-1' } = req.body;

    console.log('Audio generation request:', {
      fileName,
      text: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      voice,
      format,
      model
    });

    if (!fileName || !text) {
      return res.status(400).json({ 
        success: false, 
        error: 'File name and text are required' 
      });
    }

    // Generate audio using OpenAI Text-to-Speech API
    console.log('Calling OpenAI TTS API with:', {
      model,
      voice,
      input: text.substring(0, 50) + (text.length > 50 ? '...' : ''),
      response_format: format
    });

    const response = await openai.audio.speech.create({
      model: model,
      voice: voice,
      input: text,
      response_format: format
    });

    console.log('OpenAI response received, content type:', response.headers.get('content-type'));

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
    const fs = require('fs');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Write audio data to file
    const filePath = path.join(uploadsDir, `${fileName}.${format}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    
    // Check if file already exists
    const fileExists = fs.existsSync(filePath);
    
    // Write file (this will overwrite if it exists)
    writeFileSync(filePath, buffer);
    
    const message = fileExists 
      ? `Audio file generated and overwritten successfully` 
      : 'Audio file generated successfully';

    res.json({
      success: true,
      message: message,
      filePath: `/uploads/${fileName}.${format}`,
      fileName: `${fileName}.${format}`,
      overwritten: fileExists
    });

  } catch (error) {
    console.error('Error generating audio:', error);
    
    // Handle specific OpenAI errors
    if (error.status) {
      console.error('OpenAI API Error Status:', error.status);
      console.error('OpenAI API Error Message:', error.message);
      
      if (error.status === 401) {
        return res.status(500).json({
          success: false,
          error: 'OpenAI API key is invalid or missing',
          details: 'Please check your OPENAI_API_KEY environment variable'
        });
      } else if (error.status === 400) {
        return res.status(500).json({
          success: false,
          error: 'Invalid request to OpenAI API',
          details: error.message
        });
      }
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to generate audio file',
      details: error.message
    });
  }
});

module.exports = router;
