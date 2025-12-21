const Notice = require("../models/Notice");

// ================= ADD NOTICE (WITH FILE) =================
exports.addNotice = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const notice = await Notice.create({
      title: req.body.title,
      description: req.body.description,
      isImportant: req.body.isImportant === "true",
      attachment: req.file
        ? `/uploads/notices/${req.file.filename}`
        : null,
    });

    res.status(201).json(notice);
  } catch (error) {
    console.error(error);
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
    const { title, description, isImportant } = req.body;

    const attachment = req.file
      ? `/uploads/notices/${req.file.filename}`
      : undefined;

    const notice = await Notice.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        isImportant,
        ...(attachment && { attachment }),
      },
      { new: true }
    );

    if (!notice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json(notice);
  } catch (error) {
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
