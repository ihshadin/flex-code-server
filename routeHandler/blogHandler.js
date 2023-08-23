const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const blogSchema = require("../schemas/blogSchema");
const Blog = new mongoose.model("Blog", blogSchema);

// get all Blogs
router.get("/all", async (req, res) => {
  await Blog.find()
    .then((data) => {
      res.json({
        result: data,
      
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


// pagination 

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const result = await Blog.find()
      .skip(page * limit)
      .limit(limit);
    console.log(page, limit);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
