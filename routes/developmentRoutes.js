const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");

const {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/developmentController");

// PUBLIC
router.get("/", getProjects);

// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    req.uploadFolder = "development"; // 🔥 VERY IMPORTANT
    next();
  },
  upload.array("images", 5),
  addProject
);

router.put("/:id", protect, adminOnly, updateProject);
router.delete("/:id", protect, adminOnly, deleteProject);

module.exports = router;
