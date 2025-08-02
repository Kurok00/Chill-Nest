const Room = require('../models/roomModel');
const asyncHandler = require('express-async-handler');

// @desc    Admin: Lấy danh sách tất cả phòng
// @route   GET /api/admin/rooms
// @access  Private/Admin
const adminGetAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
});

// @desc    Admin: Tạo phòng mới
// @route   POST /api/admin/rooms
// @access  Private/Admin
const adminCreateRoom = asyncHandler(async (req, res) => {
  const room = new Room({
    ...req.body
  });
  const createdRoom = await room.save();
  res.status(201).json(createdRoom);
});

// @desc    Admin: Cập nhật phòng
// @route   PUT /api/admin/rooms/:id
// @access  Private/Admin
const adminUpdateRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (room) {
    Object.assign(room, req.body);
    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

// @desc    Admin: Xóa phòng
// @route   DELETE /api/admin/rooms/:id
// @access  Private/Admin
const adminDeleteRoom = asyncHandler(async (req, res) => {
  const room = await Room.findById(req.params.id);
  if (room) {
    await Room.deleteOne({ _id: req.params.id });
    res.json({ message: 'Room removed' });
  } else {
    res.status(404);
    throw new Error('Room not found');
  }
});

module.exports = {
  adminGetAllRooms,
  adminCreateRoom,
  adminUpdateRoom,
  adminDeleteRoom,
}; 