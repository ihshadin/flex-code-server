const express = require('express');
const router = express.Router();
const feedbackSchema = require('../schemas/flexSchema');
const { mongoose } = require('mongoose');

const Feedback = new mongoose.model("Testimonial", feedbackSchema)
// get all todo
router.get('/', async (req, res) => {

})


module.exports = router;