const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: {
        type:  String,
    }
})

module.exports = userSchema;