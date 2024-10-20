const mongoose = require('mongoose');

const halfSangamSchema = new mongoose.Schema({
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
  openDigit: {
    type: Number,
    required: true,
  },
  closePanna: {
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
  date: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
});

const HalfSangam = mongoose.model('HalfSangam', halfSangamSchema);

module.exports = HalfSangam;
