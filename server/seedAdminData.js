const mongoose = require('mongoose');
const Home = require('./models/homeModel');
const Room = require('./models/roomModel');
const Amenity = require('./models/amenityModel');
const Location = require('./models/locationModel');
const User = require('./models/userModel');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chillnest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    console.log('🌱 Starting to seed admin data...');

    // Create or find admin user for host_id
    let adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      adminUser = await User.create({
        user_name: 'admin',
        email: 'admin@chillnest.com',
        password: 'admin123',
        phone_number: '0123456789',
        role: 'admin',
        is_verified: true
      });
      console.log('✅ Created admin user');
    }

    // Clear existing data
    await Home.deleteMany({});
    await Room.deleteMany({});
    await Amenity.deleteMany({});
    await Location.deleteMany({});
    console.log('✅ Cleared existing data');

    // Seed Locations
    const locations = await Location.insertMany([
      {
        name: 'Hồ Chí Minh',
        description: 'Thành phố lớn nhất Việt Nam',
        coordinates: { latitude: 10.8231, longitude: 106.6297 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Hà Nội',
        description: 'Thủ đô của Việt Nam',
        coordinates: { latitude: 21.0285, longitude: 105.8542 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Đà Nẵng',
        description: 'Thành phố trực thuộc trung ương',
        coordinates: { latitude: 16.0544, longitude: 108.2022 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Phú Quốc',
        description: 'Đảo ngọc của Việt Nam',
        coordinates: { latitude: 10.2899, longitude: 103.9840 },
        type: 'landmark',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Sa Pa',
        description: 'Thị trấn miền núi nổi tiếng',
        coordinates: { latitude: 22.3380, longitude: 103.8439 },
        type: 'landmark',
        is_popular: true,
        is_active: true
      }
    ]);
    console.log('✅ Seeded locations');

    // Seed Amenities
    const amenities = await Amenity.insertMany([
      // Basic amenities
      { name: 'WiFi miễn phí', category: 'basic', icon: 'fa-wifi', is_active: true },
      { name: 'Điều hòa', category: 'basic', icon: 'fa-snowflake', is_active: true },
      { name: 'Tivi', category: 'basic', icon: 'fa-tv', is_active: true },
      { name: 'Tủ lạnh', category: 'basic', icon: 'fa-cube', is_active: true },
      { name: 'Máy sấy tóc', category: 'basic', icon: 'fa-wind', is_active: true },
      
      // Entertainment
      { name: 'Hồ bơi', category: 'entertainment', icon: 'fa-swimmer', is_active: true },
      { name: 'Karaoke', category: 'entertainment', icon: 'fa-microphone', is_active: true },
      { name: 'Phòng gym', category: 'entertainment', icon: 'fa-dumbbell', is_active: true },
      { name: 'Game center', category: 'entertainment', icon: 'fa-gamepad', is_active: true },
      
      // Business
      { name: 'Trung tâm hội nghị', category: 'business', icon: 'fa-briefcase', is_active: true },
      { name: 'Dịch vụ photocopy', category: 'business', icon: 'fa-copy', is_active: true },
      { name: 'Phòng họp', category: 'business', icon: 'fa-users', is_active: true },
      
      // Wellness
      { name: 'Spa', category: 'wellness', icon: 'fa-spa', is_active: true },
      { name: 'Massage', category: 'wellness', icon: 'fa-hand-sparkles', is_active: true },
      { name: 'Sauna', category: 'wellness', icon: 'fa-hot-tub', is_active: true },
      
      // Dining
      { name: 'Nhà hàng', category: 'dining', icon: 'fa-utensils', is_active: true },
      { name: 'Quầy bar', category: 'dining', icon: 'fa-cocktail', is_active: true },
      { name: 'Room service', category: 'dining', icon: 'fa-concierge-bell', is_active: true },
      { name: 'Bữa sáng miễn phí', category: 'dining', icon: 'fa-coffee', is_active: true },
      
      // Transport
      { name: 'Đưa đón sân bay', category: 'transport', icon: 'fa-plane', is_active: true },
      { name: 'Bãi đỗ xe miễn phí', category: 'transport', icon: 'fa-parking', is_active: true },
      { name: 'Thuê xe đạp', category: 'transport', icon: 'fa-bicycle', is_active: true }
    ]);
    console.log('✅ Seeded amenities');

    // Seed Properties (Homes) - using enum amenities from model
    const validAmenities = ['wifi', 'parking', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'room_service', 
                           'air_conditioning', 'kitchen', 'laundry', 'breakfast', 'pet_friendly', 'beach_access',
                           'mountain_view', 'bbq', 'security_camera', '24hr_front_desk', 'elevator'];
    
    const properties = await Home.insertMany([
      {
        name: 'Khách sạn Grand Palace Saigon',
        description: 'Khách sạn 5 sao sang trọng tại trung tâm thành phố Hồ Chí Minh',
        property_type: 'hotel',
        host_id: adminUser._id,
        location: {
          address: {
            street: '123 Nguyễn Huệ',
            ward: 'Bến Nghé',
            district: 'Quận 1',
            city: 'Hồ Chí Minh',
            province: 'Hồ Chí Minh',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.8231, longitude: 106.6297 }
        },
        price_range: { min: 1500000, max: 5000000 },
        star_rating: 5,
        amenities: ['wifi', 'parking', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'room_service', 'air_conditioning', '24hr_front_desk']
      },
      {
        name: 'Hanoi Pearl Hotel',
        description: 'Khách sạn boutique tại Hà Nội với phong cách hiện đại',
        property_type: 'hotel',
        host_id: adminUser._id,
        location: {
          address: {
            street: '456 Hoàn Kiếm',
            ward: 'Hàng Bạc',
            district: 'Hoàn Kiếm',
            city: 'Hà Nội',
            province: 'Hà Nội',
            country: 'Vietnam'
          },
          coordinates: { latitude: 21.0285, longitude: 105.8542 }
        },
        price_range: { min: 1200000, max: 3500000 },
        star_rating: 4,
        amenities: ['wifi', 'parking', 'gym', 'restaurant', 'air_conditioning', 'laundry', 'breakfast', '24hr_front_desk', 'elevator']
      },
      {
        name: 'Da Nang Beach Resort',
        description: 'Resort nghỉ dưỡng bên bờ biển Đà Nẵng',
        property_type: 'resort',
        host_id: adminUser._id,
        location: {
          address: {
            street: '789 Võ Nguyên Giáp',
            ward: 'Khuê Mỹ',
            district: 'Ngũ Hành Sơn',
            city: 'Đà Nẵng',
            province: 'Đà Nẵng',
            country: 'Vietnam'
          },
          coordinates: { latitude: 16.0544, longitude: 108.2022 }
        },
        price_range: { min: 2000000, max: 8000000 },
        star_rating: 5,
        amenities: ['wifi', 'parking', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'room_service', 'air_conditioning', 'beach_access', 'bbq', '24hr_front_desk']
      },
      {
        name: 'Phu Quoc Paradise Villa',
        description: 'Villa cao cấp tại đảo Phú Quốc với view biển tuyệt đẹp',
        property_type: 'villa',
        host_id: adminUser._id,
        location: {
          address: {
            street: '101 Trần Hưng Đạo',
            ward: 'Dương Đông',
            district: 'Phú Quốc',
            city: 'Kiên Giang',
            province: 'Kiên Giang',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.2899, longitude: 103.9840 }
        },
        price_range: { min: 3000000, max: 12000000 },
        star_rating: 5,
        amenities: ['wifi', 'parking', 'pool', 'spa', 'kitchen', 'air_conditioning', 'beach_access', 'bbq', 'mountain_view', 'laundry']
      },
      {
        name: 'Sapa Mountain Homestay',
        description: 'Homestay ấm cúng giữa núi rừng Sa Pa',
        property_type: 'homestay',
        host_id: adminUser._id,
        location: {
          address: {
            street: '202 Cầu Mây',
            ward: 'Sa Pa',
            district: 'Sa Pa',
            city: 'Lào Cai',
            province: 'Lào Cai',
            country: 'Vietnam'
          },
          coordinates: { latitude: 22.3380, longitude: 103.8439 }
        },
        price_range: { min: 500000, max: 1500000 },
        star_rating: 3,
        amenities: ['wifi', 'parking', 'kitchen', 'air_conditioning', 'mountain_view', 'breakfast', 'pet_friendly', 'bbq']
      }
    ]);
    console.log('✅ Seeded properties');

    // Seed Rooms
    const rooms = [];
    
    // Rooms for Grand Palace Saigon
    rooms.push(
      {
        home_id: properties[0]._id,
        room_name: 'Deluxe Room',
        description: 'Phòng deluxe với view thành phố',
        room_type: 'deluxe',
        room_size: { value: 35, unit: 'm²' },
        max_guests: { adults: 2, children: 1 },
        bed_configuration: [{ type: 'king', count: 1 }],
        regular_price: 2500000,
        discount_price: 2000000,
        price_includes_breakfast: true
      },
      {
        home_id: properties[0]._id,
        room_name: 'Suite Room',
        description: 'Phòng suite cao cấp với phòng khách riêng',
        room_type: 'suite',
        room_size: { value: 60, unit: 'm²' },
        max_guests: { adults: 4, children: 2 },
        bed_configuration: [{ type: 'king', count: 1 }, { type: 'sofa_bed', count: 1 }],
        regular_price: 4500000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Hanoi Pearl Hotel
    rooms.push(
      {
        home_id: properties[1]._id,
        room_name: 'Standard Twin',
        description: 'Phòng tiêu chuẩn với 2 giường đơn',
        room_type: 'twin',
        room_size: { value: 25, unit: 'm²' },
        max_guests: { adults: 2, children: 0 },
        bed_configuration: [{ type: 'single', count: 2 }],
        regular_price: 1800000,
        price_includes_breakfast: false
      },
      {
        home_id: properties[1]._id,
        room_name: 'Superior Double',
        description: 'Phòng superior với giường đôi lớn',
        room_type: 'superior',
        room_size: { value: 30, unit: 'm²' },
        max_guests: { adults: 2, children: 1 },
        bed_configuration: [{ type: 'queen', count: 1 }],
        regular_price: 2200000,
        discount_price: 1900000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Da Nang Beach Resort
    rooms.push(
      {
        home_id: properties[2]._id,
        room_name: 'Ocean View Villa',
        description: 'Villa view biển với hồ bơi riêng',
        room_type: 'suite',
        room_size: { value: 80, unit: 'm²' },
        max_guests: { adults: 6, children: 4 },
        bed_configuration: [{ type: 'king', count: 2 }, { type: 'sofa_bed', count: 2 }],
        regular_price: 6500000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Phu Quoc Paradise Villa
    rooms.push(
      {
        home_id: properties[3]._id,
        room_name: 'Beach Villa',
        description: 'Villa riêng biệt bên bờ biển',
        room_type: 'suite',
        room_size: { value: 120, unit: 'm²' },
        max_guests: { adults: 8, children: 4 },
        bed_configuration: [{ type: 'king', count: 3 }, { type: 'sofa_bed', count: 1 }],
        regular_price: 10000000,
        discount_price: 8500000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Sapa Mountain Homestay
    rooms.push(
      {
        home_id: properties[4]._id,
        room_name: 'Traditional Room',
        description: 'Phòng truyền thống với trang trí dân tộc',
        room_type: 'family',
        room_size: { value: 20, unit: 'm²' },
        max_guests: { adults: 4, children: 2 },
        bed_configuration: [{ type: 'double', count: 1 }, { type: 'floor_mattress', count: 2 }],
        regular_price: 800000,
        price_includes_breakfast: true
      },
      {
        home_id: properties[4]._id,
        room_name: 'Dorm Bed',
        description: 'Giường trong phòng tập thể',
        room_type: 'dorm',
        room_size: { value: 40, unit: 'm²' },
        max_guests: { adults: 1, children: 0 },
        bed_configuration: [{ type: 'bunk_bed', count: 6 }],
        regular_price: 300000,
        price_includes_breakfast: false
      }
    );

    await Room.insertMany(rooms);
    console.log('✅ Seeded rooms');

    console.log('🎉 Admin data seeding completed successfully!');
    console.log(`📊 Created:`);
    console.log(`   - ${locations.length} locations`);
    console.log(`   - ${amenities.length} amenities`);
    console.log(`   - ${properties.length} properties`);
    console.log(`   - ${rooms.length} rooms`);

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedData();
