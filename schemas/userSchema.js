const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userRole: String,
  gender: String,
  address: String,
  socialLinks: Array,
  website: String,
  mobile: Number,
  dateOfBirth: Date,
  education: Array,
  skills: Array,
  userPhotoUrl: String,
});

module.exports = userSchema;
