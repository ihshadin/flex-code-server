const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    
        title: String,
        Subtitle: String,
        userImage: String,
        imageUrl: String,
        userName: String,
        userRole: String,
        details: String,
})

module.exports = blogSchema;