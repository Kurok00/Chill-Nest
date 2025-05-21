const express = require('express');
const router = express.Router();
const { 
  getHomes, 
  getHomeById, 
  createHome, 
  updateHome, 
  deleteHome,
  getTopRatedHomes 
} = require('../controllers/homeController');
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

module.exports = router;
