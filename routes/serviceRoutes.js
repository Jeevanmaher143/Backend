const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const {
  applyService,
  getMyApplications,
  cancelMyApplication,
} = require("../controllers/serviceController");

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

// USER: view own applications (Application Status page)
router.get("/user/applications", protect, getMyApplications);

// USER: cancel own application (UserProfile "Cancel" button)
router.delete("/application/:id", protect, cancelMyApplication);

module.exports = router;
