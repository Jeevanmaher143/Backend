const mongoose = require("mongoose");

const villageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    history: { type: String, required: true },
    populationTotal: { type: Number, required: true },
    populationMale: { type: Number, required: true },
    populationFemale: { type: Number, required: true },
    area: { type: String, required: true }, // e.g. "12.5 sq km"
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Village", villageSchema);
