const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const blogSchema = require("../schemas/blogSchema");
const verifyLogin = require("../middlewares/verifyLogin");
const Blog = new mongoose.model("Blog", blogSchema);


router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const itemsPerPage = parseInt(req.query.itemsPerPage) || 10;

    // calculate the skip value
    const skip = page * itemsPerPage;

    // Total number of blogs
    const totalCount = await Blog.countDocuments();

    const data = await Blog.find().skip(skip).limit(itemsPerPage);

    res.json({ data, totalCount });
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
});

// Get Single blog details
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
});

// Create a new Blog
router.post("/", async (req, res) => {
  const newBlog = new Blog(req.body);
  try {
    await newBlog.save();
    res.status(200).json({
      message: "success",
    });
  } catch (err) {
    res.status(500).json({
      message: "error",
    });
  }
});

module.exports = router;
