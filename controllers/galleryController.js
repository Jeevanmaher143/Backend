
const Gallery = require("../models/Gallery");

// ADD IMAGE (Cloudinary auto upload via multer)
exports.addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const image = await Gallery.create({
      image: req.file.path,   // ✅ Cloudinary secure URL
      caption: req.body.caption || "",
    });

    res.status(201).json(image);
  } catch (error) {
    console.error("Gallery upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// GET IMAGES
exports.getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 }).limit(15);
    res.json(images);
  } catch (err) {
    res.status(500).json({ message: "Fetch failed" });
  }
};

// DELETE IMAGE (DB only)
exports.deleteImage = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
