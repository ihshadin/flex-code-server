const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const feedbackSchema = require('../schemas/feedbackSchema');
const Feedback = new mongoose.model("Feedback", feedbackSchema);

// get all todos
router.get('/', async (req, res) => {
    console.log('This is home page for server site');
})

router.post('/', async (req, res) => {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save().then(() => {

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