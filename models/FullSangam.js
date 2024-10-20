const mongoose = require('mongoose');

const fullSangamSchema = new mongoose.Schema({
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
  openPanna: {
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

const FullSangam = mongoose.model('FullSangam', fullSangamSchema);

module.exports = FullSangam;
