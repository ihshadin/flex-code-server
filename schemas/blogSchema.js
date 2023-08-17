const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    
        title: String,
        Subtitle: String,
        image: String,
        userImage: String,
        userName: String,
        userRole: String,
        details: String,
})

module.exports = blogSchema;