const Notice = require("../models/Notice");

// ================= ADD NOTICE =================
exports.addNotice = async (req, res) => {
  try {
    const notice = await Notice.create({
      title: req.body.title,
      description: req.body.description,
      isImportant: req.body.isImportant === "true",
      attachment: req.file ? req.file.path : null, // ✅ CLOUDINARY URL
    });

    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ message: "Failed to add notice" });
  }
};

// ================= GET ALL NOTICES =================
exports.getAllNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notices" });
  }
};

// ================= UPDATE NOTICE =================
exports.updateNotice = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      isImportant: req.body.isImportant === "true",
    };

    if (req.file) {
      updateData.attachment = req.file.path; // ✅ CLOUDINARY URL
    }

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
    console.error("Update notice error:", error);
    res.status(500).json({ message: "Failed to update notice" });
  }
};

// ================= DELETE NOTICE =================
exports.deleteNotice = async (req, res) => {
  try {
    await Notice.findByIdAndDelete(req.params.id);
    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete notice" });
  }
};
