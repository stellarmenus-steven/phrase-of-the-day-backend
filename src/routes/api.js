const express = require('express');
const router = express.Router();
const PhraseService = require('../services/phraseService');

// GET /api/v1/phrases - Get phrase of the day
router.get('/phrases', async (req, res) => {
  try {
    const level = req.query.level || 'beginner';
    
    // Validate level parameter
    if (level !== 'beginner' && level !== 'intermediate' && level !== 'advanced') {
      return res.status(400).json({
        error: 'Invalid level parameter',
        message: 'Level must be either "beginner", "intermediate", or "advanced"',
        validLevels: ['beginner', 'intermediate', 'advanced']
      });
    }

    // Get today's phrase from database
    const phrase = await PhraseService.getTodaysPhrase(level);
    
    // Format response to match existing structure
    const response = {
      phrases: [phrase],
      sponsor: {
        show: false,
        show_after: 45,
        headline: {
          en: "Today's Phrase is Sponsored by Hispa Nacho",
          es: "La Frase de Hoy es Patrocinada por"
        },
        image_url: "https://media.calendesk.com/calendesk-production/da0a6fd7-e5ae-4851-82a2-3b8adfc08bc8/688b91860686b.jpg",
        text: {
          en: "Interested in taking lessons?",
          es: "¿Interesado en tomar lecciones?"
        },
        button_text: {
          en: "Click Here",
          es: "Haz Clic Aquí"
        },
        button_url: "https://hispanacho.calendesk.net/"
      },
      level: level,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in /phrases endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve phrase data',
      details: error.message
    });
  }
});

// GET /api/v1/phrases/:id - Get specific phrase by ID
router.get('/phrases/:id', async (req, res) => {
  try {
    const phraseId = req.params.id;
    const phrase = await PhraseService.getPhraseById(phraseId);
    
    if (!phrase) {
      return res.status(404).json({
        error: 'Phrase not found',
        message: `No phrase found with ID ${phraseId}`
      });
    }

    res.json({ phrase });
  } catch (error) {
    console.error('Error in /phrases/:id endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve phrase data',
      details: error.message
    });
  }
});

// GET /api/v1/health - API health check
router.get('/health', async (req, res) => {
  try {
    // Check database connection
    const mongoose = require('mongoose');
    const dbState = mongoose.connection.readyState;
    const dbStatus = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };

    const healthData = {
      status: 'OK',
      service: 'phrase-of-the-day-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      database: {
        status: dbStatus[dbState] || 'unknown',
        connected: dbState === 1,
        host: mongoose.connection.host || null,
        name: mongoose.connection.name || null,
        port: mongoose.connection.port || null
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024)
      }
    };

    // If database is not connected, change overall status
    if (dbState !== 1) {
      healthData.status = 'DEGRADED';
      healthData.database.error = 'Database connection is not established';
    }

    res.json(healthData);
  } catch (error) {
    console.error('API health check error:', error);
    res.status(500).json({
      status: 'ERROR',
      service: 'phrase-of-the-day-api',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      error: error.message,
      database: {
        status: 'error',
        connected: false,
        error: 'Failed to check database status'
      }
    });
  }
});

module.exports = router;
