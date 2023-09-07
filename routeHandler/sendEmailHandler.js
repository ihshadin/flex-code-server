const express = require('express');
const router = express.Router();
const sendEmailSchema = require('../schemas/sendEmailSchema');
const { mongoose } = require('mongoose');
const SendEmail = new mongoose.model("SendEmail", sendEmailSchema)


router.get('/', async (req, res) => {

})
router.post('/', async (req, res) => {
    try {
        const newSendEmail = new SendEmail(req.body);
        await newSendEmail.save();
        res.status(200).json({
            message: "success",
        });
    } catch (err) {
        res.status(500).json({
            message: "error",
        });
    }
})


module.exports = router;