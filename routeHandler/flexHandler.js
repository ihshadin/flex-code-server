const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/flexSchema');
const Todo = new mongoose.model("Todo", todoSchema);

// get all todos
router.get('/', async (req, res) => {
    console.log('This is home page for server');
})


module.exports = router;