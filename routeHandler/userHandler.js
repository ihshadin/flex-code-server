const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const checkLogin = require('../middlewares/checkLogin');
const User = new mongoose.model("User", userSchema);

// get all todos
router.get('/', checkLogin, async (req, res) => {
    console.log('This is home page for server site');
})


module.exports = router;