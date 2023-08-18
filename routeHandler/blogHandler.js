const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const blogSchema = require("../schemas/blogSchema");
const Blog = new mongoose.model("Blog", blogSchema);

// get all Blogs
router.get("/", async (req, res) => {
  await Blog.find()
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
  const blogId = req.params.id;
  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    res.json({
      result: blog,
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
  const newBlog = new Blog(req.body);
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
