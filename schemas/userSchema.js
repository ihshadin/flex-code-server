const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: String,
  date: Date,
  userRole: String,
  gender: String,
  address: String,
  fbLinks: String,
  LinkLinks: String,
  webSiteLink: String,
  github: String,
  mobile: Number,
  isPremium: Boolean,
  dateOfBirth: Date,
  education: Array,
  skills: Array,
  userPhotoUrl: String,
});

module.exports = userSchema;
