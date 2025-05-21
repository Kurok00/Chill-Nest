const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true,
      unique: true
    },
    content: {
      type: String,
      required: true
    },
    summary: String,
    featured_image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    categories: [{
      type: String,
      enum: [
        'travel_tips', 'destinations', 'homestays', 'hotels', 'food', 'culture', 
        'experiences', 'budget_travel', 'luxury_travel', 'local_guides'
      ]
    }],
    tags: [String],
    related_properties: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Home'
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    views: {
      type: Number,
      default: 0
    },
    likes: {
      type: Number,
      default: 0
    },
    comments: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }],
    meta: {
      seo_title: String,
      seo_description: String,
      seo_keywords: [String]
    },
    published_at: Date,
    created_at: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  
  if (this.status === 'published' && !this.published_at) {
    this.published_at = new Date();
  }
  
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
