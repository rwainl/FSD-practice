/**
 * Cart Routes
 * 
 * TODO untuk peserta:
 * 1. Import express router
 * 2. Import cartController
 * 3. Import middleware (authenticateToken)
 * 4. Create routes:
 *    - GET / - Get user's cart (Protected)
 *    - POST / - Add item to cart (Protected)
 *    - PUT /:productId - Update cart item quantity (Protected)
 *    - DELETE /:productId - Remove item from cart (Protected)
 * 
 * Reference: ../finished-project/routes/cartRoutes.js
 */

const express = require('express');
const router = express.Router();

const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/auth');

router.get("/", authenticateToken, cartController, getCart);
router.post("/", authenticateToken, cartController, addCart);
router.patch("/:productId", authenticateToken, cartController, updateCart);
router.delete("/:productId", authenticateToken, cartController, removeFromCart);

module.exports = router;

