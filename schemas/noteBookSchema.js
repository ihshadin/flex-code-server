const mongoose = require('mongoose');

const noteBookSchema = mongoose.Schema({
        title: String,
        details: String,
        userEmail: String,
        date: { type: Date, default: Date.now }
})

module.exports = noteBookSchema;