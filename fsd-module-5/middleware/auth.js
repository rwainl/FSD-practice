const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) {
      return res.status(401).json({
        successs: false,
        message: "Access token required",
      })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if(error) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        })
      }

      req.user = decoded;
      next();
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = { authenticateToken };
