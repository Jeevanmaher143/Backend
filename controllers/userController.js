const ServiceApplication = require("../models/ServiceApplication");

exports.getUserProfile = async (req, res) => {
  try {
    const user = {
      fullName: req.user.fullName,
      email: req.user.email,
      mobile: req.user.mobile,
      village: req.user.village,
    };

    const services = await ServiceApplication.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ user, services });
  } catch (error) {
    console.error("PROFILE ERROR 👉", error);
    res.status(500).json({ message: "Failed to load profile" });
  }
};
