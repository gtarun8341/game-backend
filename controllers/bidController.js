const SingleDigit = require('../models/SingleDigit');
const JodiDigit = require('../models/JodiDigit');
const SinglePanna = require('../models/SinglePanna');
const JodiPanna = require('../models/JodiPanna');
const TriplePanna = require('../models/TriplePanna');
const HalfSangam = require('../models/HalfSangam');
const FullSangam = require('../models/FullSangam');
const Game = require('../models/Game');

const getBidHistory = async (req, res) => {
  try {
    console.log("working")
    const userId = req.userId; // Extracted from JWT
    const allBids = [];

    // // Function to fetch bids and push to allBids
    // const fetchBids = async (Model, type) => {
    //   const bids = await Model.find({ userId }).populate('gameId', 'name');
    //   bids.forEach(bid => {
    //     allBids.push({
    //         id: bid._id,
    //       date: bid.date,
    //       gameName: bid.gameId.name,
    //       gameType: bid.type,
    //       bidDigit: bid.digit,
    //       points: bid.amount,
    //     });
    //   });
    // };

    const fetchBids = async (Model, type, processBid) => {
      const bids = await Model.find({ userId }).populate('gameId', 'name');
      bids.forEach(bid => {
        allBids.push(processBid(bid, type));
      });
    };

    // Function to handle standard bids (for SingleDigit, JodiDigit, SinglePanna, etc.)
    const processStandardBid = (bid, type) => ({
      id: bid._id,
      date: bid.date,
      gameName: bid.gameId.name,
      gameType: bid.type,
      bidDigit: bid.digit,
      points: bid.amount,
    });

    // Function to handle Half Sangam bids
    const processHalfSangamBid = (bid) => ({
      id: bid._id,
      date: bid.date,
      gameName: bid.gameId.name,
      gameType: bid.type,
      bidDigit: `${bid.openDigit} - ${bid.closePanna}`,
      points: bid.amount,
    });

    // Function to handle Full Sangam bids
    const processFullSangamBid = (bid) => ({
      id: bid._id,
      date: bid.date,
      gameName: bid.gameId.name,
      gameType: bid.type,
      bidDigit: `${bid.openPanna} - ${bid.closePanna}`,
      points: bid.amount,
    });

    // Fetch bids from all models
    await Promise.all([
      fetchBids(SingleDigit, 'Single Digit', processStandardBid),
      fetchBids(JodiDigit, 'Jodi Digit', processStandardBid),
      fetchBids(SinglePanna, 'Single Panna', processStandardBid),
      fetchBids(JodiPanna, 'Jodi Panna', processStandardBid),
      fetchBids(TriplePanna, 'Triple Panna', processStandardBid),
      fetchBids(HalfSangam, 'Half Sangam', processHalfSangamBid),
      fetchBids(FullSangam, 'Full Sangam', processFullSangamBid),
    ]);

    // Fetch bids from all models
    // await Promise.all([
    //   fetchBids(SingleDigit, 'Single Digit'),
    //   fetchBids(JodiDigit, 'Jodi Digit'),
    //   fetchBids(SinglePanna, 'Single Panna'),
    //   fetchBids(JodiPanna, 'Jodi Panna'),
    //   fetchBids(TriplePanna, 'Triple Panna'),
    //   fetchBids(HalfSangam, 'Half Sangam'),
    //   fetchBids(FullSangam, 'Full Sangam'),
    // ]);

    // Sort bids by date in descending order
    allBids.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json(allBids);
  } catch (error) {
    console.error('Error fetching bid history:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getBidHistory,
};
