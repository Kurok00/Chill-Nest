const express = require('express');
const router = express.Router();
const { registerAdmin, loginAdmin } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', protectAdmin, (req, res) => {
  res.json(req.admin);
});

module.exports = router; 