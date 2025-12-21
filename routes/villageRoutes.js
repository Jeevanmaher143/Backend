const express = require("express");
const router = express.Router();

const { getVillage, saveVillage } = require("../controllers/villageController");
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/", getVillage); // public
router.post("/", protect, adminOnly, saveVillage); // admin

module.exports = router;
