const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    promotion_type: {
      type: String,
      enum: ['percentage', 'fixed_amount', 'buy_get', 'free_nights', 'early_bird', 'last_minute'],
      required: true
    },
    discount_value: {
      type: Number,
      required: true
    },
    discount_unit: {
      type: String,
      enum: ['percentage', 'amount'],
      required: true
    },
    min_stay_nights: {
      type: Number,
      default: 1
    },
    applicable_properties: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home'
    }],
    applicable_room_types: [String],
    validity_period: {
      start_date: {
        type: Date,
        required: true
      },
      end_date: {
        type: Date,
        required: true
      }
    },
    booking_period: {
      start_date: {
        type: Date,
        required: true
      },
      end_date: {
        type: Date,
        required: true
      }
    },
    terms_conditions: String,
    is_active: {
      type: Boolean,
      default: true
    },
    max_usage: Number,
    current_usage: {
      type: Number,
      default: 0
    },
    priority: {
      type: Number,
      default: 0
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Check if promotion is valid
promotionSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.is_active &&
    this.validity_period.start_date <= now &&
    this.validity_period.end_date >= now &&
    (!this.max_usage || this.current_usage < this.max_usage)
  );
};

const Promotion = mongoose.model('Promotion', promotionSchema);

module.exports = Promotion;
