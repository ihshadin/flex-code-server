const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const feedbackSchema = require('../schemas/feedbackSchema');
const checkLogin = require('../middlewares/checkLogin');
const Feedback = new mongoose.model("Feedback", feedbackSchema);

// get all todos
router.get('/', async (req, res) => {
        await Feedback.find().then((data) => {
           console.log(data);
                res.json({
                    result: data,
                    message: 'success'
                })
            
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
        if(err){
            console.log(err);
            res.status(500).json({
                message: 'error'
        })}})
});


module.exports = router;