const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: String,
  email: String,
  number: Number,
  address: String,
  amount: Number,
  currency: String,
  access: String,
  transactionId: String,
  paidStatus: String,
  time: Date,
});

module.exports = paymentSchema;
