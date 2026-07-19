/**
 * AI Controller
 *
 * TODO untuk peserta:
 * 1. Import aiService
 * 2. Implement askAI handler
 * 3. Validate user input
 * 4. Call aiService.getHealthRecommendation
 * 5. Return response dengan proper status codes
 */

// TODO: Import AI service
// const aiService = require('../services/aiService');
const aiService = require('../services/aiService');

exports.askAI = async (req, res) => {
  try {
    const { question } = req.body;

    if(!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Question required",
      });
    }

    const result = await aiService.getHealthRecommendation(question);

    console.log(`AI Question from ${req.user?.email}: "${question}"`);

    res.json(result);
    return res.status(200).json({
      success: true,
      answer: result,
    });
  } catch (error) {
    console.error(" AI Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to process AI request",
    });
  }
};
