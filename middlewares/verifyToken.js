const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret';

const verifyToken = (req, res, next) => {
  console.log(req.headers)
  const token = req.headers['authorization'] || req.headers['Authorization'];

  console.log('Token received:', token); // Log the token received in the request headers

  if (!token) {
    console.log('No token provided.');
    return res.status(403).json({ message: 'No token provided.' });
  }

  if (!token.startsWith('Bearer ')) {
    console.log('Invalid token format.');
    return res.status(400).json({ message: 'Invalid token format.' });
  }

  const authToken = token.split(' ')[1]; // Extract the actual token part

  jwt.verify(authToken, secret, (err, decoded) => {
    if (err) {
      console.error('Failed to authenticate token:', err.message);
      return res.status(500).json({ message: 'Failed to authenticate token.' });
    }

    console.log('Token decoded successfully:', decoded); // Log the decoded token payload

    req.userId = decoded.id; // Assuming your JWT payload has a property 'id'
    next();
  });
};

module.exports = verifyToken;
