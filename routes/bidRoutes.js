const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const verifyToken = require('../middlewares/verifyToken');

// Route to get bid history for a user
router.get('/bid-history', verifyToken, bidController.getBidHistory);

module.exports = router;
