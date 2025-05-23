import React, { useState } from 'react';
import { FaAngleRight, FaHotel, FaHome, FaUmbrellaBeach, FaBuilding, FaWarehouse, FaSwimmingPool } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Components
import SearchForm from '../components/home/SearchForm';
import PropertyCard from '../components/home/PropertyCard';
import BlogCard from '../components/home/BlogCard';
import PromotionCard from '../components/home/PromotionCard';
import LocationCard from '../components/home/LocationCard';
import DestinationGrid from '../components/home/DestinationGrid';

// Sample data (will be replaced with API calls later)
import { featuredProperties, popularLocations, latestBlogs, currentPromotions } from '../data/sampleData';

const HomePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [activeTab, setActiveTab] = useState('all');

  // Toggle favorite status
  const handleToggleFavorite = (propertyId) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter(id => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  // Filter properties by type
  const filteredProperties = activeTab === 'all' 
    ? featuredProperties 
    : featuredProperties.filter(property => property.property_type === activeTab);
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="h-[500px] bg-cover bg-center bg-no-repeat animate-heroBg"
          style={{  
            backgroundImage: "url('https://cdn1.ivivu.com/iVivu/2025/02/25/14/project-dt-2.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-blue-700/40 to-yellow-200/20 z-0 animate-gradientMove"></div>
          <div className="container mx-auto px-4 py-12 flex flex-col justify-center h-full relative z-10">
            <h1 className="text-white text-3xl md:text-5xl font-bold mb-4 max-w-2xl animate-fadeInUp">
              Khám phá & đặt phòng khách sạn, homestay tuyệt vời nhất
            </h1>
            <p className="text-white/90 text-lg mb-8 max-w-2xl animate-fadeInUp delay-100">
              Tìm kiếm các địa điểm lưu trú tốt nhất, đánh giá chân thực và đặt phòng thuận tiện
            </p>
            {/* SearchForm đặt ngay trong hero, căn giữa, margin-top hợp lý */}
            <div className="flex justify-center mt-8 animate-fadeInUp delay-200">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* Property Types */}
      <section className="py-12 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center relative inline-block after:content-[''] after:block after:w-16 after:h-1 after:bg-gradient-to-r after:from-blue-400 after:to-yellow-400 after:mx-auto after:mt-2">
            Khám Phá Theo Loại Hình Lưu Trú
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-2">
            <Link to="/search?type=hotel" className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-xl hover:scale-105 border border-transparent hover:border-blue-400 transition-all duration-300 group">
              <div className="bg-blue-100 p-6 rounded-full mb-4 flex items-center justify-center">
                <FaHotel className="text-blue-600 text-4xl" />
              </div>
              <span className="font-semibold text-lg mb-1">Khách sạn</span>
              <span className="text-gray-500 text-sm">Tiện nghi, chuyên nghiệp</span>
            </Link>
            <Link to="/search?type=homestay" className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-xl hover:scale-105 border border-transparent hover:border-green-400 transition-all duration-300 group">
              <div className="bg-green-100 p-6 rounded-full mb-4 flex items-center justify-center">
                <FaHome className="text-green-600 text-4xl" />
              </div>
              <span className="font-semibold text-lg mb-1">Homestay</span>
              <span className="text-gray-500 text-sm">Ấm cúng, gần gũi</span>
            </Link>
            <Link to="/search?type=resort" className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-xl hover:scale-105 border border-transparent hover:border-yellow-400 transition-all duration-300 group">
              <div className="bg-yellow-100 p-6 rounded-full mb-4 flex items-center justify-center">
                <FaUmbrellaBeach className="text-yellow-600 text-4xl" />
              </div>
              <span className="font-semibold text-lg mb-1">Resort</span>
              <span className="text-gray-500 text-sm">Nghỉ dưỡng cao cấp</span>
            </Link>
            <Link to="/search?type=apartment" className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow hover:shadow-xl hover:scale-105 border border-transparent hover:border-red-400 transition-all duration-300 group">
              <div className="bg-red-100 p-6 rounded-full mb-4 flex items-center justify-center">
                <FaBuilding className="text-red-600 text-4xl" />
              </div>
              <span className="font-semibold text-lg mb-1">Căn hộ</span>
              <span className="text-gray-500 text-sm">Không gian hiện đại</span>
            </Link>
          </div>
        </div>
      </section>
      <DestinationGrid />
      
      {/* Popular Destinations */}
      <section className="py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Điểm Đến Phổ Biến</h2>
            <Link to="/destinations" className="text-blue-600 hover:text-blue-800 flex items-center">
              Xem tất cả <FaAngleRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLocations.map(location => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section className="py-12 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Chỗ Nghỉ Nổi Bật</h2>
            <Link to="/homes" className="text-blue-600 hover:text-blue-800 flex items-center">
              Xem tất cả <FaAngleRight className="ml-1" />
            </Link>
          </div>
          
          {/* Tabs for filtering */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-hide">
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${activeTab === 'hotel' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('hotel')}
            >
              Khách sạn
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${activeTab === 'homestay' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('homestay')}
            >
              Homestay
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${activeTab === 'resort' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('resort')}
            >
              Resort
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap mr-2 ${activeTab === 'villa' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('villa')}
            >
              Villa
            </button>
            <button 
              className={`px-4 py-2 rounded-full whitespace-nowrap ${activeTab === 'apartment' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => setActiveTab('apartment')}
            >
              Căn hộ
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProperties.map(property => (
              <PropertyCard 
                key={property._id} 
                property={property} 
                isFavorite={favorites.includes(property._id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Current Promotions */}
      <section className="py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Ưu Đãi & Khuyến Mãi Đặc Biệt</h2>
            <Link to="/promotions" className="text-blue-600 hover:text-blue-800 flex items-center">
              Xem tất cả <FaAngleRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentPromotions.map(promotion => (
              <PromotionCard key={promotion._id} promotion={promotion} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Travel Blog */}
      <section className="py-12 bg-gray-50 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Blog Du Lịch</h2>
            <Link to="/blogs" className="text-blue-600 hover:text-blue-800 flex items-center">
              Xem tất cả <FaAngleRight className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestBlogs.map(post => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* App Download */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-white mb-4">Tải Ứng Dụng ChillNest</h2>
              <p className="text-white/90 mb-6">
                Đặt phòng dễ dàng, nhận thông báo ưu đãi đặc biệt và quản lý chuyến đi của bạn mọi lúc, mọi nơi với ứng dụng di động của chúng tôi.
              </p>              <div className="flex space-x-4">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#!" className="inline-block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1000px-Download_on_the_App_Store_Badge.svg.png" alt="App Store" className="h-12" />
                </a>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#!" className="inline-block">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1000px-Google_Play_Store_badge_EN.svg.png" alt="Google Play" className="h-12" />
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img 
                src="https://cdn.dribbble.com/users/1859708/screenshots/10848957/media/c941a921ea34ef9adb5dd32b59ddc46e.png?compress=1&resize=1000x750&vertical=top" 
                alt="App Screenshot" 
                className="max-w-xs md:max-w-sm lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-12 mt-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Tại Sao Chọn ChillNest?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Đảm Bảo Giá Tốt Nhất</h3>
              <p className="text-gray-600">Cam kết giá tốt nhất cho các chỗ nghỉ chất lượng trên toàn Việt Nam.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Đánh Giá Thực Tế</h3>
              <p className="text-gray-600">Đọc đánh giá chân thực từ du khách đã trải nghiệm để đưa ra quyết định tốt nhất.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Đặt Phòng Dễ Dàng</h3>
              <p className="text-gray-600">Quy trình đặt phòng nhanh chóng, đơn giản và an toàn chỉ trong vài phút.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Hỗ Trợ 24/7</h3>
              <p className="text-gray-600">Đội ngũ hỗ trợ khách hàng luôn sẵn sàng giúp đỡ bạn mọi lúc, mọi nơi.</p>
            </div>          </div>
        </div>
      </section>
      <style>{`
        .animate-fadeInUp { animation: fadeInUp .7s cubic-bezier(.4,2,.6,1) both; }
        .animate-heroBg { animation: heroBg 12s ease-in-out infinite alternate; }
        .animate-gradientMove { animation: gradientMove 10s linear infinite alternate; }
        .animate-bounce-slow { animation: bounce 1.5s infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes heroBg { 0% { filter: brightness(1); } 100% { filter: brightness(1.08) saturate(1.1); } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
        @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>
    </>
  );
};

export default HomePage;
