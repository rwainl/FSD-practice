/**
 * Auth Routes
 * Authentication endpoints untuk Health E-Commerce
 */

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validate");

// Public routes
router.post("/register", registerValidation, authController.register);
router.post("/login", loginValidation, authController.login);

// Protected routes
router.get("/profile", authenticateToken, authController.getProfile);
router.put("/password", authenticateToken, authController.updatePassword);

module.exports = router;