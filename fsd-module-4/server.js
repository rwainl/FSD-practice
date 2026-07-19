/**
 * Secure Health E-Commerce API Server
 * Modul 4: Authentication & Secure Coding
 *
 * Catatan: Server ini melanjutkan dari Modul 3 (Express setup)
 * dengan tambahan security features (Helmet, rate limiting, JWT auth)
 */

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("mongo-sanitize");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");

// Load Swagger documentation
const swaggerDocument = YAML.load("./swagger.yaml");

// Initialize Express
const app = express();

// Connect to database
connectDB();

// Security Middleware
app.use(helmet()); // Set security HTTP headers

// CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com"]
      : ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parser dengan size limit
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Data sanitization against NoSQL injection
app.use((req, res, next) => {
  req.body = mongoSanitize(req.body);
  req.params = mongoSanitize(req.params);
  req.query = mongoSanitize(req.query);
  next();
});

// Request logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later",
  },
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Max 5 login attempts
  message: {
    success: false,
    message: "Too many login attempts, please try again in 15 minutes",
  },
  skipSuccessfulRequests: true,
});

// Health check (before rate limiter)
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Secure Health API is running",
    timestamp: new Date().toISOString(),
  });
});

// Swagger API Documentation (before rate limiter)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    customSiteTitle: "Secure Health API Docs",
    customCss: ".swagger-ui .topbar { display: none }",
  })
);

// Apply rate limiters
app.use("/api/", apiLimiter);
app.use("/api/auth/login", loginLimiter);

// Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);

  // Don't expose error details in production
  const message =
    process.env.NODE_ENV === "development"
      ? err.message
      : "Internal server error";

  res.status(err.statusCode || 500).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Secure Health API running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Auth endpoints: http://localhost:${PORT}/api/auth`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});