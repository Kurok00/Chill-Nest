const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Home',
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    ratings: {
      overall: {
        type: Number,
        required: true,
        min: 1,
        max: 5
      },
      cleanliness: {
        type: Number,
        min: 1,
        max: 5
      },
      accuracy: {
        type: Number,
        min: 1,
        max: 5
      },
      location: {
        type: Number,
        min: 1,
        max: 5
      },
      value: {
        type: Number,
        min: 1,
        max: 5
      },
      check_in: {
        type: Number,
        min: 1,
        max: 5
      }
    },
    title: String,
    comment: {
      type: String,
    },
    tips_for_travelers: String,
    stay_date: Date,
    trip_type: {
      type: String,
      enum: ['business', 'leisure', 'family', 'couple', 'solo', 'friends', 'other']
    },
    media: [
      {
        type: {
          type: String,
          enum: ['image', 'video'],
          default: 'image'
        },
        url: String,
        caption: String
      }
    ],
    helpful_votes: {
      type: Number,
      default: 0
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    host_response: {
      comment: String,
      responded_at: Date
    },
    reported: {
      is_reported: {
        type: Boolean,
        default: false
      },
      report_reason: String,
      report_date: Date
    },
    is_featured: {
      type: Boolean,
      default: false
    },
    created_at: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

// Sau khi lưu review, cập nhật rating trung bình của homestay/khách sạn
reviewSchema.post('save', async function() {
  try {
    // Tính toán lại rating trung bình và cập nhật vào property
    const Home = mongoose.model('Home');
    
    const averages = await this.constructor.aggregate([
      { $match: { property_id: this.property_id } },
      { $group: {
          _id: '$property_id',
          avgOverall: { $avg: '$ratings.overall' },
          avgCleanliness: { $avg: '$ratings.cleanliness' },
          avgAccuracy: { $avg: '$ratings.accuracy' },
          avgLocation: { $avg: '$ratings.location' },
          avgValue: { $avg: '$ratings.value' },
          avgCheckIn: { $avg: '$ratings.check_in' },
          reviewCount: { $sum: 1 }
        }
      }
    ]);
    
    if (averages.length > 0) {
      await Home.findByIdAndUpdate(this.property_id, {
        'ratings.average': averages[0].avgOverall,
        'ratings.cleanliness': averages[0].avgCleanliness,
        'ratings.accuracy': averages[0].avgAccuracy,
        'ratings.location': averages[0].avgLocation,
        'ratings.value': averages[0].avgValue,
        'ratings.checkin': averages[0].avgCheckIn,
        'review_count': averages[0].reviewCount
      });
    }
  } catch (error) {
    console.error('Error updating home ratings:', error);
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
