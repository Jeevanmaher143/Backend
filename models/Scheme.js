const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    benefits: String,
    eligibility: String,
    applyProcess: String,
    applyLink: {
  type: String,
  default: ""
},

    schemeType: {
      type: String,
      enum: ["Central", "State"],
      required: true,
    },
  },
  { timestamps: true }
);

schemeSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Scheme", schemeSchema);
