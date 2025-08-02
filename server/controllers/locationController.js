const Location = require('../models/locationModel');
const asyncHandler = require('express-async-handler');

// @desc    Admin: Lấy danh sách tất cả địa điểm
// @route   GET /api/admin/locations
// @access  Private/Admin
const adminGetAllLocations = asyncHandler(async (req, res) => {
  const locations = await Location.find({});
  res.json(locations);
});

// @desc    Admin: Tạo địa điểm mới
// @route   POST /api/admin/locations
// @access  Private/Admin
const adminCreateLocation = asyncHandler(async (req, res) => {
  const location = new Location({
    ...req.body
  });
  const createdLocation = await location.save();
  res.status(201).json(createdLocation);
});

// @desc    Admin: Cập nhật địa điểm
// @route   PUT /api/admin/locations/:id
// @access  Private/Admin
const adminUpdateLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    Object.assign(location, req.body);
    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } else {
    res.status(404);
    throw new Error('Location not found');
  }
});

// @desc    Admin: Xóa địa điểm
// @route   DELETE /api/admin/locations/:id
// @access  Private/Admin
const adminDeleteLocation = asyncHandler(async (req, res) => {
  const location = await Location.findById(req.params.id);
  if (location) {
    await Location.deleteOne({ _id: req.params.id });
    res.json({ message: 'Location removed' });
  } else {
    res.status(404);
    throw new Error('Location not found');
  }
});

module.exports = {
  adminGetAllLocations,
  adminCreateLocation,
  adminUpdateLocation,
  adminDeleteLocation,
}; 