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

const seedExtendedData = async () => {
  try {
    console.log('🌱 Starting to seed extended data...');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      console.error('❌ Admin user not found. Please run seedAdminData.js first');
      return;
    }

    // Add more locations (check for duplicates first)
    const existingLocationNames = await Location.find({}, 'name').then(locs => locs.map(l => l.name));
    
    const newLocations = [
      {
        name: 'Nha Trang',
        description: 'Thành phố biển nổi tiếng',
        coordinates: { latitude: 12.2388, longitude: 109.1967 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Vũng Tàu',
        description: 'Thành phố biển gần TP.HCM',
        coordinates: { latitude: 10.4493, longitude: 107.1433 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Đà Lạt',
        description: 'Thành phố ngàn hoa',
        coordinates: { latitude: 11.9404, longitude: 108.4583 },
        type: 'city',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Hội An',
        description: 'Phố cổ di sản thế giới',
        coordinates: { latitude: 15.8801, longitude: 108.3380 },
        type: 'landmark',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Mũi Né',
        description: 'Khu du lịch biển nổi tiếng',
        coordinates: { latitude: 10.9312, longitude: 108.2845 },
        type: 'landmark',
        is_popular: true,
        is_active: true
      },
      {
        name: 'Cần Thơ',
        description: 'Thành phố trung tâm Đồng bằng sông Cửu Long',
        coordinates: { latitude: 10.0452, longitude: 105.7469 },
        type: 'city',
        is_popular: false,
        is_active: true
      }
    ].filter(loc => !existingLocationNames.includes(loc.name));

    let additionalLocations = [];
    if (newLocations.length > 0) {
      additionalLocations = await Location.insertMany(newLocations);
      console.log(`✅ Added ${additionalLocations.length} new locations`);
    } else {
      console.log('ℹ️ All locations already exist');
    }

    // Add more properties with different types
    const additionalProperties = await Home.insertMany([
      {
        name: 'Nha Trang Bay Resort & Spa',
        description: 'Resort sang trọng với view vịnh Nha Trang tuyệt đẹp',
        property_type: 'resort',
        host_id: adminUser._id,
        location: {
          address: {
            street: '25 Trần Phú',
            ward: 'Lộc Thọ',
            district: 'Nha Trang',
            city: 'Nha Trang',
            province: 'Khánh Hòa',
            country: 'Vietnam'
          },
          coordinates: { latitude: 12.2388, longitude: 109.1967 }
        },
        price_range: { min: 2500000, max: 8500000 },
        star_rating: 5,
        amenities: ['wifi', 'parking', 'pool', 'spa', 'gym', 'restaurant', 'bar', 'room_service', 'air_conditioning', 'beach_access', '24hr_front_desk']
      },
      {
        name: 'Vung Tau Ocean View Hotel',
        description: 'Khách sạn view biển tại Vũng Tàu',
        property_type: 'hotel',
        host_id: adminUser._id,
        location: {
          address: {
            street: '15 Thùy Vân',
            ward: 'Thắng Tam',
            district: 'Vũng Tàu',
            city: 'Vũng Tàu',
            province: 'Bà Rịa - Vũng Tàu',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.4493, longitude: 107.1433 }
        },
        price_range: { min: 1000000, max: 3000000 },
        star_rating: 4,
        amenities: ['wifi', 'parking', 'pool', 'restaurant', 'air_conditioning', 'beach_access', 'breakfast', '24hr_front_desk']
      },
      {
        name: 'Dalat Pine Valley Villa',
        description: 'Villa xinh đẹp giữa rừng thông Đà Lạt',
        property_type: 'villa',
        host_id: adminUser._id,
        location: {
          address: {
            street: '20 Khe Sanh',
            ward: 'Phường 10',
            district: 'Đà Lạt',
            city: 'Đà Lạt',
            province: 'Lâm Đồng',
            country: 'Vietnam'
          },
          coordinates: { latitude: 11.9404, longitude: 108.4583 }
        },
        price_range: { min: 1800000, max: 5500000 },
        star_rating: 4,
        amenities: ['wifi', 'parking', 'kitchen', 'air_conditioning', 'mountain_view', 'bbq', 'pet_friendly', 'laundry']
      },
      {
        name: 'Hoi An Ancient House',
        description: 'Nhà cổ đầy màu sắc tại phố cổ Hội An',
        property_type: 'homestay',
        host_id: adminUser._id,
        location: {
          address: {
            street: '85 Trần Phú',
            ward: 'Minh An',
            district: 'Hội An',
            city: 'Hội An',
            province: 'Quảng Nam',
            country: 'Vietnam'
          },
          coordinates: { latitude: 15.8801, longitude: 108.3380 }
        },
        price_range: { min: 800000, max: 2200000 },
        star_rating: 3,
        amenities: ['wifi', 'air_conditioning', 'kitchen', 'breakfast', 'laundry']
      },
      {
        name: 'Mui Ne Desert Lodge',
        description: 'Khu nghỉ dưỡng độc đáo giữa sa mạc và biển',
        property_type: 'resort',
        host_id: adminUser._id,
        location: {
          address: {
            street: '108 Nguyễn Đình Chiểu',
            ward: 'Hàm Tiến',
            district: 'Phan Thiết',
            city: 'Phan Thiết',
            province: 'Bình Thuận',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.9312, longitude: 108.2845 }
        },
        price_range: { min: 2000000, max: 7000000 },
        star_rating: 4,
        amenities: ['wifi', 'parking', 'pool', 'restaurant', 'air_conditioning', 'beach_access', 'mountain_view', 'bbq', '24hr_front_desk']
      },
      {
        name: 'Can Tho Riverside Hotel',
        description: 'Khách sạn bên sông Hậu thơ mộng',
        property_type: 'hotel',
        host_id: adminUser._id,
        location: {
          address: {
            street: '38 Hai Bà Trưng',
            ward: 'Tân An',
            district: 'Ninh Kiều',
            city: 'Cần Thơ',
            province: 'Cần Thơ',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.0452, longitude: 105.7469 }
        },
        price_range: { min: 900000, max: 2800000 },
        star_rating: 3,
        amenities: ['wifi', 'parking', 'restaurant', 'air_conditioning', 'breakfast', '24hr_front_desk']
      },
      {
        name: 'Luxury City Center Apartment',
        description: 'Căn hộ cao cấp tại trung tâm thành phố',
        property_type: 'apartment',
        host_id: adminUser._id,
        location: {
          address: {
            street: '88 Đồng Khởi',
            ward: 'Bến Nghé',
            district: 'Quận 1',
            city: 'Hồ Chí Minh',
            province: 'Hồ Chí Minh',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.8231, longitude: 106.6297 }
        },
        price_range: { min: 1200000, max: 4000000 },
        star_rating: 4,
        amenities: ['wifi', 'air_conditioning', 'kitchen', 'elevator', 'security_camera', 'laundry']
      },
      {
        name: 'Backpacker Hostel Central',
        description: 'Hostel giá rẻ cho du khách bụi',
        property_type: 'hostel',
        host_id: adminUser._id,
        location: {
          address: {
            street: '265 Đề Thám',
            ward: 'Phạm Ngũ Lão',
            district: 'Quận 1',
            city: 'Hồ Chí Minh',
            province: 'Hồ Chí Minh',
            country: 'Vietnam'
          },
          coordinates: { latitude: 10.8231, longitude: 106.6297 }
        },
        price_range: { min: 200000, max: 800000 },
        star_rating: 2,
        amenities: ['wifi', 'air_conditioning', 'kitchen', 'laundry']
      }
    ]);
    console.log(`✅ Added ${additionalProperties.length} more properties`);

    // Add rooms for new properties
    const newRooms = [];
    
    // Rooms for Nha Trang Bay Resort & Spa
    newRooms.push(
      {
        home_id: additionalProperties[0]._id,
        room_name: 'Bay View Suite',
        description: 'Suite cao cấp với view vịnh Nha Trang',
        room_type: 'suite',
        room_size: { value: 55, unit: 'm²' },
        max_guests: { adults: 4, children: 2 },
        bed_configuration: [{ type: 'king', count: 1 }, { type: 'sofa_bed', count: 1 }],
        regular_price: 6500000,
        discount_price: 5500000,
        price_includes_breakfast: true
      },
      {
        home_id: additionalProperties[0]._id,
        room_name: 'Standard Twin Sea View',
        description: 'Phòng twin với view biển',
        room_type: 'twin',
        room_size: { value: 32, unit: 'm²' },
        max_guests: { adults: 2, children: 1 },
        bed_configuration: [{ type: 'single', count: 2 }],
        regular_price: 3500000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Vung Tau Ocean View Hotel
    newRooms.push(
      {
        home_id: additionalProperties[1]._id,
        room_name: 'Ocean View Double',
        description: 'Phòng đôi view biển Vũng Tàu',
        room_type: 'superior',
        room_size: { value: 28, unit: 'm²' },
        max_guests: { adults: 2, children: 1 },
        bed_configuration: [{ type: 'queen', count: 1 }],
        regular_price: 2200000,
        discount_price: 1800000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Dalat Pine Valley Villa
    newRooms.push(
      {
        home_id: additionalProperties[2]._id,
        room_name: 'Pine Forest Villa',
        description: 'Villa riêng biệt giữa rừng thông',
        room_type: 'suite',
        room_size: { value: 75, unit: 'm²' },
        max_guests: { adults: 6, children: 3 },
        bed_configuration: [{ type: 'king', count: 2 }, { type: 'single', count: 2 }],
        regular_price: 4500000,
        price_includes_breakfast: false
      }
    );

    // Rooms for Hoi An Ancient House
    newRooms.push(
      {
        home_id: additionalProperties[3]._id,
        room_name: 'Traditional Family Room',
        description: 'Phòng gia đình phong cách cổ điển',
        room_type: 'family',
        room_size: { value: 35, unit: 'm²' },
        max_guests: { adults: 4, children: 2 },
        bed_configuration: [{ type: 'double', count: 1 }, { type: 'single', count: 2 }],
        regular_price: 1500000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Mui Ne Desert Lodge
    newRooms.push(
      {
        home_id: additionalProperties[4]._id,
        room_name: 'Desert View Bungalow',
        description: 'Bungalow với view sa mạc độc đáo',
        room_type: 'suite',
        room_size: { value: 45, unit: 'm²' },
        max_guests: { adults: 3, children: 2 },
        bed_configuration: [{ type: 'king', count: 1 }, { type: 'sofa_bed', count: 1 }],
        regular_price: 5000000,
        discount_price: 4200000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Can Tho Riverside Hotel
    newRooms.push(
      {
        home_id: additionalProperties[5]._id,
        room_name: 'River View Standard',
        description: 'Phòng tiêu chuẩn với view sông',
        room_type: 'standard',
        room_size: { value: 24, unit: 'm²' },
        max_guests: { adults: 2, children: 1 },
        bed_configuration: [{ type: 'double', count: 1 }],
        regular_price: 1800000,
        price_includes_breakfast: true
      }
    );

    // Rooms for Luxury City Center Apartment
    newRooms.push(
      {
        home_id: additionalProperties[6]._id,
        room_name: 'Executive Studio',
        description: 'Studio cao cấp với đầy đủ tiện nghi',
        room_type: 'deluxe',
        room_size: { value: 38, unit: 'm²' },
        max_guests: { adults: 2, children: 0 },
        bed_configuration: [{ type: 'king', count: 1 }],
        regular_price: 2800000,
        price_includes_breakfast: false
      }
    );

    // Rooms for Backpacker Hostel Central
    newRooms.push(
      {
        home_id: additionalProperties[7]._id,
        room_name: '6-Bed Mixed Dorm',
        description: 'Giường trong phòng tập thể 6 người',
        room_type: 'dorm',
        room_size: { value: 25, unit: 'm²' },
        max_guests: { adults: 1, children: 0 },
        bed_configuration: [{ type: 'bunk_bed', count: 3 }],
        regular_price: 350000,
        price_includes_breakfast: false
      },
      {
        home_id: additionalProperties[7]._id,
        room_name: 'Private Double Room',
        description: 'Phòng đôi riêng tư trong hostel',
        room_type: 'double',
        room_size: { value: 18, unit: 'm²' },
        max_guests: { adults: 2, children: 0 },
        bed_configuration: [{ type: 'double', count: 1 }],
        regular_price: 750000,
        price_includes_breakfast: false
      }
    );

    await Room.insertMany(newRooms);
    console.log(`✅ Added ${newRooms.length} more rooms`);

    console.log('🎉 Extended data seeding completed successfully!');
    console.log(`📊 Total created:`);
    console.log(`   - ${additionalLocations.length} additional locations`);
    console.log(`   - ${additionalProperties.length} additional properties`);
    console.log(`   - ${newRooms.length} additional rooms`);

    // Display summary
    const totalHomes = await Home.countDocuments();
    const totalRooms = await Room.countDocuments();
    const totalLocations = await Location.countDocuments();
    const totalAmenities = await Amenity.countDocuments();

    console.log(`\n📈 Database summary:`);
    console.log(`   - ${totalHomes} total properties`);
    console.log(`   - ${totalRooms} total rooms`);
    console.log(`   - ${totalLocations} total locations`);
    console.log(`   - ${totalAmenities} total amenities`);

  } catch (error) {
    console.error('❌ Error seeding extended data:', error);
  } finally {
    mongoose.disconnect();
  }
};

seedExtendedData();
