const mongoose = require('mongoose');

const singleDigitSchema = new mongoose.Schema({
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
  digit: {
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

const SingleDigit = mongoose.model('SingleDigit', singleDigitSchema);

module.exports = SingleDigit;
