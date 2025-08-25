const mongoose = require('mongoose');

const phraseSchema = new mongoose.Schema({
  phrase: {
    type: String,
    required: true,
    trim: true
  },
  pronunciation: {
    type: String,
    required: true,
    trim: true
  },
  meaning: {
    en: {
      type: String,
      required: true
    },
    es: {
      type: String,
      required: true
    }
  },
  context: {
    en: {
      type: String,
      required: true
    },
    es: {
      type: String,
      required: true
    }
  },
  formality: {
    type: String,
    enum: ['formal', 'informal', 'neutral'],
    required: true
  },
  regions: {
    spain: {
      usage: {
        en: String,
        es: String
      },
      notes: {
        en: String,
        es: String
      }
    },
    latinAmerica: {
      usage: {
        en: String,
        es: String
      },
      notes: {
        en: String,
        es: String
      }
    }
  },
  examples: [{
    spanish: {
      type: String,
      required: true
    },
    english: {
      type: String,
      required: true
    },
    context: {
      en: String,
      es: String
    },
    audio: {
      url: String,
      format: String
    }
  }],
  similarPhrases: [{
    type: String,
    trim: true
  }],
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  audio: {
    url: String,
    format: String
  },
  quiz: {
    questions: [{
      id: Number,
      question: {
        en: String,
        es: String
      },
      options: [{
        en: String,
        es: String
      }],
      correctAnswer: {
        type: Number,
        min: 0,
        max: 3
      },
      explanation: {
        en: String,
        es: String
      }
    }]
  },
  usedOn: {
    type: Date,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
phraseSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Phrase', phraseSchema);
