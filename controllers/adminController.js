const Notice = require("../models/Notice");
const ServiceApplication = require("../models/ServiceApplication");
const Scheme = require("../models/Scheme");
const Complaint = require("../models/Complaint");

exports.getDashboardStats = async (req, res) => {
  try {
    const [noticesCount, servicesCount, schemesCount, complaintsCount] =
      await Promise.all([
        Notice.countDocuments(),
        ServiceApplication.countDocuments(),
        Scheme.countDocuments(),
        Complaint.countDocuments(),
      ]);

    res.json({
      notices: noticesCount,
      services: servicesCount,
      schemes: schemesCount,
      complaints: complaintsCount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
