const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isImportant: {
      type: Boolean,
      default: false,
    },
    attachment: {
      type: String, // PDF / DOC file path
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notice", noticeSchema);
