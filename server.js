const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const betRoutes = require('./routes/betRoutes');
const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');
const dbConfig = require('./config/db');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
require('dotenv').config();
const walletRoutes = require('./routes/walletRoutes'); // Include the wallet routes
const cashfreeRoutes = require('./routes/cashfreeRoutes'); // Include the cashfree routes
const bidRoutes = require('./routes/bidRoutes'); // Include the cashfree routes
const winnerRoutes = require('./routes/winnerRoutes'); // Include the cashfree routes
const socialMediaRoutes = require('./routes/socialMediaRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(dbConfig.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/bet', betRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/cashfree', cashfreeRoutes); // Use the cashfree routes
app.use('/api/bidRoutes', bidRoutes); // Use the cashfree routes
app.use('/api/winRoutes', winnerRoutes); // Use the cashfree routes
app.use('/api/socialmedia', socialMediaRoutes);

// Root route to check if the server is running
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Start the server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
