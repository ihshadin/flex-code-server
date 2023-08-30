const mongoose = require('mongoose');

const exploreSchema = mongoose.Schema({
    title: String,
    desc: String,
})

module.exports = exploreSchema;