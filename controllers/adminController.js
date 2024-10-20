const Game = require('../models/Game');
const Bet = require('../models/Bet');
const { User, Transaction } = require('../models/User');
const SingleDigit = require('../models/SingleDigit');
const JodiDigit = require('../models/JodiDigit');
const SinglePanna = require('../models/SinglePanna');
const JodiPanna = require('../models/JodiPanna');
const TriplePanna = require('../models/TriplePanna');
const HalfSangam = require('../models/HalfSangam');
const FullSangam = require('../models/FullSangam');
const Winner = require('../models/winnerSchema'); // Import the Winner model


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details', error });
  }
};

// Create a new game
exports.createGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    await newGame.save();
    res.status(201).json(newGame);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all games
exports.getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single game by ID
exports.getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(game);
  } catch (error) {
    console.error('Error fetching game:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a game by ID
exports.updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json(updatedGame);
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a game by ID
exports.deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ message: 'Game not found' });
    }
    res.status(200).json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
const betTypes = ['SingleDigit', 'JodiDigit', 'SinglePanna', 'JodiPanna', 'TriplePanna', 'HalfSangam', 'FullSangam'];


exports.betTypes = async (req, res) => {
  try {
    // Return the array of bet types as JSON response
    res.json(betTypes);
  } catch (error) {
    console.error('Failed to fetch bet types:', error);
    res.status(500).json({ error: 'Failed to fetch bet types' });
  }
};

exports.declareWinningNumber = async (req, res) => {
  console.log(req.body, req.params.betType);
  const gameName = req.params.betType;
  const { gameId, winningNumber } = req.body; // winningNumber is expected to have winningNumber1 and winningNumber2
  console.log(gameName);

  try {
    let game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    let usersWithWinningBets = [];

    switch (gameName) {
      case 'SingleDigit':
        game.singleDigit.winningNumber1 = winningNumber; // Update with winningNumber1
        await game.save();
        usersWithWinningBets = await SingleDigit.find({ gameId: gameId, digit: winningNumber }).populate('userId');
        break;

      case 'JodiDigit':
        game.jodiDigit.winningNumber1 = winningNumber; // Update with winningNumber1
        await game.save();
        usersWithWinningBets = await JodiDigit.find({ gameId: gameId, digit: winningNumber }).populate('userId');
        break;

      case 'SinglePanna':
        game.singlePanna.winningNumber1 = winningNumber; // Update with winningNumber1
        await game.save();
        usersWithWinningBets = await SinglePanna.find({ gameId: gameId, digit: winningNumber }).populate('userId');
        break;

      case 'JodiPanna':
        game.jodiPanna.winningNumber1 = winningNumber; // Update with winningNumber1
        await game.save();
        usersWithWinningBets = await JodiPanna.find({ gameId: gameId, digit: winningNumber }).populate('userId');
        break;

      case 'TriplePanna':
        game.triplePanna.winningNumber1 = winningNumber; // Update with winningNumber1
        await game.save();
        usersWithWinningBets = await TriplePanna.find({ gameId: gameId, digit: winningNumber }).populate('userId');
        break;

      case 'HalfSangam':
        // Set both winning numbers
        game.halfSangam.winningNumber1 = winningNumber.winningNumber1;
        game.halfSangam.winningNumber2 = winningNumber.winningNumber2;
        await game.save();

        // Find users with winning bets for both numbers
        usersWithWinningBets = await HalfSangam.find({
          gameId: gameId,
          $or: [
            { openDigit: winningNumber.winningNumber1 },
            { closePanna: winningNumber.winningNumber2 }
          ]
        }).populate('userId');
        break;

      case 'FullSangam':
        // Set both winning numbers
        game.fullSangam.winningNumber1 = winningNumber.winningNumber1;
        game.fullSangam.winningNumber2 = winningNumber.winningNumber2;
        await game.save();

        // Find users with winning bets for both numbers
        usersWithWinningBets = await FullSangam.find({
          gameId: gameId,
          $or: [
            { openPanna: winningNumber.winningNumber1 },
            { closePanna: winningNumber.winningNumber2 }
          ]
        }).populate('userId');
        break;

      default:
        return res.status(400).json({ error: 'Invalid gameName' });
    }

    // Extract user details and bets
    const usernames = usersWithWinningBets.map(bet => bet.userId.username);
    const bets = usersWithWinningBets.map(bet => ({
      username: bet.userId.username,
      amount: bet.amount,
      number: bet.digit,
    }));

    // Update each winning user's wallet and save winner details
    for (const bet of usersWithWinningBets) {
      const user = await User.findById(bet.userId._id);
      if (user) {
        user.wallet += 10; // Increase wallet balance by 10
        await user.save();

        // Save the winner details in the Winner collection
        const newWinner = new Winner({
          gameId: game._id,
          userId: user._id,
          miniGame: gameName,
          winningNumber: 
          gameName === 'HalfSangam' || gameName === 'FullSangam' 
            ? {
                winningNumber1: winningNumber.winningNumber1,
                winningNumber2: winningNumber.winningNumber2,
              } 
            : {
              winningNumber1: winningNumber,
            } ,
        amountWon: 10,
        });

        await newWinner.save();
      }
    }

    res.json({ usernames, bets });
  } catch (error) {
    console.error('Failed to declare winning number:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
