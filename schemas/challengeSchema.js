const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    sender: {
      type: String
    },
    receiver: {
      type: String
    },
    winner: {
      type: String,

    },
    winnerTime: {
      type: Number,

    },
    problem: {
      type: String,

    },
    problemId: {
      type: mongoose.Schema.Types.ObjectId,

    },
    timeStamp: {
      type: Number,
    },
    date: { type: Date, default: Date.now }
  });

  
module.exports = challengeSchema;