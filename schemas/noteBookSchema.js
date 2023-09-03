const mongoose = require('mongoose');

const noteBookSchema = mongoose.Schema({
        title: String,
        details: String,
        userEmail: String,
        date: Date,
})

module.exports = noteBookSchema;