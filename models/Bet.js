const mongoose = require('mongoose');

const betSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Bet', betSchema);
