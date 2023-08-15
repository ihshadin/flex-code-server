const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
    }
})

module.exports = todoSchema;