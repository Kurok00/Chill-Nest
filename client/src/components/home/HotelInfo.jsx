import React from 'react';

const HotelInfo = ({ hotel }) => {
  const { name, property_type, location, star_rating, ratings, review_count, price_range, description } = hotel;
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{name}</h1>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm px-2 py-1 bg-blue-100 text-blue-700 rounded">{property_type}</span>
        {star_rating > 0 && (
          <span className="text-yellow-400 font-bold">{'★'.repeat(star_rating)}</span>
        )}
        <span className="text-gray-500 text-sm">{review_count} đánh giá</span>
      </div>
      <div className="text-gray-600 mb-2">
        {location?.address?.street && <span>{location.address.street}, </span>}
        {location?.address?.district && <span>{location.address.district}, </span>}
        {location?.address?.city && <span>{location.address.city}, </span>}
        {location?.address?.province && <span>{location.address.province}</span>}
      </div>
      <div className="text-lg font-semibold text-pink-600 mb-2">
        {price_range?.min && price_range?.max && (
          <span>{price_range.min.toLocaleString()}₫ - {price_range.max.toLocaleString()}₫ /đêm</span>
        )}
      </div>
      <div className="text-gray-700 mb-2">{description}</div>
      {hotel.detail && (
        <div className="text-gray-600 text-sm mb-2 whitespace-pre-line">{hotel.detail}</div>
      )}
      {hotel.policies && (
        <div className="mt-2">
          <h3 className="font-semibold text-blue-700 mb-1">Chính sách</h3>
          <div className="text-gray-600 text-sm whitespace-pre-line">{hotel.policies}</div>
        </div>
      )}
      {hotel.extra_amenities && hotel.extra_amenities.length > 0 && (
        <div className="mt-2">
          <h3 className="font-semibold text-blue-700 mb-1">Tiện ích mở rộng</h3>
          <ul className="list-disc ml-5 text-gray-600 text-sm">
            {hotel.extra_amenities.map((item, idx) => <li key={idx}>{item}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelInfo; 