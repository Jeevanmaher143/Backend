// const mongoose = require("mongoose");

// const gallerySchema = new mongoose.Schema(
//   {
//     image: {
//       type: String,
//       required: true,
//     },
//     caption: String,
//     category: {
//       type: String,
//       enum: ["Event", "Development", "Cultural"],
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Gallery", gallerySchema);
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    image: { type: String, required: true }, // Cloudinary URL
    caption: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
