const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  adminGetAllLocations,
  adminCreateLocation,
  adminUpdateLocation,
  adminDeleteLocation
} = require('../controllers/locationController');

// Admin routes for location management
router.route('/admin/locations')
  .get(protect, admin, adminGetAllLocations)
  .post(protect, admin, adminCreateLocation);

router.route('/admin/locations/:id')
  .put(protect, admin, adminUpdateLocation)
  .delete(protect, admin, adminDeleteLocation);

module.exports = router; 