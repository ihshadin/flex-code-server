const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const blogSchema = require('../schemas/blogSchema');
const Blog = new mongoose.model("Blog", blogSchema);

// get all todos
router.get('/', async (req, res) => {
    console.log('This is home page for server site');
})


module.exports = router;