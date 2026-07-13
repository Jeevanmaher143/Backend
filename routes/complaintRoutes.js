const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createComplaint,
  getAllComplaints,
  updateComplaintStatus,
  respondToComplaint,
  deleteComplaint,
} = require("../controllers/complaintController");

// USER / PUBLIC: submit a complaint (attaches user identity if logged in)
router.post("/", protect, createComplaint);

// ADMIN: manage complaints
router.get("/", protect, adminOnly, getAllComplaints);
router.put("/:id/status", protect, adminOnly, updateComplaintStatus);
router.put("/:id/response", protect, adminOnly, respondToComplaint);
router.delete("/:id", protect, adminOnly, deleteComplaint);

module.exports = router;
