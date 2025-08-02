const Review = require('../models/reviewModel');
const Home = require('../models/homeModel');
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc    Get all reviews for admin
// @route   GET /api/reviews/admin
// @access  Private/Admin
const getReviews = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build filter
  let filter = {};
  
  if (req.query.property_id) {
    filter.property_id = req.query.property_id;
  }
  
  if (req.query.is_verified !== undefined) {
    filter.is_verified = req.query.is_verified === 'true';
  }
  
  if (req.query.is_reported !== undefined) {
    filter['reported.is_reported'] = req.query.is_reported === 'true';
  }
  
  if (req.query.rating) {
    filter['ratings.overall'] = { $gte: parseInt(req.query.rating) };
  }

  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { comment: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const reviews = await Review.find(filter)
    .populate('user_id', 'name email avatar')
    .populate('property_id', 'name property_type location.city location.address images.main')
    .populate('booking_id', 'check_in_date check_out_date total_amount')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Review.countDocuments(filter);

  res.json({
    reviews,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalReviews: total,
    hasMore: page < Math.ceil(total / limit)
  });
});

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Private/Admin
const getReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate('user_id', 'name email avatar phone')
    .populate('property_id', 'name property_type location images host_id')
    .populate('booking_id');

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  res.json(review);
});

// @desc    Update review status (verify, feature, etc.)
// @route   PUT /api/reviews/:id/status
// @access  Private/Admin
const updateReviewStatus = asyncHandler(async (req, res) => {
  const { is_verified, is_featured, reported } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  if (is_verified !== undefined) {
    review.is_verified = is_verified;
  }

  if (is_featured !== undefined) {
    review.is_featured = is_featured;
  }

  if (reported !== undefined) {
    review.reported = {
      ...review.reported,
      ...reported
    };
  }

  const updatedReview = await review.save();

  res.json({
    message: 'Review status updated successfully',
    review: updatedReview
  });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  await review.deleteOne();

  res.json({ message: 'Review deleted successfully' });
});

// @desc    Add host response to review
// @route   PUT /api/reviews/:id/response
// @access  Private/Admin
const addHostResponse = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    res.status(400);
    throw new Error('Response comment is required');
  }

  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  review.host_response = {
    comment,
    responded_at: new Date()
  };

  const updatedReview = await review.save();

  res.json({
    message: 'Host response added successfully',
    review: updatedReview
  });
});

// @desc    Get review statistics
// @route   GET /api/reviews/admin/stats
// @access  Private/Admin
const getReviewStats = asyncHandler(async (req, res) => {
  const totalReviews = await Review.countDocuments();
  const verifiedReviews = await Review.countDocuments({ is_verified: true });
  const reportedReviews = await Review.countDocuments({ 'reported.is_reported': true });
  const featuredReviews = await Review.countDocuments({ is_featured: true });

  // Rating distribution
  const ratingDistribution = await Review.aggregate([
    {
      $group: {
        _id: '$ratings.overall',
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: -1 } }
  ]);

  // Average rating by property type
  const avgRatingByType = await Review.aggregate([
    {
      $lookup: {
        from: 'homes',
        localField: 'property_id',
        foreignField: '_id',
        as: 'property'
      }
    },
    { $unwind: '$property' },
    {
      $group: {
        _id: '$property.property_type',
        avgRating: { $avg: '$ratings.overall' },
        count: { $sum: 1 }
      }
    }
  ]);

  // Recent reviews trend (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentReviews = await Review.countDocuments({
    created_at: { $gte: thirtyDaysAgo }
  });

  res.json({
    totalReviews,
    verifiedReviews,
    reportedReviews,
    featuredReviews,
    verificationRate: totalReviews > 0 ? ((verifiedReviews / totalReviews) * 100).toFixed(1) : 0,
    reportRate: totalReviews > 0 ? ((reportedReviews / totalReviews) * 100).toFixed(1) : 0,
    ratingDistribution,
    avgRatingByType,
    recentReviews
  });
});

// @desc    Get reviews by property
// @route   GET /api/reviews/property/:propertyId
// @access  Public
const getReviewsByProperty = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const reviews = await Review.find({ 
    property_id: req.params.propertyId,
    is_verified: true 
  })
    .populate('user_id', 'name avatar')
    .sort({ created_at: -1 })
    .limit(limit)
    .skip(skip);

  const total = await Review.countDocuments({ 
    property_id: req.params.propertyId,
    is_verified: true 
  });

  res.json({
    reviews,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalReviews: total
  });
});

module.exports = {
  getReviews,
  getReview,
  updateReviewStatus,
  deleteReview,
  addHostResponse,
  getReviewStats,
  getReviewsByProperty
};
