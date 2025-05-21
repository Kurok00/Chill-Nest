import React from 'react';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  const { id, city, province, image_url, property_count } = location;
  
  return (
    <Link to={`/search?location=${city}`}>
      <div className="relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow group">
        {/* Background Image */}
        <img 
          src={image_url} 
          alt={`${city}, ${province}`} 
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{city}</h3>
          <p className="text-sm text-gray-200">{province}</p>
          <p className="text-sm mt-1">
            {property_count} chỗ nghỉ
          </p>
        </div>
      </div>
    </Link>
  );
};

export default LocationCard;
