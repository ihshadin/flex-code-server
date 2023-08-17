const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    title: {
        type: String,
    }
})

module.exports = feedbackSchema;