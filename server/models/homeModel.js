const mongoose = require('mongoose');

const homeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    property_type: {
      type: String,
      required: true,
      enum: ['hotel', 'homestay', 'resort', 'villa', 'apartment', 'guesthouse', 'hostel', 'farmstay'],
    },
    location: {
      address: {
        street: String,
        ward: String,
        district: String,
        city: String,
        province: String,
        country: {type: String, default: 'Vietnam'},
        postal_code: String
      },
      coordinates: {
        latitude: Number,
        longitude: Number
      }
    },
    images: [
      {
        url: String,
        caption: String,
        is_main: {type: Boolean, default: false}
      }
    ],
    video_url: String,
    price_range: {
      min: Number,
      max: Number
    },
    star_rating: {
      type: Number,
      min: 0,
      max: 5
    },
    amenities: [{
      type: String,
      enum: ['wifi', 'parking', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'room_service', 
             'air_conditioning', 'kitchen', 'laundry', 'breakfast', 'pet_friendly', 'beach_access',
             'mountain_view', 'bbq', 'security_camera', '24hr_front_desk', 'elevator']
    }],
    host_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    check_in_time: {
      type: String,
      default: '14:00'
    },
    check_out_time: {
      type: String,
      default: '12:00'
    },
    cancellation_policy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    house_rules: [String],
    nearby_attractions: [
      {
        name: String,
        distance: Number, // in km
        description: String
      }
    ],
    ratings: {
      average: {type: Number, default: 0},
      cleanliness: {type: Number, default: 0},
      accuracy: {type: Number, default: 0},
      location: {type: Number, default: 0},
      value: {type: Number, default: 0},
      checkin: {type: Number, default: 0}
    },
    review_count: {type: Number, default: 0},
    is_featured: {type: Boolean, default: false},
    is_verified: {type: Boolean, default: false},
    is_active: {type: Boolean, default: true},
    special_offers: [
      {
        title: String,
        description: String,
        discount_percentage: Number,
        valid_from: Date,
        valid_until: Date
      }
    ],
    languages_spoken: [String],
    total_rooms: {
      type: Number,
      default: 0
    },
    created_at: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for rooms
homeSchema.virtual('rooms', {
  ref: 'Room',
  localField: '_id',
  foreignField: 'home_id',
  justOne: false
});

// Virtual for reviews
homeSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'property_id',
  justOne: false
});

const Home = mongoose.model('Home', homeSchema);

module.exports = Home;
