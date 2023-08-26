const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const nodeBookSchema = require('../schemas/nodeBookSchema');
const NodeBook = new mongoose.model("nodeBook", nodeBookSchema);

// get all Blogs
router.get("/", async (req, res) => {
  await NodeBook.find()
    .then((data) => {
      res.json({
        result: data,
        message: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        message: "error",
      });
    });
});

// Get Single blog details

router.get("/:id", async (req, res) => {
  const NodeBookId = req.params.id;
  try {
    const nodeBook = await Blog.findById(NodeBookId);
    if (!nodeBook) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    res.json({
      result: nodeBook,
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
    });
  }
});

// Create a new Blog
router.post("/", async (req, res) => {
  const newBlog = new NodeBook(req.body);
  try {
    await newBlog.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
    });
  }
});

module.exports = router;
