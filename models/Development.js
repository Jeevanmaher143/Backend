const mongoose = require("mongoose");

const developmentSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    description: String,

    progress: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Ongoing", "Completed"],
      default: "Ongoing",
    },

    fundsUsed: Number,
    images: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Development", developmentSchema);
