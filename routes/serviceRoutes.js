const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const { applyService } = require("../controllers/serviceController");

// APPLY FOR SERVICE
router.post(
  "/apply",
  protect,
  (req, res, next) => {
    req.uploadFolder = "services"; // ✅ correct
    next();
  },
  upload.fields([
    { name: "hospitalSlip", maxCount: 1 },
    { name: "parentsAadhaar", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "hospitalDeathSlip", maxCount: 1 },
    { name: "deceasedAadhaar", maxCount: 1 },
    { name: "applicantAadhaar", maxCount: 1 },
    { name: "aadhaar", maxCount: 1 },
    { name: "rationCard", maxCount: 1 },
    { name: "incomeProof", maxCount: 1 },
    { name: "electricityBill", maxCount: 1 }
  ]),
  applyService
);

module.exports = router;
