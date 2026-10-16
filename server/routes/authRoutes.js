
const express = require("express");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  updateUserProfile,
  uploadProfilePicture,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const profileUpload = require("../middleware/profileUpload");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

// Update profile details
router.put("/profile", authMiddleware, updateUserProfile);

// Upload profile picture
router.post(
  "/profile/avatar",
  authMiddleware,
  profileUpload.single("avatar"),
  uploadProfilePicture
);

module.exports = router;
