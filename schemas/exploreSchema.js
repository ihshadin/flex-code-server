const mongoose = require('mongoose');

const exploreSchema = mongoose.Schema({
    image: String,
    title: String,
    description: String,
})

module.exports = exploreSchema;