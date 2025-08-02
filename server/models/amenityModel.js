const mongoose = require('mongoose');

const amenitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    category: {
      type: String,
      enum: ['basic', 'entertainment', 'business', 'wellness', 'dining', 'transport'],
      default: 'basic'
    },
    icon: {
      type: String // URL hoặc tên icon
    },
    is_active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Amenity = mongoose.model('Amenity', amenitySchema);

module.exports = Amenity; 