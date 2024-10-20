const { Cashfree } = require("cashfree-pg");
const axios = require('axios');
require('dotenv').config();

// Cashfree API Configuration
Cashfree.XClientId = process.env.CASHFREE_APP_ID;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY ;
Cashfree.XEnvironment = process.env.CASHFREE_ENV === 'PROD'
  ? Cashfree.Environment.PRODUCTION
  : Cashfree.Environment.SANDBOX;

const SERVER_URL = process.env.SERVER_URL ;

// Controller to create an order
exports.createOrder = async (req, res) => {
  const { orderId, order_amount, customer_details } = req.body;
  console.log(customer_details, req.body);

  const request = {
    order_amount,
    order_currency: "INR",
    order_id: orderId,  // Replace with dynamic order ID
    customer_details: {
      customer_id: customer_details.customer_id,
      customer_name: customer_details.customer_name,
      customer_email: customer_details.customer_email,
      customer_phone: customer_details.customer_phone,
    },
    order_meta: {
      return_url: "https://www.cashfree.com/devstudio/preview/pg/mobile/hybrid?order_id={order_id}",
      notify_url: "https://www.cashfree.com/devstudio/preview/pg/webhooks/11169120",
      payment_methods: "cc,dc,upi"
    },
    order_note: "Sample Order Note",
  };

  try {
    const response = await Cashfree.PGCreateOrder("2023-08-01", request);
    console.log('Order created successfully:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error setting up order request:', error.response.data);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Controller to fetch payment status
exports.fetchPaymentStatus = async (req, res) => {
  const { order_id } = req.body;
  console.log(req.body);

  try {
    const response = await Cashfree.PGOrderFetchPayments("2023-08-01", order_id);
    console.log('Full Response:', response.data);

    if (response && response.data && Array.isArray(response.data)) {
      const transactions = response.data;
      let orderStatus;

      if (transactions.some(transaction => transaction.payment_status === "SUCCESS")) {
        orderStatus = "Success";

        // Add money to user's wallet if payment is successful
        const amount = transactions[0].order_amount;
        const userId = req.userId;  // Get user ID from the decoded token

        await axios.post(`${SERVER_URL}/api/wallet/add-money`, { amount,description: 'points added by user ' }, {
          headers: { Authorization: `Bearer ${req.headers['authorization'].split(' ')[1]}` }
        });
      } else if (transactions.some(transaction => transaction.payment_status === "PENDING")) {
        orderStatus = "Pending";
      } else {
        orderStatus = "Failure";
      }

      res.json({ orderStatus });
    } else {
      console.error('Unexpected response structure:', response);
      res.status(500).json({ error: 'Unexpected response structure from Cashfree API' });
    }
  } catch (error) {
    console.error('Error fetching payment status:', error.message);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
};
