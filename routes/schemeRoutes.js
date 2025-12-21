const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  addScheme,
  getAllSchemes,
  updateScheme,
  deleteScheme,
} = require("../controllers/schemeController");

// PUBLIC
router.get("/", getAllSchemes);

// ADMIN
router.post("/", protect, adminOnly, addScheme);
router.put("/:id", protect, adminOnly, updateScheme);
router.delete("/:id", protect, adminOnly, deleteScheme);

module.exports = router;
