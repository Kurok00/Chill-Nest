const Home = require('../models/homeModel');
const asyncHandler = require('express-async-handler');

// @desc    Fetch all homes
// @route   GET /api/homes
// @access  Public
const getHomes = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Home.countDocuments({ ...keyword });
  const homes = await Home.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ homes, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single home
// @route   GET /api/homes/:id
// @access  Public
const getHomeById = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);

  if (home) {
    res.json(home);
  } else {
    res.status(404);
    throw new Error('Home not found');
  }
});

// @desc    Create a home
// @route   POST /api/homes
// @access  Private/Host
const createHome = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    city,
    province,
    country,
    price,
    capacity,
    bedrooms,
    bathrooms,
    amenities,
    images,
  } = req.body;

  const home = new Home({
    host: req.user._id,
    name,
    description,
    address,
    city,
    province,
    country,
    price,
    capacity,
    bedrooms,
    bathrooms,
    amenities: amenities || [],
    images: images || [],
    rating: 0,
    numReviews: 0,
  });

  const createdHome = await home.save();
  res.status(201).json(createdHome);
});

// @desc    Update a home
// @route   PUT /api/homes/:id
// @access  Private/Host
const updateHome = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    address,
    city,
    province,
    country,
    price,
    capacity,
    bedrooms,
    bathrooms,
    amenities,
    images,
  } = req.body;

  const home = await Home.findById(req.params.id);

  if (home) {
    // Check if the user is the host of the home
    if (home.host.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized as the host of this home');
    }

    home.name = name || home.name;
    home.description = description || home.description;
    home.address = address || home.address;
    home.city = city || home.city;
    home.province = province || home.province;
    home.country = country || home.country;
    home.price = price || home.price;
    home.capacity = capacity || home.capacity;
    home.bedrooms = bedrooms || home.bedrooms;
    home.bathrooms = bathrooms || home.bathrooms;
    home.amenities = amenities || home.amenities;
    home.images = images || home.images;

    const updatedHome = await home.save();
    res.json(updatedHome);
  } else {
    res.status(404);
    throw new Error('Home not found');
  }
});

// @desc    Delete a home
// @route   DELETE /api/homes/:id
// @access  Private/Host
const deleteHome = asyncHandler(async (req, res) => {
  const home = await Home.findById(req.params.id);

  if (home) {
    // Check if the user is the host of the home
    if (home.host.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Not authorized as the host of this home');
    }

    await Home.deleteOne({ _id: req.params.id });
    res.json({ message: 'Home removed' });
  } else {
    res.status(404);
    throw new Error('Home not found');
  }
});

// @desc    Get top rated homes
// @route   GET /api/homes/top
// @access  Public
const getTopRatedHomes = asyncHandler(async (req, res) => {
  const homes = await Home.find({}).sort({ rating: -1 }).limit(5);

  res.json(homes);
});

module.exports = {
  getHomes,
  getHomeById,
  createHome,
  updateHome,
  deleteHome,
  getTopRatedHomes,
};
