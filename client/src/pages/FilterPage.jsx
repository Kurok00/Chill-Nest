import React from 'react';
import { useLocation } from 'react-router-dom';
import { sampleHotels, sampleHomestays, sampleResorts, sampleApartments } from '../data/sampleData';
import { FaWifi, FaSwimmingPool, FaParking, FaMugHot, FaSpa, FaDumbbell, FaDog } from 'react-icons/fa';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const typeMap = {
  hotel: sampleHotels,
  homestay: sampleHomestays,
  resort: sampleResorts,
  apartment: sampleApartments
};

// Danh sách tiện ích mẫu (có thể mở rộng tuỳ ý)
const AMENITIES = [
  { key: 'Wi-Fi miễn phí', label: 'Wi-Fi miễn phí', icon: <FaWifi className="text-blue-500" /> },
  { key: 'Hồ bơi', label: 'Hồ bơi', icon: <FaSwimmingPool className="text-cyan-500" /> },
  { key: 'Bãi đỗ xe', label: 'Bãi đỗ xe', icon: <FaParking className="text-green-500" /> },
  { key: 'Bữa sáng', label: 'Bữa sáng', icon: <FaMugHot className="text-yellow-500" /> },
  { key: 'Spa', label: 'Spa', icon: <FaSpa className="text-pink-500" /> },
  { key: 'Phòng gym', label: 'Phòng gym', icon: <FaDumbbell className="text-purple-500" /> },
  { key: 'Thú cưng', label: 'Thú cưng', icon: <FaDog className="text-orange-500" /> },
];

const FilterPage = () => {
  const query = useQuery();
  const type = query.get('type') || 'hotel';
  const data = typeMap[type] || [];

  // Simple filter state (price, rating)
  const [minPrice, setMinPrice] = React.useState(0);
  const [minRating, setMinRating] = React.useState(0);
  const [selectedAmenities, setSelectedAmenities] = React.useState([]);

  // Lọc nâng cao: theo giá, rating, tiện ích
  const filtered = data.filter(item =>
    item.price >= minPrice &&
    item.rating >= minRating &&
    (selectedAmenities.length === 0 || selectedAmenities.every(a => item.amenities.includes(a)))
  );

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 capitalize">{type === 'apartment' ? 'Căn hộ' : type.charAt(0).toUpperCase() + type.slice(1)} nổi bật</h1>
        <div className="flex gap-4 mb-6 flex-wrap">
          <div>
            <label className="block text-sm font-medium mb-1">Giá tối thiểu</label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={0}
                max={5000000}
                step={50000}
                value={minPrice}
                onChange={e => setMinPrice(Number(e.target.value))}
                className="w-40 accent-blue-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <span className="font-semibold text-blue-600 min-w-[90px] text-right">
                {minPrice.toLocaleString()}đ
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating tối thiểu</label>
            <div className="flex items-center gap-1 mt-1">
              {[1,2,3,4,5].map(star => (
                <label key={star} className="cursor-pointer">
                  <input
                    type="radio"
                    name="minRating"
                    value={star}
                    checked={minRating === star}
                    onChange={() => setMinRating(star)}
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill={minRating >= star ? '#facc15' : '#e5e7eb'}
                    className="w-7 h-7 transition-colors duration-150"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
                  </svg>
                </label>
              ))}
              <button
                type="button"
                className="ml-2 text-xs text-gray-400 hover:text-blue-500 underline"
                onClick={() => setMinRating(0)}
                style={{display: minRating ? 'inline' : 'none'}}
              >Bỏ chọn</button>
            </div>
          </div>
          <div className="min-w-[220px]">
            <label className="block text-sm font-medium mb-1">Tiện ích</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AMENITIES.map(a => (
                <label
                  key={a.key}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer transition hover:bg-blue-50 ${
                    selectedAmenities.includes(a.key) ? 'bg-blue-100 border border-blue-400' : 'border border-transparent'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="accent-blue-500"
                    checked={selectedAmenities.includes(a.key)}
                    onChange={() => {
                      setSelectedAmenities(prev =>
                        prev.includes(a.key)
                          ? prev.filter(k => k !== a.key)
                          : [...prev, a.key]
                      );
                    }}
                  />
                  <span className="text-lg">{a.icon}</span>
                  <span className="text-sm">{a.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filtered.length === 0 && <div className="col-span-full text-center text-gray-500">Không tìm thấy kết quả phù hợp.</div>}
          {filtered.map(item => (
            <div key={item._id} className="bg-white rounded-2xl shadow hover:shadow-xl transition-all p-4 flex flex-col">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-xl mb-3" />
              <h2 className="font-bold text-lg mb-1">{item.name}</h2>
              <div className="text-gray-500 text-sm mb-2">{item.address}</div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-500 font-semibold">★ {item.rating}</span>
                <span className="text-blue-600 font-bold">{item.price.toLocaleString()}đ/đêm</span>
              </div>
              <div className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {item.amenities.map(a => (
                  <span key={a} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FilterPage; 