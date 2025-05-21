const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');

// Temporary handlers until controllers are implemented
const getAccommodations = (req, res) => {
  res.status(200).json({ message: 'Get all accommodations' });
};

const getAccommodationById = (req, res) => {
  res.status(200).json({ message: `Get accommodation with id ${req.params.id}` });
};

const createAccommodation = (req, res) => {
  res.status(201).json({ message: 'Create a new accommodation' });
};

const updateAccommodation = (req, res) => {
  res.status(200).json({ message: `Update accommodation with id ${req.params.id}` });
};

const deleteAccommodation = (req, res) => {
  res.status(200).json({ message: `Delete accommodation with id ${req.params.id}` });
};

const getAccommodationByBookingId = (req, res) => {
  res.status(200).json({ message: `Get accommodation for booking ${req.params.bookingId}` });
};

// Protected routes
router.route('/')
  .get(protect, getAccommodations)
  .post(protect, createAccommodation);

router.route('/:id')
  .get(protect, getAccommodationById)
  .put(protect, updateAccommodation)
  .delete(protect, deleteAccommodation);

router.route('/booking/:bookingId')
  .get(protect, getAccommodationByBookingId);

module.exports = router;
