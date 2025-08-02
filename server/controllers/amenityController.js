const Amenity = require('../models/amenityModel');
const asyncHandler = require('express-async-handler');

// @desc    Admin: Lấy danh sách tất cả tiện ích
// @route   GET /api/admin/amenities
// @access  Private/Admin
const adminGetAllAmenities = asyncHandler(async (req, res) => {
  const amenities = await Amenity.find({});
  res.json(amenities);
});

// @desc    Admin: Tạo tiện ích mới
// @route   POST /api/admin/amenities
// @access  Private/Admin
const adminCreateAmenity = asyncHandler(async (req, res) => {
  const amenity = new Amenity({
    ...req.body
  });
  const createdAmenity = await amenity.save();
  res.status(201).json(createdAmenity);
});

// @desc    Admin: Cập nhật tiện ích
// @route   PUT /api/admin/amenities/:id
// @access  Private/Admin
const adminUpdateAmenity = asyncHandler(async (req, res) => {
  const amenity = await Amenity.findById(req.params.id);
  if (amenity) {
    Object.assign(amenity, req.body);
    const updatedAmenity = await amenity.save();
    res.json(updatedAmenity);
  } else {
    res.status(404);
    throw new Error('Amenity not found');
  }
});

// @desc    Admin: Xóa tiện ích
// @route   DELETE /api/admin/amenities/:id
// @access  Private/Admin
const adminDeleteAmenity = asyncHandler(async (req, res) => {
  const amenity = await Amenity.findById(req.params.id);
  if (amenity) {
    await Amenity.deleteOne({ _id: req.params.id });
    res.json({ message: 'Amenity removed' });
  } else {
    res.status(404);
    throw new Error('Amenity not found');
  }
});

module.exports = {
  adminGetAllAmenities,
  adminCreateAmenity,
  adminUpdateAmenity,
  adminDeleteAmenity,
}; 