const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/userModel');
const Home = require('./models/homeModel');
const Review = require('./models/reviewModel');

const seedReviews = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://anvnt96:asdqwe123@cluster0.bs2jhhq.mongodb.net/ChillNest?retryWrites=true&w=majority');
    
    console.log('Connected to MongoDB...');

    // Clear existing reviews
    await Review.deleteMany({});
    console.log('Cleared existing reviews...');

    // Create sample users if not exist
    let user1 = await User.findOne({ email: 'user1@example.com' });
    if (!user1) {
      user1 = await User.create({
        name: 'John Doe',
        email: 'user1@example.com',
        password: await bcryptjs.hash('123456', 12),
        role: 'user',
        is_verified: true
      });
    }

    let user2 = await User.findOne({ email: 'user2@example.com' });
    if (!user2) {
      user2 = await User.create({
        name: 'Jane Smith',
        email: 'user2@example.com',
        password: await bcryptjs.hash('123456', 12),
        role: 'user',
        is_verified: true
      });
    }

    // Create sample homes if not exist
    let home1 = await Home.findOne({ name: 'Grand Hotel Downtown' });
    if (!home1) {
      home1 = await Home.create({
        name: 'Grand Hotel Downtown',
        description: 'Luxurious hotel in the heart of the city',
        property_type: 'hotel',
        location: {
          address: {
            city: 'Ho Chi Minh City',
            district: 'District 1',
            country: 'Vietnam'
          }
        },
        price_range: { min: 100, max: 300 },
        host_id: user1._id,
        amenities: ['wifi', 'parking', 'pool', 'spa']
      });
    }

    let home2 = await Home.findOne({ name: 'Seaside Resort' });
    if (!home2) {
      home2 = await Home.create({
        name: 'Seaside Resort',
        description: 'Beautiful resort by the beach',
        property_type: 'resort',
        location: {
          address: {
            city: 'Da Nang',
            district: 'Lien Chieu',
            country: 'Vietnam'
          }
        },
        price_range: { min: 150, max: 400 },
        host_id: user2._id,
        amenities: ['wifi', 'beach_access', 'restaurant', 'bar']
      });
    }

    // Create sample reviews
    const reviewsData = [
      {
        user_id: user1._id,
        property_id: home1._id,
        ratings: {
          overall: 5,
          cleanliness: 5,
          accuracy: 4,
          location: 5,
          value: 4,
          check_in: 5
        },
        title: 'Excellent stay!',
        comment: 'Had an amazing time at this hotel. The staff was very friendly and the room was spotless. Highly recommend!',
        tips_for_travelers: 'Book early for better rates!',
        stay_date: new Date('2024-03-01'),
        trip_type: 'leisure',
        is_verified: true,
        is_featured: true
      },
      {
        user_id: user2._id,
        property_id: home1._id,
        ratings: {
          overall: 4,
          cleanliness: 4,
          accuracy: 4,
          location: 5,
          value: 3,
          check_in: 4
        },
        title: 'Good but expensive',
        comment: 'The hotel is nice but a bit overpriced. Location is perfect though.',
        stay_date: new Date('2024-03-05'),
        trip_type: 'business',
        is_verified: true,
        reported: {
          is_reported: false
        }
      },
      {
        user_id: user1._id,
        property_id: home2._id,
        ratings: {
          overall: 5,
          cleanliness: 5,
          accuracy: 5,
          location: 4,
          value: 5,
          check_in: 5
        },
        title: 'Beach paradise!',
        comment: 'Perfect location right by the beach. The resort has everything you need for a relaxing vacation.',
        tips_for_travelers: 'Try the seafood restaurant - it\'s amazing!',
        stay_date: new Date('2024-03-10'),
        trip_type: 'family',
        is_verified: true,
        host_response: {
          comment: 'Thank you for your wonderful review! We\'re so glad you enjoyed your stay.',
          responded_at: new Date('2024-03-12')
        }
      },
      {
        user_id: user2._id,
        property_id: home2._id,
        ratings: {
          overall: 2,
          cleanliness: 3,
          accuracy: 2,
          location: 4,
          value: 2,
          check_in: 3
        },
        title: 'Disappointing experience',
        comment: 'The resort didn\'t live up to expectations. Room was not as clean as expected and service was slow.',
        stay_date: new Date('2024-03-15'),
        trip_type: 'couple',
        is_verified: false,
        reported: {
          is_reported: true,
          report_reason: 'Inappropriate content',
          report_date: new Date('2024-03-16')
        }
      },
      {
        user_id: user1._id,
        property_id: home1._id,
        ratings: {
          overall: 3,
          cleanliness: 3,
          accuracy: 3,
          location: 4,
          value: 3,
          check_in: 3
        },
        title: 'Average stay',
        comment: 'Nothing special but nothing wrong either. Standard hotel experience.',
        stay_date: new Date('2024-03-20'),
        trip_type: 'solo',
        is_verified: false
      }
    ];

    const createdReviews = await Review.insertMany(reviewsData);
    console.log(`Created ${createdReviews.length} sample reviews`);

    console.log('Seed completed successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedReviews();
