const mongoose = require('mongoose');

const voucherSchema = mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    discount_amount: {
      type: Number,
      required: true,
    },
    max_discount: {
      type: Number,
      required: true,
    },
    min_order_value: {
      type: Number,
      required: true,
    },
    valid_from: {
      type: Date,
      required: true,
    },
    valid_to: {
      type: Date,
      required: true,
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

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;
