/**
 *  FILE INI PERLU DILENGKAPI
 *
 * Auth Controller
 * Handle register, login, dan user management
 */

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async(req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: errors.array(),
      })
    }

    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({email});
    if(existingUser) {
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

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      }
    )

    return res.status(201).json({
      success: true,
      token,
      message: "Register Completed",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error register",
    })
  }
}

exports.login = async (req,res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRE,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Login success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error login",
    })
  }
};

exports.getProfile = async(req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if(!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error getting profile",
    })
  }
}

exports.updatePassword = async(req,res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if(!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old and new password required",
      });

      if(newPassword.length < 8) {
        return res.status(400).json({
          success: false,
          message: "New password must be at least 8 characters",
        });
      }
    }

    const user = await User.findById(req.user.userId).select("+password");

    const isMatch = await user.comparePassword(oldPassword);
    if(!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect",
      })
    }

    user.password = password;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Password Updated",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating password",
    })
  }
}
