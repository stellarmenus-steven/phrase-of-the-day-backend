const Phrase = require('../models/Phrase');

class PhraseService {
  /**
   * Get today's phrase with proper rotation logic:
   * 1. First check if there's a phrase already used today
   * 2. If not, get the oldest unused phrase (usedOn is null)
   * 3. If no unused phrases, get the oldest used phrase
   */
  static async getTodaysPhrase(level = 'beginner') {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Start of today
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow

      // Step 1: Check if there's already a phrase used today
      let phrase = await Phrase.findOne({
        isActive: true,
        difficulty: level,
        usedOn: {
          $gte: today,
          $lt: tomorrow
        }
      });

      if (phrase) {
        console.log(`📅 Found phrase already used today: ${phrase.phrase}`);
        return phrase;
      }

      // Step 2: Get the oldest unused phrase (usedOn is null)
      phrase = await Phrase.findOne({
        isActive: true,
        difficulty: level,
        usedOn: null
      }).sort({
        createdAt: 1 // Oldest first
      });

      if (phrase) {
        console.log(`🆕 Found unused phrase: ${phrase.phrase}`);
        // Mark this phrase as used today
        phrase.usedOn = new Date();
        await phrase.save();
        return phrase;
      }

      // Step 3: If no unused phrases, get the oldest used phrase
      phrase = await Phrase.findOne({
        isActive: true,
        difficulty: level
      }).sort({
        usedOn: 1 // Oldest usedOn first
      });

      if (phrase) {
        console.log(`🔄 Reusing oldest phrase: ${phrase.phrase}`);
        // Mark this phrase as used today
        phrase.usedOn = new Date();
        await phrase.save();
        return phrase;
      }

      throw new Error('No phrases available');
    } catch (error) {
      console.error('Error getting today\'s phrase:', error);
      throw error;
    }
  }

  /**
   * Get a specific phrase by ID
   */
  static async getPhraseById(id) {
    try {
      const phrase = await Phrase.findById(id);
      return phrase;
    } catch (error) {
      console.error('Error getting phrase by ID:', error);
      throw error;
    }
  }

  /**
   * Get all phrases (for admin)
   */
  static async getAllPhrases() {
    try {
      const phrases = await Phrase.find({ isActive: true }).sort({ createdAt: -1 });
      return phrases;
    } catch (error) {
      console.error('Error getting all phrases:', error);
      throw error;
    }
  }

  /**
   * Create a new phrase
   */
  static async createPhrase(phraseData) {
    try {
      const phrase = new Phrase(phraseData);
      await phrase.save();
      return phrase;
    } catch (error) {
      console.error('Error creating phrase:', error);
      throw error;
    }
  }

  /**
   * Update a phrase
   */
  static async updatePhrase(id, updateData) {
    try {
      const phrase = await Phrase.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      );
      return phrase;
    } catch (error) {
      console.error('Error updating phrase:', error);
      throw error;
    }
  }

  /**
   * Delete a phrase (soft delete)
   */
  static async deletePhrase(id) {
    try {
      const phrase = await Phrase.findByIdAndUpdate(
        id,
        { isActive: false, updatedAt: new Date() },
        { new: true }
      );
      return phrase;
    } catch (error) {
      console.error('Error deleting phrase:', error);
      throw error;
    }
  }

  /**
   * Reset phrase usage (for testing or admin purposes)
   */
  static async resetPhraseUsage(id) {
    try {
      const phrase = await Phrase.findByIdAndUpdate(
        id,
        { usedOn: null, updatedAt: new Date() },
        { new: true }
      );
      return phrase;
    } catch (error) {
      console.error('Error resetting phrase usage:', error);
      throw error;
    }
  }

  /**
   * Get phrase statistics
   */
  static async getPhraseStats() {
    try {
      const stats = await Phrase.aggregate([
        { $match: { isActive: true } },
        {
          $group: {
            _id: null,
            totalPhrases: { $sum: 1 },
            usedPhrases: { $sum: { $cond: [{ $ne: ['$usedOn', null] }, 1, 0] } },
            unusedPhrases: { $sum: { $cond: [{ $eq: ['$usedOn', null] }, 1, 0] } }
          }
        }
      ]);

      return stats[0] || { totalPhrases: 0, usedPhrases: 0, unusedPhrases: 0 };
    } catch (error) {
      console.error('Error getting phrase stats:', error);
      throw error;
    }
  }
}

module.exports = PhraseService;
