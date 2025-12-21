const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardStats,
} = require("../controllers/adminDashboardController");

router.get("/stats", protect, adminOnly, getDashboardStats);

module.exports = router;
