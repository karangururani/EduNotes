
const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadNote,
  getAllNotes,
  getMyNotes,
  updateMyNote,
  deleteMyNote,
  downloadNote,
  getProfileStats,
} = require("../controllers/noteController");

// Upload a note — authenticated users only
router.post(
  "/upload",
  authMiddleware,
  upload.single("pdf"),
  uploadNote
);

// Get all notes — public
router.get("/", getAllNotes);

// Get the logged-in user's uploaded notes
router.get("/my", authMiddleware, getMyNotes);

// Get profile statistics
router.get("/profile/stats", authMiddleware, getProfileStats);

// Edit one of the logged-in user's notes
router.put("/:id", authMiddleware, updateMyNote);

// Delete one of the logged-in user's notes
router.delete("/:id", authMiddleware, deleteMyNote);

// Track a note download
router.get("/:id/download", downloadNote);

module.exports = router;
