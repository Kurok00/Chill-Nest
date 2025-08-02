const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  adminGetAllAmenities,
  adminCreateAmenity,
  adminUpdateAmenity,
  adminDeleteAmenity
} = require('../controllers/amenityController');

// Admin routes for amenity management
router.route('/admin/amenities')
  .get(protect, admin, adminGetAllAmenities)
  .post(protect, admin, adminCreateAmenity);

router.route('/admin/amenities/:id')
  .put(protect, admin, adminUpdateAmenity)
  .delete(protect, admin, adminDeleteAmenity);

module.exports = router; 