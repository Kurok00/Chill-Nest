const mongoose = require('mongoose');

const locationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    image: {
      type: String // URL hình ảnh
    },
    type: {
      type: String,
      enum: ['country', 'province', 'city', 'district', 'ward', 'landmark'],
      default: 'city'
    },
    is_popular: {
      type: Boolean,
      default: false
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

const Location = mongoose.model('Location', locationSchema);

module.exports = Location; 