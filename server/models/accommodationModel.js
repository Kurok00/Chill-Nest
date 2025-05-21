const mongoose = require('mongoose');

const accommodationSchema = mongoose.Schema(
  {
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
    check_in_date: {
      type: Date,
      required: true,
    },
    check_out_date: {
      type: Date,
      required: true,
    },
    guest_details: {
      adults: Number,
      children: Number,
      names: [String],
    },
    special_requests: {
      type: String,
    },
    additional_services: [
      {
        service_name: String,
        price: Number,
        quantity: Number,
      },
    ],
    status: {
      type: String,
      enum: ['reserved', 'checked_in', 'checked_out', 'cancelled', 'no_show'],
      default: 'reserved',
    },
    base_price: {
      type: Number,
      required: true,
    },
    additional_costs: {
      taxes: Number,
      fees: Number,
      service_charges: Number,
    },
    discount_applied: {
      amount: Number,
      voucher_code: String,
      promotion_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
      },
    },
    total_price: {
      type: Number,
      required: true,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    payment_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;
