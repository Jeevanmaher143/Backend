const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const noticeController = require("../controllers/noticeController");

// ================= PUBLIC =================
router.get("/", noticeController.getAllNotices);

// ================= ADMIN =================
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.adminOnly,
  (req, res, next) => {
    req.uploadFolder = "notices";
    next();
  },
  upload.single("attachment"),
  noticeController.addNotice
);

router.put(
  "/:id",
  authMiddleware.protect,
  authMiddleware.adminOnly,
  (req, res, next) => {
    req.uploadFolder = "notices";
    next();
  },
  upload.single("attachment"),
  noticeController.updateNotice
);

router.delete(
  "/:id",
  authMiddleware.protect,
  authMiddleware.adminOnly,
  noticeController.deleteNotice
);

module.exports = router;
