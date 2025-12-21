// const mongoose = require("mongoose");

// const contactSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//     },
//     // ✅ ADD THIS FIELD
//     photo: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Contact", contactSchema);

const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
    photo: String, // CLOUDINARY URL
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
