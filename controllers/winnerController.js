const Winner = require('../models/winnerSchema'); // Adjust the path as needed
const Game = require('../models/Game'); // Adjust the path as needed

// Controller to get the winning details of the user
const getUserWinnings = async (req, res) => {
  try {
    console.log("entered")
    const userId = req.userId; // Get the userId from the verified token

    // Fetch the winning details for the user
    const winnings = await Winner.find({ userId }).populate('gameId'); // Use populate to get game details if needed

    // Check if winnings exist
    if (!winnings || winnings.length === 0) {
      return res.status(404).json({ message: 'No winnings found for this user.' });
    }

    // Respond with the winning details
    res.status(200).json(winnings);
  } catch (error) {
    console.error('Error fetching winnings:', error);
    res.status(500).json({ message: 'An error occurred while fetching winnings.' });
  }
};
const getAllWinners = async (req, res) => {
  try {
    // Fetch all winners from the database
    const winners = await Winner.find().populate('gameId').populate('userId'); // Populate userId if needed

    // Check if winners exist
    if (!winners || winners.length === 0) {
      return res.status(404).json({ message: 'No winners found.' });
    }

    // Respond with all winners
    res.status(200).json(winners);
  } catch (error) {
    console.error('Error fetching all winners:', error);
    res.status(500).json({ message: 'An error occurred while fetching winners.' });
  }
};

const getAllWinningNumbers = async (req, res) => {
  try {
    // Fetch all games
    const games = await Game.find();

    // Map through games to extract winning numbers
    const winningNumbers = games.map(game => ({
      name: game.name,
      singleDigit: game.singleDigit.winningNumber1,
      jodiDigit: game.jodiDigit.winningNumber1,
      singlePanna: game.singlePanna.winningNumber1,
      jodiPanna: game.jodiPanna.winningNumber1,
      triplePanna: game.triplePanna.winningNumber1,
      halfSangam: {
        number1: game.halfSangam.winningNumber1,
        number2: game.halfSangam.winningNumber2,
      },
      fullSangam: {
        number1: game.fullSangam.winningNumber1,
        number2: game.fullSangam.winningNumber2,
      },
    }));

    // Respond with the winning numbers
    res.status(200).json(winningNumbers);
  } catch (error) {
    console.error('Error fetching winning numbers:', error);
    res.status(500).json({ message: 'An error occurred while fetching winning numbers.' });
  }
};

// Export the function
module.exports = { getUserWinnings, getAllWinners, getAllWinningNumbers };