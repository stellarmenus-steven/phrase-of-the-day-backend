require('dotenv').config();
const connectDB = require('../config/database');
const Phrase = require('../models/Phrase');

const seedData = {
  phrase: "¡Más te vale!",
  pronunciation: "mahs teh VAH-leh",
  meaning: {
    en: "You better! / You'd better!",
    es: "¡Será mejor que lo hagas! / ¡Tienes que hacerlo!"
  },
  context: {
    en: "A warning or threat, often used by parents or authority figures",
    es: "Una advertencia o amenaza, a menudo usada por padres o figuras de autoridad"
  },
  formality: "informal",
  regions: {
    spain: {
      usage: {
        en: "Very common",
        es: "Muy común"
      },
      notes: {
        en: "Often used with strong emphasis",
        es: "A menudo se usa con mucho énfasis"
      }
    },
    latinAmerica: {
      usage: {
        en: "Common",
        es: "Común"
      },
      notes: {
        en: "Sometimes softened to '¡Más te vale, eh!'",
        es: "A veces se suaviza a '¡Más te vale, eh!'"
      }
    }
  },
  examples: [
    {
      spanish: "¡Más te vale llegar a tiempo!",
      english: "You better arrive on time!",
      context: {
        en: "Parent to child",
        es: "Padre/madre a hijo/a"
      },
      audio: {
        url: "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-llegar-a-tiempo.mp3",
        format: "mp3"
      }
    },
    {
      spanish: "¡Más te vale no mentirme!",
      english: "You better not lie to me!",
      context: {
        en: "Friend to friend",
        es: "Amigo/a a amigo/a"
      },
      audio: {
        url: "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-no-mentirme.mp3",
        format: "mp3"
      }
    },
    {
      spanish: "¡Más te vale estudiar para el examen!",
      english: "You better study for the exam!",
      context: {
        en: "Teacher to student",
        es: "Profesor/a a estudiante"
      },
      audio: {
        url: "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale-estudiar-para-el-examen.mp3",
        format: "mp3"
      }
    }
  ],
  similarPhrases: [
    "¡Te conviene!",
    "¡Será mejor que...!",
    "¡Como no lo hagas...!"
  ],
  difficulty: "intermediate",
  tags: ["warning", "threat", "advice", "colloquial"],
  audio: {
    url: "https://spanish-phrase-of-the-day.nyc3.cdn.digitaloceanspaces.com/mp3/mas-te-vale.mp3",
    format: "mp3"
  },
  quiz: {
    questions: [
      {
        id: 1,
        question: {
          en: "What is the formality level of \"¡Más te vale!\"?",
          es: "¿Cuál es el nivel de formalidad de \"¡Más te vale!\"?"
        },
        options: [
          {
            en: "Academic",
            es: "Académico"
          },
          {
            en: "Informal",
            es: "Informal"
          },
          {
            en: "Ceremonial",
            es: "Ceremonial"
          },
          {
            en: "Very formal",
            es: "Muy formal"
          }
        ],
        correctAnswer: 1,
        explanation: {
          en: "\"¡Más te vale!\" is an informal expression, typically used in casual conversations between friends, family members, or in relaxed social situations.",
          es: "\"¡Más te vale!\" es una expresión informal, típicamente usada en conversaciones casuales entre amigos, familiares o en situaciones sociales relajadas."
        }
      },
      {
        id: 2,
        question: {
          en: "In what context is \"¡Más te vale!\" typically used?",
          es: "¿En qué contexto se usa típicamente \"¡Más te vale!\"?"
        },
        options: [
          {
            en: "Ordering food",
            es: "Pedir comida"
          },
          {
            en: "A warning or threat",
            es: "Una advertencia o amenaza"
          },
          {
            en: "Greeting friends",
            es: "Saludar amigos"
          },
          {
            en: "Asking for directions",
            es: "Pedir direcciones"
          }
        ],
        correctAnswer: 1,
        explanation: {
          en: "This phrase is commonly used as a warning or threat, especially by parents to children or authority figures to subordinates, expressing a strong expectation that something must be done.",
          es: "Esta frase se usa comúnmente como una advertencia o amenaza, especialmente por padres a hijos o figuras de autoridad a subordinados, expresando una fuerte expectativa de que algo debe hacerse."
        }
      },
      {
        id: 3,
        question: {
          en: "What does \"¡Más te vale!\" mean in English?",
          es: "¿Qué significa \"¡Más te vale!\"?"
        },
        options: [
          {
            en: "How are you?",
            es: "¿Cómo estás?"
          },
          {
            en: "You better!",
            es: "¡Más te vale!"
          },
          {
            en: "See you later!",
            es: "¡Hasta luego!"
          },
          {
            en: "Good morning!",
            es: "¡Buenos días!"
          }
        ],
        correctAnswer: 1,
        explanation: {
          en: "The phrase \"¡Más te vale!\" translates to \"You better!\" or \"You'd better!\" in English, expressing a strong expectation or warning.",
          es: "La frase \"¡Más te vale!\" se traduce como \"¡Más te vale!\" o \"¡Será mejor que...!\" en inglés, expresando una fuerte expectativa o advertencia."
        }
      }
    ]
  }
};

const seedDatabase = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing phrases
    await Phrase.deleteMany({});
    console.log('🗑️  Cleared existing phrases');
    
    // Create the seed phrase
    const phrase = new Phrase(seedData);
    await phrase.save();
    
    console.log('✅ Database seeded successfully!');
    console.log(`📝 Created phrase: ${phrase.phrase}`);
    console.log(`🆔 Phrase ID: ${phrase._id}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
