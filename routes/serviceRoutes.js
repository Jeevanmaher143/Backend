const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const { applyService } = require("../controllers/serviceController");

// APPLY FOR ALL SERVICES
router.post(
  "/apply",
  protect,
  (req, res, next) => {
    req.uploadFolder = "services"; // Cloudinary folder
    next();
  },
  upload.any(), // ✅ ACCEPTS ALL FILE FIELDS
  applyService
);

module.exports = router;
