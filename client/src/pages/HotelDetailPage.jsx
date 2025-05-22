import React from 'react';
import { useParams } from 'react-router-dom';
import { featuredProperties } from '../data/sampleData';
import HotelGallery from '../components/home/HotelGallery';
import HotelInfo from '../components/home/HotelInfo';
import HotelAmenities from '../components/home/HotelAmenities';
import HotelRoomList from '../components/home/HotelRoomList';
import HotelReviews from '../components/home/HotelReviews';
import HotelMap from '../components/home/HotelMap';
import NearbyPlacesBlock from '../components/home/NearbyPlacesBlock';

const HotelDetailPage = () => {
  const { id } = useParams();
  const hotel = featuredProperties.find(p => p._id === id);

  if (!hotel) return <div className="text-center py-20 text-xl text-gray-500">Không tìm thấy khách sạn/homestay.</div>;

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-8">
      {/* SVG background trên phải */}
      <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg" alt="bg-decor" className="pointer-events-none select-none absolute top-0 right-0 w-72 md:w-[420px] opacity-30 z-0" style={{filter:'blur(0.5px)'}} />
      {/* SVG background dưới trái */}
      <img src="https://ik.imagekit.io/tvlk/image/imageResource/2023/12/22/1703230740804-7c3d1c3e64557331e6f5f66d7a28e262.svg" alt="bg-decor" className="pointer-events-none select-none absolute bottom-0 left-0 w-60 md:w-[320px] opacity-20 z-0" style={{transform:'scaleX(-1) rotate(-10deg)',filter:'blur(1px)'}} />
      <div className="relative z-10">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-1 drop-shadow">{hotel.name}</h1>
            <div className="text-gray-500 text-base md:text-lg flex items-center gap-2">
              <span>{hotel.location?.address?.street}</span>
              {hotel.star_rating > 0 && <span className="text-yellow-400 font-bold">{'★'.repeat(hotel.star_rating)}</span>}
              <span className="text-gray-400">({hotel.review_count} đánh giá)</span>
            </div>
          </div>
          <div className="flex gap-2 items-center mt-2 md:mt-0">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">{hotel.is_verified ? 'Đã xác thực' : 'Chưa xác thực'}</span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold text-sm">{hotel.property_type}</span>
          </div>
        </div>
        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-3">Hình ảnh nổi bật</h2>
          <HotelGallery images={hotel.images} name={hotel.name} gallery={hotel.gallery} />
        </section>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 flex flex-col gap-8">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <HotelRoomList rooms={hotel.rooms} />
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <HotelReviews />
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <HotelMap location={hotel.location} />
            </section>
            <NearbyPlacesBlock />
          </div>
          <div className="flex flex-col gap-8">
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <HotelInfo hotel={hotel} />
            </section>
            <section className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <HotelAmenities amenities={hotel.amenities} />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetailPage; 