const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'host', 'kol'],
      default: 'user',
    },
    phone_number: {
      type: String,
    },
    profile_image: {
      type: String,
      default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    address: {
      street: String,
      city: String,
      province: String,
      country: String,
      postal_code: String
    },
    social_media: {
      facebook: String,
      instagram: String,
      tiktok: String,
      youtube: String,
      twitter: String
    },    is_verified: {
      type: Boolean,
      default: false
    },
    email_otp: String,
    email_otp_expires: Date,
    verification_token: String,
    verification_token_expires: Date,
    reset_password_token: String,
    reset_password_expires: Date,
    phone_verified: {
      type: Boolean,
      default: false
    },
    phone_verification_code: String,
    phone_verification_expires: Date,
    verification_document: String,
    bio: String,
    preferences: {
      preferred_currency: {
        type: String,
        default: 'VND'
      },
      preferred_language: {
        type: String,
        default: 'vi'
      },
      notification_settings: {
        email: {type: Boolean, default: true},
        push: {type: Boolean, default: true},
        booking_updates: {type: Boolean, default: true},
        promotions: {type: Boolean, default: true}
      }
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

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
