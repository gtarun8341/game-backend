const Game = require('../models/Game');

// Get all games
exports.getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific game
exports.getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const game = await Game.findById(id).populate('user').populate('bets');

    if (!game) {
      return res.status(404).json({ message: 'Game not found.' });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
