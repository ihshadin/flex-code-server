const express = require('express');
const router = express.Router();
const sendEmailSchema = require('../schemas/sendEmailSchema');
const { mongoose } = require('mongoose');
const verifyLogin = require('../middlewares/verifyLogin');
const verifyAdmin = require('../middlewares/verifyAdmin');
const SendEmail = new mongoose.model("SendEmail", sendEmailSchema)


  // Define your GET route
  router.get('/', verifyLogin, verifyAdmin, async (req, res)=> {
    try {
        const emails = await SendEmail.find();
        res.json(emails);
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error'});
    }
  });


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