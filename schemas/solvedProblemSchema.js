const mongoose = require('mongoose');

const solvedProblemSchema = mongoose.Schema({
    userEmail: String,
    username: String,//jahid
    date: Date,
    title: String,
    functionName: String,
    level: String,
    language: String,
    functionId: String,
    points: Number,
})

module.exports = solvedProblemSchema;