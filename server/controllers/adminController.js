const User = require('../models/userModel');
const Home = require('../models/homeModel');
const Room = require('../models/roomModel');
const Amenity = require('../models/amenityModel');
const Location = require('../models/locationModel');
const jwt = require('jsonwebtoken');

// @desc    Register a new admin
// @route   POST /api/users/admin/register
// @access  Public
const registerAdmin = async (req, res) => {
  try {
    const { user_name, email, password, phone_number, secretCode } = req.body;

    // Check secret code
    if (secretCode !== '961210') {
      return res.status(401).json({ message: 'Mã bí mật không chính xác' });
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ $or: [{ email }, { user_name }] });
    if (adminExists) {
      return res.status(400).json({ message: 'Email hoặc tên đăng nhập đã được sử dụng' });
    }

    // Create new admin
    const admin = await User.create({
      user_name,
      email,
      password,
      phone_number,
      role: 'admin',
      is_verified: true // Auto verify admin accounts
    });

    if (admin) {
      // Generate JWT token
      const token = jwt.sign(
        { id: admin._id, role: admin.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );

      res.status(201).json({
        _id: admin._id,
        user_name: admin.user_name,
        email: admin.email,
        role: admin.role,
        token
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Login admin
// @route   POST /api/users/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  try {
    const { user_name, password } = req.body;
    console.log('Login attempt:', { user_name, password });

    // Find admin by user_name
    const admin = await User.findOne({ user_name });
    console.log('Found admin:', admin ? { 
      _id: admin._id,
      user_name: admin.user_name,
      role: admin.role,
      password: admin.password
    } : null);

    if (!admin) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Check if user is admin
    if (admin.role !== 'admin') {
      return res.status(403).json({ message: 'Không có quyền truy cập trang quản trị' });
    }

    // Check password directly since it's stored as plain text
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      _id: admin._id,
      user_name: admin.user_name,
      email: admin.email,
      role: admin.role,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Property Management
const getAllProperties = async (req, res) => {
  console.log('=== BẮT ĐẦU GETALLAPROPERTIES ===');
  console.log('Request từ admin:', req.admin ? req.admin.user_name : 'undefined');
  console.log('Admin ID:', req.admin ? req.admin._id : 'undefined');
  console.log('Timestamp:', new Date().toISOString());
  
  try {
    console.log('🔍 Bắt đầu truy vấn database...');
    const properties = await Home.find().populate('host_id', 'user_name email');
    console.log('✓ Truy vấn database thành công');
    console.log('Số lượng properties tìm thấy:', properties.length);
    
    if (properties.length > 0) {
      console.log('Sample property preview:', {
        id: properties[0]._id,
        name: properties[0].name,
        host: properties[0].host_id
      });
    }
    
    console.log('📤 Gửi response thành công');
    res.json(properties);
  } catch (error) {
    console.log('❌ LỖI TRONG GETALLAPROPERTIES');
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    console.log('Error stack:', error.stack);
    console.log('📤 Gửi error response');
    res.status(500).json({ 
      message: error.message,
      debug: {
        function: 'getAllProperties',
        timestamp: new Date().toISOString(),
        error: error.name
      }
    });
  }
};

const createProperty = async (req, res) => {
  try {
    const property = await Home.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Home.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Home.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Room Management
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('home_id', 'name');
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Amenity Management
const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenity.find();
    res.json(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.create(req.body);
    res.status(201).json(amenity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.json(amenity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAmenity = async (req, res) => {
  try {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: 'Amenity not found' });
    }
    res.json({ message: 'Amenity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Location Management
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createLocation = async (req, res) => {
  try {
    const location = await Location.create(req.body);
    res.status(201).json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json(location);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  // Property Management
  getAllProperties,
  createProperty,
  updateProperty,
  deleteProperty,
  // Room Management
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  // Amenity Management
  getAllAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  // Location Management
  getAllLocations,
  createLocation,
  updateLocation,
  deleteLocation
}; 