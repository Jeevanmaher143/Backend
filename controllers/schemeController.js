const Scheme = require("../models/Scheme");

// ================= ADD SCHEME (ADMIN) =================
exports.addScheme = async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Failed to add scheme" });
  }
};

// ================= GET ALL SCHEMES (PUBLIC) =================
exports.getAllSchemes = async (req, res) => {
  try {
    const schemes = await Scheme.find().sort({ createdAt: -1 }).limit(10);
    res.json(schemes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schemes" });
  }
};

// ================= UPDATE SCHEME (ADMIN) =================
exports.updateScheme = async (req, res) => {
  try {
    const scheme = await Scheme.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }

    res.json(scheme);
  } catch (error) {
    res.status(500).json({ message: "Failed to update scheme" });
  }
};

// ================= DELETE SCHEME (ADMIN) =================
exports.deleteScheme = async (req, res) => {
  try {
    await Scheme.findByIdAndDelete(req.params.id);
    res.json({ message: "Scheme deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete scheme" });
  }
};
