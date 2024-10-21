const jwt = require('jsonwebtoken');
const { User, Transaction } = require('../models/User');
const secret = 'your_jwt_secret'; // Use a secure secret

exports.registerUser = async (req, res) => {
  try {
    console.log("Request received:", req.body); // Log incoming request

    const { username, mobilenumber, password } = req.body;

    // Check if all required fields are provided
    if (!username || !mobilenumber || !password) {
      console.log("Missing required fields:", { username, mobilenumber, password });
      return res.status(400).json({ message: 'Username, mobile number, and password are required.' });
    }

    // Check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      console.log("Username already exists:", username);
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Check if mobile number already exists
    const existingUserByMobile = await User.findOne({ mobilenumber });
    if (existingUserByMobile) {
      console.log("Mobile number already exists:", mobilenumber);
      return res.status(400).json({ message: 'Mobile number already exists.' });
    }

    // Log the user data before saving
    console.log("Creating new user with data:", { username, mobilenumber, password });

    // Create a new user and save to the database
    const newUser = new User({ username, mobilenumber, password });
    await newUser.save();

    // Log successful save
    console.log("User registered successfully:", newUser);

    // Send the response with the registered user data
    res.status(201).json(newUser);
  } catch (error) {
    // Log the error details
    console.log("Error occurred during registration:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { mobilenumber, password } = req.body;

    if (!mobilenumber || !password) {
      return res.status(400).json({ message: 'Mobile number and password are required.' });
    }

    const user = await User.findOne({ mobilenumber });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific user
exports.getUser = async (req, res) => {
  console.log(req.userId)
  try {
    const id = req.userId
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateUser = async (req, res) => {
  try {console.log(req.body)
    const id = req.userId
    const { username, mobilenumber } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the user's username and mobile number
    user.username = username;
    user.mobilenumber = mobilenumber;

    await user.save();

    res.status(200).json({ message: 'User details updated successfully.', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const id = req.userId;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({ message: 'Current password is incorrect.' });
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
