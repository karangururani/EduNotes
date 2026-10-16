
const mongoose = require("mongoose");
const Note = require("../models/Note");
const cloudinary = require("../config/cloudinary");

// ================= Upload Note =================
const uploadNote = async (req, res) => {
  try {
    const {
      title,
      subject,
      course,
      branch,
      year,
      semester,
      uploaderName,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file.",
      });
    }

    if (
      !title?.trim() ||
      !subject?.trim() ||
      !course?.trim() ||
      !branch?.trim() ||
      !year?.trim() ||
      !semester?.trim() ||
      !uploaderName?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required note details.",
      });
    }

    const note = await Note.create({
      title: title.trim(),
      subject: subject.trim(),
      course: course.trim(),
      branch: branch.trim(),
      year: year.trim(),
      semester: semester.trim(),
      uploaderName: uploaderName.trim(),
      uploadedBy: req.user?.id || null,
      fileUrl: req.file.path,
      publicId: req.file.filename,
      downloads: 0,
    });

    return res.status(201).json({
      success: true,
      message: "Note uploaded successfully.",
      note,
    });
  } catch (error) {
    console.error("Upload Note Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload note.",
    });
  }
};

// ================= Get All Notes =================
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Get Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve notes.",
    });
  }
};

// ================= Get My Uploaded Notes =================
const getMyNotes = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const notes = await Note.find({
      uploadedBy: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error("Get My Notes Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve your uploaded notes.",
    });
  }
};

// ================= Edit My Note =================
const updateMyNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const allowedFields = [
      "title",
      "subject",
      "course",
      "branch",
      "year",
      "semester",
    ];

    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        if (
          typeof req.body[field] !== "string" ||
          !req.body[field].trim()
        ) {
          return res.status(400).json({
            success: false,
            message: `${field} must not be empty.`,
          });
        }

        updates[field] = req.body[field].trim();
      }
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one valid field to update.",
      });
    }

    const note = await Note.findOneAndUpdate(
      {
        _id: id,
        uploadedBy: userId,
      },
      { $set: updates },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you do not own this note.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      note,
    });
  } catch (error) {
    console.error("Update My Note Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update your note.",
    });
  }
};

// ================= Delete My Note =================
const deleteMyNote = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    // Ownership is checked in the database query.
    const note = await Note.findOneAndDelete({
      _id: id,
      uploadedBy: userId,
    });

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found or you do not own this note.",
      });
    }

    // Delete the Cloudinary file after confirming note ownership.
    if (note.publicId) {
      try {
        const result = await cloudinary.uploader.destroy(note.publicId, {
          resource_type: "raw",
        });

        if (result.result !== "ok" && result.result !== "not found") {
          console.error("Cloudinary file deletion result:", result);
        }
      } catch (cloudinaryError) {
        // The database note has already been deleted.
        // Log cleanup failure for later investigation.
        console.error(
          "Cloudinary file cleanup failed:",
          cloudinaryError
        );
      }
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
      noteId: id,
    });
  } catch (error) {
    console.error("Delete My Note Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete your note.",
    });
  }
};

// ================= Track Note Download =================
const downloadNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid note ID.",
      });
    }

    const note = await Note.findByIdAndUpdate(
      id,
      { $inc: { downloads: 1 } },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Download recorded.",
      fileUrl: note.fileUrl,
      downloads: note.downloads,
    });
  } catch (error) {
    console.error("Download Note Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to record note download.",
    });
  }
};

// ================= Get Profile Statistics =================
const getProfileStats = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    const downloadResult = await Note.aggregate([
      {
        $match: {
          uploadedBy: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalDownloads: {
            $sum: { $ifNull: ["$downloads", 0] },
          },
        },
      },
    ]);

    const [uploadedNotes, downloadData] = await Promise.all([
      Note.countDocuments({ uploadedBy: userId }),
      Promise.resolve(downloadResult[0]),
    ]);

    return res.status(200).json({
      success: true,
      stats: {
        uploadedNotes,
        downloads: downloadData?.totalDownloads ?? 0,
        reputation: null,
      },
    });
  } catch (error) {
    console.error("Get Profile Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve profile statistics.",
    });
  }
};

module.exports = {
  uploadNote,
  getAllNotes,
  getMyNotes,
  updateMyNote,
  deleteMyNote,
  downloadNote,
  getProfileStats,
};
