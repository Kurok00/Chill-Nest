const express = require('express');
const router = express.Router();
const {
  getHomes,
  getHomeById,
  createHome,
  updateHome,
  deleteHome,
  getTopRatedHomes,
  adminGetAllHomes,
  adminCreateHome,
  adminUpdateHome,
  adminDeleteHome,
} = require('../controllers/homeController');
const roomController = require('../controllers/roomController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .get(getHomes)
  .post(protect, createHome);

router.route('/top')
  .get(getTopRatedHomes);

router.route('/:id')
  .get(getHomeById)
  .put(protect, updateHome)
  .delete(protect, deleteHome);

// Admin routes for property management
router.route('/admin/properties')
  .get(protect, admin, adminGetAllHomes)
  .post(protect, admin, adminCreateHome);

router.route('/admin/properties/:id')
  .put(protect, admin, adminUpdateHome)
  .delete(protect, admin, adminDeleteHome);

// Admin routes for room management
router.route('/admin/rooms')
  .get(protect, admin, roomController.adminGetAllRooms)
  .post(protect, admin, roomController.adminCreateRoom);

router.route('/admin/rooms/:id')
  .put(protect, admin, roomController.adminUpdateRoom)
  .delete(protect, admin, roomController.adminDeleteRoom);

module.exports = router;
