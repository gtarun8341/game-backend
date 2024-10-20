const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const betController = require('../controllers/betController');

// Routes for Single Digit
router.post('/single-digit', verifyToken, betController.placeSingleDigitBet);
router.get('/single-digit', verifyToken, betController.getSingleDigitBets);
router.delete('/single-digit/:id', verifyToken, betController.deleteSingleDigitBet); // New route for deleting a specific bet

// Routes for Jodi Digit
router.post('/jodi-digit', verifyToken, betController.placeJodiDigitBet);
router.get('/jodi-digit', verifyToken, betController.getJodiDigitBets);
router.delete('/jodi-digit/:id', verifyToken, betController.deleteJodiDigitBet); // New route for deleting a specific bet

// Routes for Single Panna
router.post('/single-panna', verifyToken, betController.placeSinglePannaBet);
router.get('/single-panna', verifyToken, betController.getSinglePannaBets);
router.delete('/single-panna/:id', verifyToken, betController.deleteSinglePannaBet); // New route for deleting a specific bet

// Routes for Jodi Panna
router.post('/jodi-panna', verifyToken, betController.placeJodiPannaBet);
router.get('/jodi-panna', verifyToken, betController.getJodiPannaBets);
router.delete('/jodi-panna/:id', verifyToken, betController.deleteJodiPannaBet); // New route for deleting a specific bet

// Routes for Triple Panna
router.post('/triple-panna', verifyToken, betController.placeTriplePannaBet);
router.get('/triple-panna', verifyToken, betController.getTriplePannaBets);
router.delete('/triple-panna/:id', verifyToken, betController.deleteTriplePannaBet); // New route for deleting a specific bet

// Routes for Half Sangam
router.post('/half-sangam', verifyToken, betController.placeHalfSangamBet);
router.get('/half-sangam', verifyToken, betController.getHalfSangamBets);
router.delete('/half-sangam/:id', verifyToken, betController.deleteHalfSangamBet); // New route for deleting a specific bet

// Routes for Full Sangam
router.post('/full-sangam', verifyToken, betController.placeFullSangamBet);
router.get('/full-sangam', verifyToken, betController.getFullSangamBets);
router.delete('/full-sangam/:id', verifyToken, betController.deleteFullSangamBet); // New route for deleting a specific bet

module.exports = router;

