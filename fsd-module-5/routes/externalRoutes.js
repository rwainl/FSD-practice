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
// const aiController = require('../controllers/aiController');

// TODO: Import services
// const kemenkesService = require('../services/kemenkesService');
// const midtransService = require('../services/midtransService');

// TODO: Import middleware
// const { authenticateToken } = require('../middleware/auth');
// const { authorizeRole } = require('../middleware/authorize');

// TODO: Setup rate limiting for AI endpoint
// const rateLimit = require('express-rate-limit');
// const aiLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // Max 10 AI requests
//   message: {
//     success: false,
//     message: 'Too many AI requests. Please wait.'
//   }
// });

// ==========================================
// AI Chatbot Routes
// ==========================================

// TODO: POST /ai/ask - Ask AI for health recommendations
// router.post('/ai/ask', authenticateToken, aiLimiter, aiController.askAI);

router.post("/ai/ask", (req, res) => {
  res.json({
    success: false,
    message: "  TODO: Implement AI endpoint",
    hint: "Uncomment route dan implement aiController.askAI",
  });
});

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
// router.post('/payment/create', authenticateToken, async (req, res) => {
//   try {
//     const { items } = req.body;
//
//     // Calculate total amount
//     const amount = items.reduce((sum, item) =>
//       sum + (item.price * item.quantity), 0
//     );
//
//     // Generate unique order ID
//     const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
//
//     // Create payment
//     const result = await midtransService.createTransaction({
//       orderId,
//       amount,
//       customerName: req.user.name,
//       customerEmail: req.user.email,
//       customerPhone: req.user.phone || '08123456789',
//       items
//     });
//
//     res.json(result);
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Payment creation failed'
//     });
//   }
// });

router.post("/payment/create", (req, res) => {
  res.json({
    success: false,
    message: "  TODO: Implement payment endpoint",
  });
});

// TODO: POST /payment/webhook - Handle Midtrans webhook (No auth!)
// router.post('/payment/webhook', async (req, res) => {
//   try {
//     const notification = req.body;
//     const result = midtransService.handleNotification(notification);
//
//     // Always return 200 to Midtrans
//     res.json(result);
//   } catch (error) {
//     res.json({
//       success: false,
//       message: 'Webhook processing failed'
//     });
//   }
// });

router.post("/payment/webhook", (req, res) => {
  res.json({
    success: false,
    message: "  TODO: Implement webhook handler",
  });
});

module.exports = router;
