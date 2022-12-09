const express = require("express");
const router = new express.Router();
const Feed = require("../db/models/Feed");
const User = require("../db/models/User");

router.post("/uploadImg", async (req, res) => {
  try {
    const { url, tagsArray, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.status(401).send("User not found");
    }
    await Feed.create({
      url,
      tags: tagsArray,
      owner: userId,
    });
    res.status(201).send("Image uploaded successfully!");

  } catch (error) {
    res.status(500).send({ message: error.message || "Server Down!" });
  }
});

router.get("/getImgs", async (req, res) => {
  try {
    const imgs = await Feed.find({});
    res.status(200).json({
      imgs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server Down!" });
  }
});

router.get("/getImgsByTag", async (req, res) => {
  try {
    const imgs = await Feed.find( { tags: req.query.imgTag } );
    res.status(200).json({
      imgs,
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Server Down!" });
  }
});

module.exports = router;