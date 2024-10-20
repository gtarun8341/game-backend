const express = require('express');
const {  getGames, getGame } = require('../controllers/gameController');

const router = express.Router();

router.get('/games', getGames);
router.get('/games/:id', getGame);

module.exports = router;
