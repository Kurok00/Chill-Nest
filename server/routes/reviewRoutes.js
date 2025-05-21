const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// No controllers implemented yet, just placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Reviews route - GET' });
});

router.post('/', protect, (req, res) => {
  res.status(200).json({ message: 'Add review route - POST' });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Update review ${req.params.id} - PUT` });
});

router.delete('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Delete review ${req.params.id} - DELETE` });
});

module.exports = router;
