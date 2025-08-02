const express = require('express');
const router = express.Router();
const { 
  registerAdmin, 
  loginAdmin,
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getAllAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation
} = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes
router.get('/profile', protectAdmin, (req, res) => {
  res.json(req.admin);
});

// Properties Routes
router.route('/properties')
  .get(protectAdmin, getAllProperties)
  .post(protectAdmin, createProperty);

router.route('/properties/:id')
  .put(protectAdmin, updateProperty)
  .delete(protectAdmin, deleteProperty);

// Rooms Routes
router.route('/rooms')
  .get(protectAdmin, getAllRooms)
  .post(protectAdmin, createRoom);

router.route('/rooms/:id')
  .put(protectAdmin, updateRoom)
  .delete(protectAdmin, deleteRoom);

// Amenities Routes
router.route('/amenities')
  .get(protectAdmin, getAllAmenities)
  .post(protectAdmin, createAmenity);

router.route('/amenities/:id')
  .put(protectAdmin, updateAmenity)
  .delete(protectAdmin, deleteAmenity);

// Locations Routes
router.route('/locations')
  .get(protectAdmin, getAllLocations)
  .post(protectAdmin, createLocation);

router.route('/locations/:id')
  .put(protectAdmin, updateLocation)
  .delete(protectAdmin, deleteLocation);

module.exports = router;