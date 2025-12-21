const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
  addNotice,
  getAllNotices,
  updateNotice,
  deleteNotice,
} = require("../controllers/noticeController");

// ================= PUBLIC =================
router.get("/", getAllNotices);

// ================= ADMIN =================

// ADD NOTICE
router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    req.uploadFolder = "notices"; // ✅ REQUIRED
    next();
  },
  upload.single("attachment"),
  addNotice
);

router.put(
  "/:id",
  protect,
  adminOnly,
  (req, res, next) => {
    req.uploadFolder = "notices"; // ✅ REQUIRED
    next();
  },
  upload.single("attachment"),
  updateNotice
);

// DELETE NOTICE
router.delete("/:id", protect, adminOnly, deleteNotice);

module.exports = router;
