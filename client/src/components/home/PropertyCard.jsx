import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaMapMarkerAlt } from 'react-icons/fa';

// Format currency helper
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
};

const PropertyCard = ({ property, isFavorite, onToggleFavorite }) => {
  const {
    _id,
    name,
    property_type,
    location,
    images,
    price_range,
    star_rating,
    ratings,
    review_count
  } = property;

  // Get main image or first image
  const mainImage = images.find(img => img.is_main) || images[0];
  
  // Get location display string
  const locationString = location?.address ? 
    `${location.address.city || ''}, ${location.address.province || ''}` : '';
  
  const detailUrl = property.property_type === 'homestay'
    ? `/homestays/${property._id}`
    : `/hotels/${property._id}`;
  
  return (
    <Link to={detailUrl} className="block group hover:shadow-2xl transition-all duration-200 rounded-xl overflow-hidden bg-white border border-gray-100">
      {/* Image with favorite button */}
      <div className="relative">
        <img 
          src={mainImage?.url} 
          alt={mainImage?.caption || name} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(_id);
          }}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md focus:outline-none"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-lg" />
          ) : (
            <FaRegHeart className="text-gray-600 text-lg" />
          )}
        </button>
        
        {/* Property type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded capitalize">
            {property_type === 'hotel' ? 'Khách sạn' : 
             property_type === 'homestay' ? 'Homestay' : 
             property_type === 'resort' ? 'Resort' : 
             property_type === 'apartment' ? 'Căn hộ' : 
             property_type === 'villa' ? 'Villa' : property_type}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 truncate">
          {name}
        </h3>
        
        {/* Location */}
        {locationString && (
          <p className="text-gray-500 mb-2 flex items-center text-sm">
            <FaMapMarkerAlt className="mr-1" /> {locationString}
          </p>
        )}
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          {ratings?.average ? (
            <>
              <div className="bg-blue-600 text-white rounded px-1.5 py-0.5 font-semibold mr-1 flex items-center">
                {ratings.average.toFixed(1)}
              </div>
              <div className="flex items-center text-yellow-500 mr-1">
                <FaStar />
              </div>
              <span className="text-gray-600 text-sm">
                ({review_count || 0} đánh giá)
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-sm">Chưa có đánh giá</span>
          )}
          
          {/* Star Rating for hotels */}
          {star_rating > 0 && (
            <div className="ml-auto flex">
              {[...Array(star_rating)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-sm" />
              ))}
            </div>
          )}
        </div>
        
        {/* Price */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-lg font-bold text-gray-800">
              {formatCurrency(price_range?.min || 0)}
            </p>
            <p className="text-gray-500 text-sm">Giá mỗi đêm</p>
          </div>
          <span className="text-blue-600 hover:text-blue-800 text-sm font-medium underline cursor-pointer">
            Xem chi tiết
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
