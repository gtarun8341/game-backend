const express = require('express');
const verifyToken = require('../middlewares/verifyToken'); // Adjust the path as needed
const { getUserWinnings,getAllWinners ,getAllWinningNumbers} = require('../controllers/winnerController'); // Import the controller function

const router = express.Router();

// Route to get winning details of a user
router.get('/user-winnings', verifyToken, getUserWinnings);
router.get('/All-winners', getAllWinners);
router.get('/all-winning-numbers', getAllWinningNumbers); // New route for winning numbers

module.exports = router;
