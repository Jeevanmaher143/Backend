// const Gallery = require("../models/Gallery");
// const fs = require("fs");
// const path = require("path");

// // ADD IMAGE
// exports.addImage = async (req, res) => {
//   try {
//     const gallery = new Gallery({
//       caption: req.body.caption,
//       image: `/uploads/gallery/${req.file.filename}`, // PUBLIC PATH
//     });

//     await gallery.save();
//     res.status(201).json(gallery);
//   } catch (err) {
//     res.status(500).json({ message: "Gallery upload failed" });
//   }
// };

// // GET IMAGES
// exports.getImages = async (req, res) => {
//   const images = await Gallery.find().sort({ createdAt: -1 });
//   res.json(images);
// };

// // DELETE IMAGE
// exports.deleteImage = async (req, res) => {
//   const image = await Gallery.findById(req.params.id);

//   if (image) {
//     const filePath = path.join(__dirname, "..", image.image);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//     await image.deleteOne();
//   }

//   res.json({ message: "Image deleted" });
// };
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
