const mongoose = require('mongoose');

const noteBookSchema = mongoose.Schema({
        title: String,
        details: String,
})

module.exports = noteBookSchema;