const express = require('express');
const router = express.Router();
const { protect, admin, host } = require('../middleware/authMiddleware');

// Placeholder handlers
const getRooms = (req, res) => {
  res.status(200).json({ message: 'Get all rooms' });
};

const getRoomById = (req, res) => {
  res.status(200).json({ message: `Get room with id ${req.params.id}` });
};

const createRoom = (req, res) => {
  res.status(201).json({ message: 'Create a new room' });
};

const updateRoom = (req, res) => {
  res.status(200).json({ message: `Update room with id ${req.params.id}` });
};

const deleteRoom = (req, res) => {
  res.status(200).json({ message: `Delete room with id ${req.params.id}` });
};

const getRoomsByHomeId = (req, res) => {
  res.status(200).json({ message: `Get rooms for home ${req.params.homeId}` });
};

// Public routes
router.route('/').get(getRooms);
// Order matters! Put specific routes before parameterized ones
router.route('/home/:homeId').get(getRoomsByHomeId);
router.route('/:id').get(getRoomById);

// Protected routes (host and admin only)
router.route('/')
  .post(protect, createRoom);

router.route('/:id')
  .put(protect, updateRoom)
  .delete(protect, deleteRoom);

router.route('/:id')
  .put(protect, host, updateRoom)
  .delete(protect, host, deleteRoom);

module.exports = router;
