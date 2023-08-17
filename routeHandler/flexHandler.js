const express = require('express');
const router = express.Router();
const feedbackSchema = require('../schemas/flexSchema');
const { mongoose } = require('mongoose');

const Feedback = new mongoose.model("Testimonial", feedbackSchema)
// get all todo
router.get('/', async (req, res) => {

})
router.post('/', async (req, res) => {
    const newTestimonial = new Feedback(req.body);
    await newTestimonial.save().then(() => {

        res.status(200).json({
            message: 'success'
        })
    }).catch((err) => {
        if(err){
            console.log(err);
            res.status(500).json({
                message: 'error'
        })}})
});

module.exports = router;