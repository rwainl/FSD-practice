/**
 * External Services Routes
 *
 * TODO untuk peserta:
 * 1. Import controllers dan services
 * 2. Setup rate limiting untuk AI endpoint
 * 3. Implement authentication & authorization
 * 4. Create routes untuk:
 *    - POST /ai/ask (AI chatbot)
 *    - GET /kemenkes/medications (Kemenkes data)
 *    - POST /kemenkes/sync (Admin only)
 *    - POST /payment/create (Create payment)
 *    - POST /payment/webhook (Handle Midtrans callback)
 */

const express = require("express");
const router = express.Router();

// TODO: Import controllers
const aiController = require('../controllers/aiController');

// TODO: Import services
// const kemenkesService = require('../services/kemenkesService');
const midtransService = require('../services/midtransService');

// TODO: Import middleware
const { authenticateToken } = require('../middleware/auth');
const { authorizeRole } = require('../middleware/authorize');

// TODO: Setup rate limiting for AI endpoint

const rateLimit = require('express-rate-limit');
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many AI requests",
  }
});

router.post('/ai/ask', authenticateToken, aiLimiter, aiController.askAI);

// ==========================================
// Kemenkes API Routes
// ==========================================

// TODO: GET /kemenkes/medications - Get medications from Kemenkes
// router.get('/kemenkes/medications', authenticateToken, async (req, res) => {
//   try {
//     const { search, limit } = req.query;
//     const result = await kemenkesService.getMedications(search, limit);
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch medications'
//     });
//   }
// });

router.get("/kemenkes/medications", (req, res) => {
  res.json({
    success: false,
    message: "  TODO: Implement Kemenkes endpoint",
  });
});

// TODO: POST /kemenkes/sync - Sync Kemenkes data to database (Admin only)
// router.post('/kemenkes/sync',
//   authenticateToken,
//   authorizeRole('admin'),
//   async (req, res) => {
//     try {
//       const result = await kemenkesService.syncToDatabase();
//       res.json(result);
//     } catch (error) {
//       res.status(500).json({
//         success: false,
//         message: 'Sync failed'
//       });
//     }
//   }
// );

router.post("/kemenkes/sync", (req, res) => {
  res.json({
    success: false,
    message: "  TODO: Implement sync endpoint",
  });
});

// ==========================================
// Payment Routes
// ==========================================

// TODO: POST /payment/create - Create Midtrans payment

router.post('/payment/create', authenticateToken, async (req, res) => {
  try {
    const {items} = req.body;

    const amount = items.reduce((sum, item) => {
      sum + (item.price * item.quantity), 0;
    });

    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const result = await midtransService.createTransaction({
      orderId,
      amount,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: req.user.phone || '08123456789',
      items,
    });

    return res.json(result);
  } catch (error) {
    console.error("Payment error: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed connecting to payment gateway",
    });
  }
})

router.post('/payment/webhook', async(req, res) => {
  try {
    const notification = req.body;
    const result = midtransService.handleNotification(notification);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error payment webhook");
    return res.status(500).json({
      success: false,
      message: 'Webhook processing failed',
    });
  }
});

module.exports = router;
