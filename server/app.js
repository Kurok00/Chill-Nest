// At the top of your main application file
require('dotenv').config();

// Later in your code, when you need to use the JWT_SECRET:
const jwt = require('jsonwebtoken');

// Example of signing a token
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

// Example of verifying a token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    // Handle error
  } else {
    // Use decoded data
    const userId = decoded.userId;
  }
});
