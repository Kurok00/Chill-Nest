const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// No controllers implemented yet, just placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Promotions route - GET' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get promotion ${req.params.id} - GET` });
});

router.post('/', protect, (req, res) => {
  res.status(200).json({ message: 'Add promotion route - POST' });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Update promotion ${req.params.id} - PUT` });
});

router.delete('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Delete promotion ${req.params.id} - DELETE` });
});

module.exports = router;
