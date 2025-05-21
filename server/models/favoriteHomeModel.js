const mongoose = require('mongoose');

const favoriteHomeSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    home_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Home',
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

const FavoriteHome = mongoose.model('FavoriteHome', favoriteHomeSchema);

module.exports = FavoriteHome;
