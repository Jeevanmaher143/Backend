const Development = require("../models/Development");

// ADD PROJECT
exports.addProject = async (req, res) => {
  try {
    const { projectName, description, progress, fundsUsed } = req.body;

    if (!projectName || progress === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const status = Number(progress) === 100 ? "Completed" : "Ongoing";

    // ✅ FIXED IMAGE PATH
    const images = req.files
      ? req.files.map((file) => file.path) // Cloudinary gives URL in file.path
      : [];

    const project = await Development.create({
     projectName,
      description,
      status,
      progress,
      fundsUsed,
      images
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Add project error:", error);
    res.status(500).json({ message: "Failed to add project" });
  }
};

// GET ALL PROJECTS
exports.getProjects = async (req, res) => {
  try {
    const projects = await Development.find().sort({ createdAt: -1 }).limit(6);
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json([]);
  }
};

// UPDATE PROJECT
exports.updateProject = async (req, res) => {
  try {
    const { progress } = req.body;
    const status = Number(progress) === 100 ? "Completed" : "Ongoing";

    const project = await Development.findByIdAndUpdate(
      req.params.id,
      { ...req.body, status },
      { new: true }
    );

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// DELETE PROJECT
exports.deleteProject = async (req, res) => {
  try {
    await Development.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
