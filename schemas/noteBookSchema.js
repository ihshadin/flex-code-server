const mongoose = require('mongoose');

const nodeBookSchema = mongoose.Schema({
        title: String,
        details: String,
})

module.exports = nodeBookSchema;