const mongoose = require("mongoose"); // ✅ REQUIRED

const serviceApplicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    serviceType: {
      type: String,
      required: true
    },

    fullName: {
      type: String,
      required: true
    },
    email: {
  type: String,
  
},


    address: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      required: true
    },

    // Optional (for death certificate etc.)
    deceasedName: String,
    dateOfDeath: String,

    // ✅ DOCUMENTS AS OBJECT (VERY IMPORTANT)
    documents: {
      type: Object,
      default: {}
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    adminRemark: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ServiceApplication",
  serviceApplicationSchema
);
