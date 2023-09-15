const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const feedbackSchema = require('../schemas/feedbackSchema');
const verifyLogin = require('../middlewares/verifyLogin');
const Feedback = new mongoose.model("Feedback", feedbackSchema);


router.get('/', async (req, res) => {
    await Feedback.find().sort({data: 'desc'}).then((data) => {
        res.json(data)
    }).catch(err => {
        console.log(err);
        res.json({
            message: "error"
        })
    })
})

router.post('/', async (req, res) => {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save().then((data) => {

        res.status(200).json({
            message: 'success'
        })
    }).catch((err) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                message: 'error'
            })
        }
    })
});


module.exports = router;