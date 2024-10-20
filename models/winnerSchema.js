const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  gameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  miniGame: {
    type: String,
    required: true,
  },
  winningNumber: {
    winningNumber1: {
      type: Number,
      required: true,
    },
    winningNumber2: {
      type: Number,
    },
  },
  amountWon: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Winner = mongoose.model('Winner', winnerSchema);

module.exports = Winner;
