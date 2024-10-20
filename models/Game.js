const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  singleDigit: {
    winningNumber1: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SingleDigit',
    }],
  },
  jodiDigit: {
    winningNumber1: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JodiDigit',
    }],
  },
  singlePanna: {
    winningNumber1: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SinglePanna',
    }],
  },
  jodiPanna: {
    winningNumber1: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'JodiPanna',
    }],
  },
  triplePanna: {
    winningNumber1: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TriplePanna',
    }],
  },
  halfSangam: {
    winningNumber1: {
      type: Number,
    },
    winningNumber2: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HalfSangam',
    }],
  },
  fullSangam: {
    winningNumber1: {
      type: Number,
    },
    winningNumber2: {
      type: Number,
    },
    bets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FullSangam',
    }],
  },
  date: {
    type: Date,
    default: Date.now, // Sets the default value to the current date and time
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
