const mongoose = require('mongoose');

const flexSchema = mongoose.Schema({
    title: {
        type: String,
    }
})

module.exports = flexSchema;