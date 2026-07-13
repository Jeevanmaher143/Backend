const Complaint = require("../models/Complaint");

/* ================= CREATE COMPLAINT (PUBLIC / USER) ================= */
exports.createComplaint = async (req, res) => {
  try {
    const { title, category, description, userName, userEmail } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required" });
    }

    const complaint = await Complaint.create({
      title,
      category: category || "General",
      description,
      // Prefer authenticated user identity when available
      user: req.user?._id,
      userName: req.user?.fullName || userName || "Anonymous",
      userEmail: req.user?.email || userEmail || "",
      attachment: req.file ? req.file.path : undefined,
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error("CREATE COMPLAINT ERROR 👉", error);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
};

/* ================= GET ALL COMPLAINTS (ADMIN) ================= */
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 }).lean();
    res.json(complaints);
  } catch (error) {
    console.error("GET COMPLAINTS ERROR 👉", error);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
};

/* ================= UPDATE STATUS (ADMIN) ================= */
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("UPDATE COMPLAINT STATUS ERROR 👉", error);
    res.status(500).json({ message: "Failed to update status" });
  }
};

/* ================= ADD ADMIN RESPONSE (ADMIN) ================= */
exports.respondToComplaint = async (req, res) => {
  try {
    const { adminResponse } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { adminResponse: adminResponse || "" },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json(complaint);
  } catch (error) {
    console.error("RESPOND COMPLAINT ERROR 👉", error);
    res.status(500).json({ message: "Failed to save response" });
  }
};

/* ================= DELETE COMPLAINT (ADMIN) ================= */
exports.deleteComplaint = async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndDelete(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted successfully" });
  } catch (error) {
    console.error("DELETE COMPLAINT ERROR 👉", error);
    res.status(500).json({ message: "Failed to delete complaint" });
  }
};
