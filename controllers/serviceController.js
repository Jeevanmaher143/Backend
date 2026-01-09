const ServiceApplication = require("../models/ServiceApplication");

/* ================= USER APPLY ================= */
const applyService = async (req, res) => {
  try {
    const {
      serviceType,
      fullName,
      address,
      mobile,
      deceasedName,
      dateOfDeath,
    } = req.body;

    if (!serviceType || !fullName || !address || !mobile) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const documents = {};
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file) => {
        documents[file.fieldname] = file.path;
      });
    }

    const application = new ServiceApplication({
      user: req.user._id,
      serviceType,
      fullName,
      address,
      mobile,
      deceasedName,
      dateOfDeath,
      documents,
      status: "Pending",
    });

    await application.save();

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("APPLY SERVICE ERROR 👉", error);
    res.status(500).json({ message: "Failed to submit application" });
  }
};

/* ================= ADMIN UPDATE STATUS ================= */
const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminRemark } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const application = await ServiceApplication.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = status;
    application.adminRemark = adminRemark || "";
    await application.save();

    res.json({ message: `Application ${status} successfully` });
  } catch (error) {
    console.error("UPDATE STATUS ERROR 👉", error);
    res.status(500).json({ message: "Failed to update application" });
  }
};

/* ================= DELETE APPLICATION ================= */
const deleteApplication = async (req, res) => {
  try {
    const application = await ServiceApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await application.deleteOne();

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("DELETE APPLICATION ERROR 👉", error);
    res.status(500).json({ message: "Failed to delete application" });
  }
};

/* ================= EXPORTS (CRITICAL) ================= */
module.exports = {
  applyService,
  updateApplicationStatus,
  deleteApplication,
};
