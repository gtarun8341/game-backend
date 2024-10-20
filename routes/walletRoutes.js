const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/add-money', verifyToken, walletController.addMoney);
router.get('/wallet-details', verifyToken, walletController.getWalletDetails);

module.exports = router;
