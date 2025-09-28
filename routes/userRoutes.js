const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

// Public routes
// Register a new user
router.post("/register", registerUser);

// Login a user
router.post("/login", loginUser);

// Protected routes
// Get logged-in user's profile
router.get("/profile", protect, getUserProfile);

module.exports = router;