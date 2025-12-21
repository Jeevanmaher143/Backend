const express = require("express");
const router = express.Router();

const ServiceApplication = require("../models/ServiceApplication");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const { updateApplicationStatus } = require("../controllers/serviceController");

/* ===============================
   GET ALL SERVICE APPLICATIONS
================================ */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const services = await ServiceApplication.find()
      .populate("user", "fullName email village mobile")
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    console.error("FETCH ADMIN SERVICES ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch services" });
  }
});

/* ===============================
   UPDATE STATUS (APPROVE / REJECT)
================================ */
router.put(
  "/:id/status",
  protect,
  adminOnly,
  updateApplicationStatus
);

module.exports = router;
