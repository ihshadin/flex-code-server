const mongoose = require('mongoose');

const nodeBookSchema = mongoose.Schema({
    
        name: String,
        details: String,
})

module.exports = nodeBookSchema;