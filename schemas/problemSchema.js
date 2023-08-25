const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    
   
    title: String ,
    functionName: String,
    problemsDetails: String,
    highlightWords: Array,
    examples:Array,
    parameterName: Array,
    level: String,
    isPremium: Boolean,
    language: String,
})

module.exports = blogSchema;