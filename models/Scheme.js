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

module.exports = mongoose.model("Scheme", schemeSchema);
