const Village = require("../models/Village");

// GET village info (PUBLIC)
exports.getVillage = async (req, res) => {
  const village = await Village.findOne();
  res.json(village);
};

// CREATE / UPDATE village (ADMIN)
exports.saveVillage = async (req, res) => {
  const data = req.body;

  let village = await Village.findOne();
  if (village) {
    village = await Village.findByIdAndUpdate(village._id, data, { new: true });
  } else {
    village = await Village.create(data);
  }

  res.json(village);
};
