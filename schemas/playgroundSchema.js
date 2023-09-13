const mongoose = require('mongoose');

const playgroundSchema = mongoose.Schema({
    projectName: String,
      htmlCode: String,
      cssCode: Object,
      jsCode: Object,
      username: Object,
})

module.exports = playgroundSchema;