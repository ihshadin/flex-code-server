const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const feedbackSchema = require('../schemas/feedbackSchema');
const Feedback = new mongoose.model("Feedback", feedbackSchema);

// get all todos
router.get('/', async (req, res) => {
    console.log('This is home page for server site');
})


module.exports = router;