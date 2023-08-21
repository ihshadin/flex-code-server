const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    userName: String,
    thumbExpression: String,
    details: String,
    image: String,
    rating: Number
})

module.exports = feedbackSchema;