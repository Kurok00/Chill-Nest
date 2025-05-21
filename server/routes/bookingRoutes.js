const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// No controllers implemented yet, just placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Bookings route - GET' });
});

router.post('/', protect, (req, res) => {
  res.status(200).json({ message: 'Add booking route - POST' });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Update booking ${req.params.id} - PUT` });
});

router.delete('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Delete booking ${req.params.id} - DELETE` });
});

module.exports = router;
