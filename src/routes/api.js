const express = require('express');
const router = express.Router();

// Hardcoded phrase data
const phraseData = {
  "phrases": [
    {
      "id": 1,
      "phrase": "¡Más te vale!",
      "pronunciation": "mahs teh VAH-leh",
      "audio": {
        "url": "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale.mp3",
        "format": "mp3"
      },
      "date": {
        "spanish": "sábado, 24 de agosto de 2025",
        "dayName": "sábado",
        "monthName": "agosto", 
        "day": 24,
        "year": 2025
      },
      "meaning": {
        "en": "You better! You'd better!",
        "es": "¡Tienes que hacerlo!"
      },
      "context": {
        "en": "A warning or threat, often used by an authority figure.",
        "es": "Una advertencia o amenaza, a menudo usada por una figura de autoridad."
      },
      "formality": "informal",
      "regions": {
        "spain": {
          "usage": {
            "en": "Very common",
            "es": "Muy común"
          },
          "notes": {
            "en": "Often used with strong emphasis",
            "es": "A menudo se usa con mucho énfasis"
          }
        },
        "latinAmerica": {
          "usage": {
            "en": "Common", 
            "es": "Común"
          },
          "notes": {
            "en": "Sometimes softened to '¡Más te vale, eh!'",
            "es": "A veces se suaviza a '¡Más te vale, eh!'"
          }
        }
      },
      "examples": [
        {
          "spanish": "¡Más te vale llegar a tiempo!",
          "english": "You better arrive on time!",
          "context": {
            "en": "Parent to child",
            "es": "Padre/madre a hijo/a"
          },
          "audio": {
            "url": "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-llegar-a-tiempo.mp3",
            "format": "mp3"
          }
        },
        {
          "spanish": "¡Más te vale no mentirme!",
          "english": "You better not lie to me!",
          "context": {
            "en": "Friend to friend",
            "es": "Amigo/a a amigo/a"
          },
          "audio": {
            "url": "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-no-mentirme.mp3",
            "format": "mp3"
          }
        },
        {
          "spanish": "¡Más te vale estudiar para el examen!",
          "english": "You better study for the exam!",
          "context": {
            "en": "Teacher to student",
            "es": "Profesor/a a estudiante"
          },
          "audio": {
            "url": "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-estudiar-para-el-examen.mp3",
            "format": "mp3"
          }
        }
      ],
      "similarPhrases": [
        "¡Te conviene!",
        "¡Será mejor que...!",
        "¡Como no lo hagas...!"
      ],
      "difficulty": "intermediate",
      "tags": ["warning", "threat", "advice", "colloquial"]
    }
  ],
  "sponsor": {
    "show_after": 15,
    "headline": {
      "en": "Today's Phrase is Sponsored by Hispa Nacho",
      "es": "La Frase de Hoy es Patrocinada por"
    },
    "image_url": "https://media.calendesk.com/calendesk-production/da0a6fd7-e5ae-4851-82a2-3b8adfc08bc8/688b91860686b.jpg",
    "text": {
      "en": "Interested in taking lessons?",
      "es": "¿Interesado en tomar lecciones?"
    },
    "button_text": {
      "en": "Click Here",
      "es": "Haz Clic Aquí"
    },
    "button_url": "https://hispanacho.calendesk.net/"
  }
};

// GET /api/v1/phrases - Get phrase of the day
router.get('/phrases', (req, res) => {
  try {
    const level = req.query.level || 'beginner';
    
    // Validate level parameter
    if (level !== 'beginner' && level !== 'intermediate') {
      return res.status(400).json({
        error: 'Invalid level parameter',
        message: 'Level must be either "beginner" or "intermediate"',
        validLevels: ['beginner', 'intermediate']
      });
    }

    // For now, return the same data regardless of level
    // In the future, this will filter based on the level parameter
    const response = {
      ...phraseData,
      level: level,
      timestamp: new Date().toISOString()
    };

    res.json(response);
  } catch (error) {
    console.error('Error in /phrases endpoint:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to retrieve phrase data'
    });
  }
});

// GET /api/v1/phrases/:id - Get specific phrase by ID
router.get('/phrases/:id', (req, res) => {
  try {
    const phraseId = parseInt(req.params.id);
    const phrase = phraseData.phrases.find(p => p.id === phraseId);
    
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
      message: 'Failed to retrieve phrase data'
    });
  }
});

// GET /api/v1/health - API health check
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'phrase-of-the-day-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;
