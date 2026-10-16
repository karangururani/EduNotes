const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const {
  CloudinaryStorage,
} = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "EduNotes",
    resource_type: "raw",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({
  storage,
});

module.exports = upload;