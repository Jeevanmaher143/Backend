const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image");

    return {
      folder: req.uploadFolder || "gram-panchayat",
      resource_type: isImage ? "image" : "raw", // ✅ image / pdf / doc
      public_id: `${Date.now()}-${file.originalname
        .split(".")
        .slice(0, -1)
        .join(".")}`, // ✅ SAFE ID
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images  files allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 }, // ✅ 500kb
});

module.exports = upload;
