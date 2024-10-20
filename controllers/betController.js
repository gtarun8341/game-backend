const SingleDigit = require('../models/SingleDigit');
const JodiDigit = require('../models/JodiDigit');
const SinglePanna = require('../models/SinglePanna');
const JodiPanna = require('../models/JodiPanna');
const TriplePanna = require('../models/TriplePanna');
const HalfSangam = require('../models/HalfSangam');
const FullSangam = require('../models/FullSangam');
const { User, Transaction } = require('../models/User');

// Single Digit Bet
exports.placeSingleDigitBet = async (req, res) => {
  try {
    console.log(req.body);
    const { bets, totalPoints } = req.body;
    const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !userId) {
      return res.status(400).json({ message: 'Bets array and userId are required.' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { digit, amount, type, gameId } = bet;

      if (!digit || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(digit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new SingleDigit({ digit: numericDigit, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }

    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSingleDigitBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await SingleDigit.find({ userId: req.userId ,gameId});
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteSingleDigitBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await SingleDigit.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await SingleDigit.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Jodi Digit Bet
// Jodi Digit Bet
exports.placeJodiDigitBet = async (req, res) => {
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { digit, amount, type, gameId } = bet;

      if (!digit || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(digit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new JodiDigit({ digit: numericDigit, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }

    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getJodiDigitBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await JodiDigit.find({ userId: req.userId ,gameId});
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.deleteJodiDigitBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }
console.log(betId,"asdfghjk")
    // Check if the bet exists
    const bet = await JodiDigit.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await JodiDigit.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Single Panna Bet
// Single Panna Bet
exports.placeSinglePannaBet = async (req, res) => {
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { digit, amount, type, gameId } = bet;

      if (!digit || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(digit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new SinglePanna({ digit: numericDigit, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }
    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSinglePannaBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await SinglePanna.find({ userId: req.userId,gameId });
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteSinglePannaBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await SinglePanna.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await SinglePanna.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Jodi Panna Bet
// Jodi Panna Bet
exports.placeJodiPannaBet = async (req, res) => {
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { digit, amount, type, gameId } = bet;

      if (!digit || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(digit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new JodiPanna({ digit: numericDigit, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }

    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getJodiPannaBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await JodiPanna.find({ userId: req.userId,gameId });
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteJodiPannaBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await JodiPanna.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await JodiPanna.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Triple Panna Bet
// Triple Panna Bet
exports.placeTriplePannaBet = async (req, res) => {
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }

    // Verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { digit, amount, type, gameId } = bet;

      if (!digit || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(digit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new TriplePanna({ digit: numericDigit, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }

    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getTriplePannaBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await TriplePanna.find({ userId: req.userId,gameId });
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTriplePannaBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await TriplePanna.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await TriplePanna.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
// Half Sangam Bet
exports.placeHalfSangamBet = async (req, res) => {
  console.log(req.body)
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;
    // const { openDigit, closePanna,type, amount, gameId } = req.body;
    // const userId = req.userId;
    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }

    // if (!openDigit || !closePanna || !amount || !userId) {
    //   return res.status(400).json({ message: 'openDigit, closePanna, amount, and userId are required.' });
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }
    // Save all bets
    const newBets = [];
    for (const bet of bets) {
      const { openDigit,closePanna, amount, type, gameId } = bet;

      if (!openDigit ||!closePanna || !amount || !gameId) {
        return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
      }

      // Convert digit to Number if it's not already
      const numericDigit = Number(openDigit);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }
      const numericclosePanna = Number(closePanna);
      if (isNaN(numericDigit)) {
        return res.status(400).json({ message: 'Digit must be a number.' });
      }

      const newBet = new HalfSangam({openDigit:numericDigit, closePanna:numericclosePanna, amount, type, gameId, userId });
      await newBet.save();
      newBets.push(newBet);
    }

    user.wallet -= totalPoints;
    await user.save();

    res.status(201).json({ bets: newBets, totalPoints });

    // const newBet = new HalfSangam({ openDigit, openDigit, amount,type, gameId, userId });
    // await newBet.save();

    // res.status(201).json(newBet);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getHalfSangamBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await HalfSangam.find({ userId: req.userId,gameId });
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteHalfSangamBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await HalfSangam.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await HalfSangam.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Full Sangam Bet
exports.placeFullSangamBet = async (req, res) => {
  try {
    const { bets, totalPoints } = req.body; // Expecting an array of bets and total points
    const userId = req.userId;
    // const { openPanna, closePanna, amount,type, gameId } = req.body;
    // const userId = req.userId;

    if (!bets || !Array.isArray(bets) || bets.length === 0 || !totalPoints || !userId) {
      return res.status(400).json({ message: 'Bets array, totalPoints, and userId are required.' });
    }
    // if (!openPanna || !closePanna || !amount || !userId) {
    //   return res.status(400).json({ message: 'openPanna, closePanna, amount, and userId are required.' });
    // }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid userId.' });
    }

     // Save all bets
     const newBets = [];
     for (const bet of bets) {
       const { openPanna,closePanna, amount, type, gameId } = bet;
 
       if (!openPanna ||!closePanna || !amount || !gameId) {
         return res.status(400).json({ message: 'Digit, amount, and gameId are required for each bet.' });
       }
 
       // Convert digit to Number if it's not already
       const numericDigit = Number(openPanna);
       if (isNaN(numericDigit)) {
         return res.status(400).json({ message: 'Digit must be a number.' });
       }
       const numericclosePanna = Number(closePanna);
       if (isNaN(numericDigit)) {
         return res.status(400).json({ message: 'Digit must be a number.' });
       }
 
       const newBet = new FullSangam({openPanna:numericDigit, closePanna:numericclosePanna, amount, type, gameId, userId });
       await newBet.save();
       newBets.push(newBet);
     }
 
     user.wallet -= totalPoints;
     await user.save();
 
     res.status(201).json({ bets: newBets, totalPoints });

    // const newBet = new FullSangam({ openPanna, closePanna, amount,type, gameId, userId });
    // await newBet.save();

    // res.status(201).json(newBet);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFullSangamBets = async (req, res) => {
  try {
    const { gameId } = req.query;
    const bets = await FullSangam.find({ userId: req.userId ,gameId});
    res.status(200).json(bets);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteFullSangamBet = async (req, res) => {
  try {
    const betId = req.params.id;

    // Check if the provided ID is valid
    if (!betId) {
      console.log('Invalid Bet ID provided');
      return res.status(400).json({ message: 'Bet ID is required.' });
    }

    // Check if the bet exists
    const bet = await FullSangam.findById(betId);
    console.log('Bet found:', bet);

    if (!bet) {
      console.log('Bet not found with ID:', betId);
      return res.status(404).json({ message: 'Bet not found.' });
    }

    // Check if the user is authorized to delete this bet
    if (bet.userId.toString() !== req.userId) {
      console.log('Unauthorized to delete this bet');
      return res.status(403).json({ message: 'Unauthorized to delete this bet.' });
    }

    // Delete the bet
    await FullSangam.deleteOne({ _id: betId });

    console.log('Bet deleted successfully');
    res.status(200).json({ message: 'Bet deleted successfully.' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};