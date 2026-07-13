const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    // Optional link to the logged-in user who filed it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Denormalized so admin can see who filed it without a populate
    userName: { type: String, default: "Anonymous" },
    userEmail: { type: String, default: "" },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      default: "General",
    },
    description: {
      type: String,
      required: true,
    },

    attachment: String, // Cloudinary / file URL

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved"],
      default: "Pending",
    },

    adminResponse: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

complaintSchema.index({ createdAt: -1 });
complaintSchema.index({ status: 1 });

module.exports = mongoose.model("Complaint", complaintSchema);
