const { User, Transaction } = require('../models/User');

exports.addMoney = async (req, res) => {
  const userId = req.userId;
  const { amount } = req.body;
  const description = req.body.description || 'Added funds';

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update wallet balance
    user.wallet += amount;
    await user.save();

    // Create a new transaction
    const newTransaction = new Transaction({
      userId,
      amount,
      description,
    });

    await newTransaction.save();

    res.status(200).json({ 
      message: 'Money added to wallet successfully', 
      walletBalance: user.wallet,
      transaction: newTransaction, // Optionally return the new transaction
    });
  } catch (error) {
    console.error('Error adding money to wallet:', error.message);
    res.status(500).json({ message: 'Failed to add money to wallet' });
  }
};
exports.getWalletDetails = async (req, res) => {
    const userId = req.userId;
  
    try {
      const user = await User.findById(userId).select('wallet');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Fetch the user's transaction history
      const transactionHistory = await Transaction.find({ userId }).sort({ date: -1 });
  
      res.status(200).json({
        walletBalance: user.wallet,
        transactionHistory, // Return the user's transaction history
      });
    } catch (error) {
      console.error('Error fetching wallet details:', error.message);
      res.status(500).json({ message: 'Failed to fetch wallet details' });
    }
  };