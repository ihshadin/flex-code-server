const mongoose = require('mongoose');

const sendEmailSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    date: {type: Date, default: Date.now}
})

module.exports = sendEmailSchema;