const express = require("express");
const router = express.Router();

const {
  register,
  login
} = require("../controllers/authController");
const User = require("../models/User");

router.delete("/delete-user/:email", async (req, res) => {
  try {
    const email = req.params.email;
    await User.deleteOne({ email });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user" });
  }
});

router.post("/register", register);
router.post("/login", login);

module.exports = router;
