// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middlewares/authMiddleware");
// const User = require("../models/User");
// const ServiceApplication = require("../models/ServiceApplication");
// const { getUserProfile } = require("../controllers/userController");

// router.get("/profile", protect, getUserProfile);
// router.get("/profile", protect, async (req, res) => {
//   try {
//     console.log("USER ID:", req.user.id || req.user._id);

//     const userId = req.user.id || req.user._id;

//     const user = await User.findById(userId).select("-password");
//     const services = await ServiceApplication.find({
//       appliedBy: userId,
//     });

//     res.json({ user, services });
//   } catch (err) {
//     console.error("PROFILE ERROR:", err);
//     res.status(500).json({ message: "Profile load failed" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const { getUserProfile } = require("../controllers/userController");

router.get("/profile", protect, getUserProfile);

module.exports = router;
