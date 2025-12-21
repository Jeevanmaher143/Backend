const Development = require("../models/Development");
const ServiceApplication = require("../models/ServiceApplication");

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProjects = await Development.countDocuments();

    const totalApplications = await ServiceApplication.countDocuments();

    const approvedDocs = await ServiceApplication.countDocuments({
      status: "Approved",
    });

    const rejectedDocs = await ServiceApplication.countDocuments({
      status: "Rejected",
    });

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
