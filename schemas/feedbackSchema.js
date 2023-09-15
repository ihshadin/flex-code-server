const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    userName: String,
    username: String,
    thumbExpression: String,
    details: String,
    image: String,
    rating: Number,
    date: { type: Date, default: Date.now }
})

module.exports = feedbackSchema;