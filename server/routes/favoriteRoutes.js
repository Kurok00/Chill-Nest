const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Placeholder handlers
const addFavorite = (req, res) => {
  res.status(201).json({ message: 'Add a favorite home' });
};

const removeFavorite = (req, res) => {
  res.status(200).json({ message: `Remove favorite with id ${req.params.id}` });
};

const getUserFavorites = (req, res) => {
  res.status(200).json({ message: 'Get user favorites' });
};

router.route('/')
  .get(protect, getUserFavorites)
  .post(protect, addFavorite);

router.route('/:id')
  .delete(protect, removeFavorite);

module.exports = router;
