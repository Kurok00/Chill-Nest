const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// No controllers implemented yet, just placeholder routes
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Blogs route - GET' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get blog ${req.params.id} - GET` });
});

router.post('/', protect, (req, res) => {
  res.status(200).json({ message: 'Add blog route - POST' });
});

router.put('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Update blog ${req.params.id} - PUT` });
});

router.delete('/:id', protect, (req, res) => {
  res.status(200).json({ message: `Delete blog ${req.params.id} - DELETE` });
});

module.exports = router;
