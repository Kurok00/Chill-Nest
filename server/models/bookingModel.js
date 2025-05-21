const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema(
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
    booking_reference: {
      type: String,
      unique: true
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    guests: {
      adults: {type: Number, required: true, default: 1},
      children: {type: Number, default: 0},
      infants: {type: Number, default: 0}
    },
    contact_info: {
      full_name: String,
      email: String,
      phone: String,
      special_requests: String
    },
    rooms: [{
      room_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }],
    total_amount: {
      subtotal: Number,
      taxes: Number,
      service_fee: Number,
      discount: Number,
      total: {
        type: Number,
        required: true,
        default: 0.0,
      }
    },
    payment_details: {
      payment_method: {
        type: String,
        enum: ['credit_card', 'paypal', 'bank_transfer', 'cash', 'momo', 'zalopay', 'vnpay'],
        default: 'cash',
      },
      payment_status: {
        type: String,
        enum: ['pending', 'paid', 'partially_paid', 'refunded', 'failed'],
        default: 'pending',
      },
      transaction_id: String,
      paid_amount: Number,
      payment_date: Date
    },
    booking_status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no_show'],
      default: 'pending',
    },
    cancellation_details: {
      cancelled_at: Date,
      cancelled_by: {
        type: String,
        enum: ['user', 'host', 'admin', 'system']
      },
      cancellation_reason: String,
      refund_status: {
        type: String,
        enum: ['pending', 'partial', 'full', 'none']
      },
      refund_amount: Number
    },
    is_reviewed: {
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

// Generate a unique booking reference before saving
bookingSchema.pre('save', async function(next) {
  if (!this.booking_reference) {
    const date = new Date();
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    this.booking_reference = `BK-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${randomNum}`;
  }
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
