// const express = require("express");
// const router = express.Router();

// const upload = require("../middlewares/uploadMiddleware");
// const { protect, adminOnly } = require("../middlewares/authMiddleware");
// const {
//   addMember,
//   getMembers,
//   updateMember,
//   deleteMember,
// } = require("../controllers/contactController");

// // PUBLIC
// router.get("/", getMembers);

// // ADMIN
// router.post(
//   "/",
//   protect,
//   adminOnly,
//   (req, res, next) => {
//     req.uploadFolder = "contacts";
//     next();
//   },
//   upload.single("photo"),
//   addMember
// );

// router.put("/:id", protect, adminOnly, updateMember);
// router.delete("/:id", protect, adminOnly, deleteMember);

// module.exports = router;
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  addMember,
  getMembers,
  updateMember,
  deleteMember,
} = require("../controllers/contactController");

// PUBLIC
router.get("/", getMembers);
router.get("/top-members", async (req, res) => {
  try {
    const members = await Member.find({
      role: { $in: ["sarpanch", "upsarpanch"] },
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch members" });
  }
});


// ADMIN
router.post(
  "/",
  protect,
  adminOnly,
  (req, res, next) => {
    req.uploadFolder = "contacts"; // Cloudinary folder
    next();
  },
  upload.single("photo"),
  addMember
);

router.put("/:id", protect, adminOnly, updateMember);
router.delete("/:id", protect, adminOnly, deleteMember);

module.exports = router;
