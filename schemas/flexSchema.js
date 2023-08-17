const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: String
})

module.exports = feedbackSchema;