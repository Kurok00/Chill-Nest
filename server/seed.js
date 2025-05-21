const mongoose = require('mongoose');

const uri = 'mongodb+srv://anvnt96:asdqwe123@cluster0.bs2jhhq.mongodb.net/ChillNest?retryWrites=true&w=majority';

const userSamples = [
  { user_name: 'User One', email: 'user1@example.com', password: '123456', role: 'user', is_verified: true },
  { user_name: 'User Two', email: 'user2@example.com', password: '123456', role: 'user', is_verified: true },
  { user_name: 'User Three', email: 'user3@example.com', password: '123456', role: 'user', is_verified: false }
];
const homeSamples = [
  { name: 'Home 1', description: 'Nice home', property_type: 'homestay', location: { city: 'Hanoi' }, price_range: { min: 100, max: 200 }, host_id: null },
  { name: 'Home 2', description: 'Cozy home', property_type: 'villa', location: { city: 'HCM' }, price_range: { min: 150, max: 250 }, host_id: null },
  { name: 'Home 3', description: 'Luxury home', property_type: 'hotel', location: { city: 'Danang' }, price_range: { min: 200, max: 400 }, host_id: null }
];
const roomSamples = [
  { home_id: null, room_name: 'Room 1', description: 'Single room', room_type: 'single', room_size: { value: 20, unit: 'm²' }, max_guests: { adults: 2 }, bed_configuration: [], price: 100 },
  { home_id: null, room_name: 'Room 2', description: 'Double room', room_type: 'double', room_size: { value: 30, unit: 'm²' }, max_guests: { adults: 3 }, bed_configuration: [], price: 150 },
  { home_id: null, room_name: 'Room 3', description: 'Suite', room_type: 'suite', room_size: { value: 50, unit: 'm²' }, max_guests: { adults: 4 }, bed_configuration: [], price: 250 }
];
const bookingSamples = [
  { user_id: null, property_id: null, booking_reference: 'BK001', check_in_date: new Date(), check_out_date: new Date(), guests: { adults: 2 }, contact_info: { full_name: 'User One', email: 'user1@example.com' }, rooms: [] },
  { user_id: null, property_id: null, booking_reference: 'BK002', check_in_date: new Date(), check_out_date: new Date(), guests: { adults: 1 }, contact_info: { full_name: 'User Two', email: 'user2@example.com' }, rooms: [] },
  { user_id: null, property_id: null, booking_reference: 'BK003', check_in_date: new Date(), check_out_date: new Date(), guests: { adults: 3 }, contact_info: { full_name: 'User Three', email: 'user3@example.com' }, rooms: [] }
];
const reviewSamples = [
  { user_id: null, property_id: null, ratings: { overall: 5 }, comment: 'Great!' },
  { user_id: null, property_id: null, ratings: { overall: 4 }, comment: 'Good!' },
  { user_id: null, property_id: null, ratings: { overall: 3 }, comment: 'Okay.' }
];
const favoriteHomeSamples = [
  { user_id: null, home_id: null },
  { user_id: null, home_id: null },
  { user_id: null, home_id: null }
];
const paymentSamples = [
  { booking_id: null, user_id: null, payment_method: 'credit_card', status: 'completed' },
  { booking_id: null, user_id: null, payment_method: 'paypal', status: 'pending' },
  { booking_id: null, user_id: null, payment_method: 'cash', status: 'failed' }
];
const voucherSamples = [
  { code: 'VOUCHER1', discount_amount: 10, max_discount: 50, min_order_value: 100, valid_from: new Date(), valid_to: new Date() },
  { code: 'VOUCHER2', discount_amount: 20, max_discount: 100, min_order_value: 200, valid_from: new Date(), valid_to: new Date() },
  { code: 'VOUCHER3', discount_amount: 30, max_discount: 150, min_order_value: 300, valid_from: new Date(), valid_to: new Date() }
];
const blogSamples = [
  { title: 'Blog 1', slug: 'blog-1', content: 'Content 1', author: null },
  { title: 'Blog 2', slug: 'blog-2', content: 'Content 2', author: null },
  { title: 'Blog 3', slug: 'blog-3', content: 'Content 3', author: null }
];
const promotionSamples = [
  { title: 'Promo 1', description: 'Desc 1', discount: 10 },
  { title: 'Promo 2', description: 'Desc 2', discount: 20 },
  { title: 'Promo 3', description: 'Desc 3', discount: 30 }
];

async function seed() {
  await mongoose.connect(uri);
  const db = mongoose.connection;
  await db.dropDatabase();
  await db.collection('users').insertMany(userSamples);
  await db.collection('homes').insertMany(homeSamples);
  await db.collection('rooms').insertMany(roomSamples);
  await db.collection('bookings').insertMany(bookingSamples);
  await db.collection('reviews').insertMany(reviewSamples);
  await db.collection('favoritehomes').insertMany(favoriteHomeSamples);
  await db.collection('payments').insertMany(paymentSamples);
  await db.collection('vouchers').insertMany(voucherSamples);
  await db.collection('blogs').insertMany(blogSamples);
  await db.collection('promotions').insertMany(promotionSamples);
  await mongoose.disconnect();
  console.log('Seed data inserted successfully!');
}

seed().catch(err => { console.error(err); process.exit(1); });
