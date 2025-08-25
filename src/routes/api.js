const express = require('express');
const router = express.Router();
const PhraseService = require('../services/phraseService');
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
        "en": "You better! / You'd better!",
        "es": "¡Será mejor que lo hagas! / ¡Tienes que hacerlo!"
      },
      "context": {
        "en": "A warning or threat, often used by parents or authority figures",
        "es": "Una advertencia o amenaza, a menudo usada por padres o figuras de autoridad"
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
      "tags": ["warning", "threat", "advice", "colloquial"],
      "quiz": {
        "questions": [
          {
            "id": 1,
            "question": {
              "en": "What is the formality level of \"¡Más te vale!\"?",
              "es": "¿Cuál es el nivel de formalidad de \"¡Más te vale!\"?"
            },
            "options": [
              {
                "en": "Academic",
                "es": "Académico"
              },
              {
                "en": "Informal",
                "es": "Informal"
              },
              {
                "en": "Ceremonial",
                "es": "Ceremonial"
              },
              {
                "en": "Very formal",
                "es": "Muy formal"
              }
            ],
            "correctAnswer": 1,
            "explanation": {
              "en": "\"¡Más te vale!\" is an informal expression, typically used in casual conversations between friends, family members, or in relaxed social situations.",
              "es": "\"¡Más te vale!\" es una expresión informal, típicamente usada en conversaciones casuales entre amigos, familiares o en situaciones sociales relajadas."
            }
          },
          {
            "id": 2,
            "question": {
              "en": "In what context is \"¡Más te vale!\" typically used?",
              "es": "¿En qué contexto se usa típicamente \"¡Más te vale!\"?"
            },
            "options": [
              {
                "en": "Ordering food",
                "es": "Pedir comida"
              },
              {
                "en": "A warning or threat",
                "es": "Una advertencia o amenaza"
              },
              {
                "en": "Greeting friends",
                "es": "Saludar amigos"
              },
              {
                "en": "Asking for directions",
                "es": "Pedir direcciones"
              }
            ],
            "correctAnswer": 1,
            "explanation": {
              "en": "This phrase is commonly used as a warning or threat, especially by parents to children or authority figures to subordinates, expressing a strong expectation that something must be done.",
              "es": "Esta frase se usa comúnmente como una advertencia o amenaza, especialmente por padres a hijos o figuras de autoridad a subordinados, expresando una fuerte expectativa de que algo debe hacerse."
            }
          },
          {
            "id": 3,
            "question": {
              "en": "What does \"¡Más te vale!\" mean in English?",
              "es": "¿Qué significa \"¡Más te vale!\"?"
            },
            "options": [
              {
                "en": "How are you?",
                "es": "¿Cómo estás?"
              },
              {
                "en": "You better!",
                "es": "¡Más te vale!"
              },
              {
                "en": "See you later!",
                "es": "¡Hasta luego!"
              },
              {
                "en": "Good morning!",
                "es": "¡Buenos días!"
              }
            ],
            "correctAnswer": 1,
            "explanation": {
              "en": "The phrase \"¡Más te vale!\" translates to \"You better!\" or \"You'd better!\" in English, expressing a strong expectation or warning.",
              "es": "La frase \"¡Más te vale!\" se traduce como \"¡Más te vale!\" o \"¡Será mejor que...!\" en inglés, expresando una fuerte expectativa o advertencia."
            }
          }
        ]
      }
    }
  ],
  "sponsor": {
    "show": false,
    "show_after": 45,
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
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'phrase-of-the-day-api',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

module.exports = router;
