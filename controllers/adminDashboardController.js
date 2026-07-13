const Development = require("../models/Development");
const ServiceApplication = require("../models/ServiceApplication");

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalProjects, totalApplications, approvedDocs, rejectedDocs] =
      await Promise.all([
        Development.countDocuments(),
        ServiceApplication.countDocuments(),
        ServiceApplication.countDocuments({ status: "Approved" }),
        ServiceApplication.countDocuments({ status: "Rejected" }),
      ]);

    res.json({
      totalProjects,
      totalApplications,
      approvedDocs,
      rejectedDocs,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
