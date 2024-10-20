const express = require('express');
const router = express.Router();
const cashfreeController = require('../controllers/cashfreeController');
const verifyToken = require('../middlewares/verifyToken');

// Define routes
router.post('/create-order', cashfreeController.createOrder);
router.post('/fetch-payment-status', verifyToken, cashfreeController.fetchPaymentStatus);

module.exports = router;
