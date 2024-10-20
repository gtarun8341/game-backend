const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

// Middleware to ensure only admins can access these routes
router.get('/users', adminController.getUsers);
router.post('/games/:betType/declare', adminController.declareWinningNumber);
router.post('/games', adminController.createGame);
router.get('/games', adminController.getAllGames);
router.get('/games/betTypes', adminController.betTypes);
router.get('/games/:id', adminController.getGameById);
router.put('/games/:id', adminController.updateGame);
router.delete('/games/:id', adminController.deleteGame);
module.exports = router;
