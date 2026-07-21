/**
 * Authentication Controller
 *
 * TODO untuk peserta:
 * 1. Import User model dan jwt
 * 2. Buat generateToken function
 * 3. Implement register function:
 *    - Check if user exists
 *    - Hash password (User model akan handle)
 *    - Create user
 *    - Generate JWT token
 *    - Return token & user data
 *
 * 4. Implement login function:
 *    - Find user by email
 *    - Check password dengan bcrypt
 *    - Generate JWT token
 *    - Return token & user data
 *
 * 5. Implement getProfile function:
 *    - Get user dari req.user (dari middleware)
 *    - Return user data (tanpa password)
 *
 * 6. Implement updateProfile function:
 *    - Get user dari req.user
 *    - Update user fields
 *    - Save user
 *    - Return updated user
 *
 * Reference: ../finished-project/controllers/authController.js
 */

// TODO: Import dependencies
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (userId, email, role) => {
  return jwt.sign({ userId, email, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "24h",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already in use",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "User",
    });

    const token = generateToken(user._id, user.email, user.role);

    if (process.env.NODE_ENV === "development") {
      const tokenParts = token.split(".");
      console.log(" Token generated successfully:", {
        tokenLength: token.length,
        tokenParts: tokenParts.length,
        tokenPrefix: token.substring(0, 50) + "...",
        hasThreeParts: tokenParts.length === 3,
      });
    }

    res.status(201).json({
      success: true,
      message: "User registered",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error create user", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed create user",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const token = generateToken(user._id, user.email, user.role);

    if (process.env.NODE_ENV === "development") {
      const tokenParts = token.split(".");
      console.log(" Token generated successfully:", {
        tokenLength: token.length,
        tokenParts: tokenParts.length,
        tokenPrefix: token.substring(0, 50) + "...",
        hasThreeParts: tokenParts.length === 3,
      });
    }

    res.status(200).json({
      success: true,
      message: "Sign in completed",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error sign in", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed signing in",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        profilePhoto: user.profilePhoto,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error getting user info", error.message);
    res.status(500).json({
      success: false,
      message: "Failed getting user info",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const updateData = { ...req.body };

    if (req.file) {
      if (user.profilePhoto && user.profilePhoto.includes("cloudinary")) {
        try {
          const urlParts = user.profilePhoto.split("/");
          const publicIdWithExt = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExt.split(".")[0];
          const folderPath = `health-ecommerce/profiles/${publicId}`;
          await cloudinary.uploader.destroy(folderPath);
        } catch (error) {
          console.warn("Failed to delete profile photo");
        }
      }
      updateData.profilePhoto = req.file.path;
    }

    if(updateData.password) {
        user.password = updateData.password;
    }
    if(updateData.name) user.name = updateData.name;
    if(updateData.email) user.email = updateData.email;
    if(updateData.address) user.address = updateData.address;
    if(updateData.profilePhoto) user.profilePhoto = updateData.profilePhoto;

    await user.save();

    return res.status(201).json({
        success: true,
        message: "User info updated",
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phone: user.phone,
            address: user.address,
            profilePhoto: user.profilePhoto,
        }
    });
  } catch (error) {
    console.error("Error update user profile", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed updating user profile",
    });
  }
};


