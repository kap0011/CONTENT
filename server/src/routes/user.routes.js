const express = require("express");
const router = new express.Router();

const User = require("../db/models/User");

router.get("/user", async (req, res) => {
  try {
    // Not implemented login so for demo we are using name as of now (hardcoded)
    const user = await User.findOne({firstName: 'Dip'});
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Failed to Login",
    });
  }
});

module.exports = router;
