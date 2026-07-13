/**
 * Authentication Middleware
 *
 * TODO untuk Peserta:
 * 1. Buat middleware authenticateToken
 * 2. Extract token dari Authorization header
 * 3. Verify token dengan JWT
 * 4. Attach user info ke req.user
 * 5. Handle invalid/expired tokens
 */

const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    // TODO: Extract token from header
    // const authHeader = req.headers['authorization'];
    // const token = authHeader && authHeader.split(' ')[1];

    // if (!token) {
    //   return res.status(401).json({
    //     success: false,
    //     message: 'Access token required'
    //   });
    // }

    // TODO: Verify token
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //   if (err) {
    //     return res.status(403).json({
    //       success: false,
    //       message: 'Invalid or expired token'
    //     });
    //   }
    //
    //   req.user = decoded;
    //   next();
    // });

    // Temporary: skip authentication for development
    console.log("  TODO: Implement JWT authentication");
    req.user = { userId: "123", email: "test@example.com", role: "user" };
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = { authenticateToken };
