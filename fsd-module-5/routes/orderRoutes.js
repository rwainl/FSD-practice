/**
 * Order Routes
 * 
 * TODO untuk peserta:
 * 1. Import express router
 * 2. Import orderController
 * 3. Import middleware (authenticateToken)
 * 4. Create routes:
 *    - GET / - Get order history (Protected, with pagination)
 *    - GET /:orderId - Get order detail (Protected)
 * 
 * Reference: ../finished-project/routes/orderRoutes.js
 */

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateToken } = require('../middleware/auth');

router.get('/', authenticateToken, orderController, getOrderHistory);
router.get('/:id', authenticateToken, orderController, getOrderById);

module.exports = router;

