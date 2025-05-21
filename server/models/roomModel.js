const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
  {
    home_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Home'
    },
    room_name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    room_type: {
      type: String,
      required: true,
      enum: ['single', 'double', 'twin', 'family', 'suite', 'deluxe', 'superior', 'standard', 'dorm']
    },
    room_size: {
      value: Number,
      unit: {
        type: String,
        enum: ['m²', 'ft²'],
        default: 'm²'
      }
    },
    max_guests: {
      adults: {type: Number, default: 2},
      children: {type: Number, default: 0}
    },
    bed_configuration: [
      {
        type: {
          type: String,
          enum: ['single', 'double', 'queen', 'king', 'sofa_bed', 'bunk_bed', 'floor_mattress']
        },
        count: {type: Number, default: 1}
      }
    ],
    regular_price: {
      type: Number,
      required: true
    },
    discount_price: Number,
    price_includes_breakfast: {
      type: Boolean,
      default: false
    },
    amenities: [{
      type: String
    }],
    images: [
      {
        url: String,
        caption: String
      }
    ],
    view_type: {
      type: String,
      enum: ['ocean', 'mountain', 'city', 'garden', 'pool', 'none'],
      default: 'none'
    },
    availability_status: {
      type: String,
      required: true,
      enum: ['available', 'booked', 'maintenance'],
      default: 'available'
    },
    is_featured: {
      type: Boolean,
      default: false
    },
    is_refundable: {
      type: Boolean,
      default: true
    },
    refund_policy: String,
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Add a method to check availability for a date range
roomSchema.methods.isAvailableForDates = async function(checkIn, checkOut) {
  // Implementation to check if the room is available
  // Will need to check against existing accommodations and bookings
};

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
