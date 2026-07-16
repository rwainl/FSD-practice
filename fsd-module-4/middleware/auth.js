/**
 * Authentication Middleware
 * JWT verification untuk Health E-Commerce API
 */

const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(403).json({
      success: false,
      message: "Invalid token.",
    });
  }
}

module.exports = { authenticateToken };