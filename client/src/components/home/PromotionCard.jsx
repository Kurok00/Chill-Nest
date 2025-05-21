import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const PromotionCard = ({ promotion }) => {
  const { _id, name, description, discount_value, discount_unit, validity_period, applicable_properties } = promotion;
  
  // Get main image
  const image = applicable_properties?.[0]?.images?.[0]?.url || 'https://via.placeholder.com/400x200';
  
  // Format end date
  const endDate = validity_period?.end_date ? 
    format(new Date(validity_period.end_date), 'd MMMM, yyyy', { locale: vi }) : '';
  
  // Format discount display
  const discountDisplay = discount_unit === 'percentage' ? 
    `${discount_value}%` : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(discount_value);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white font-bold px-4 py-2 rounded-bl-lg">
          -{discountDisplay}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3">
          {description}
        </p>
        
        {validity_period && (
          <div className="text-sm text-gray-500 mb-4">
            <p>Có hiệu lực đến: {endDate}</p>
          </div>
        )}
        
        <Link 
          to={`/promotions/${_id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 mt-auto"
        >
          Khám phá ngay
        </Link>
      </div>
    </div>
  );
};

export default PromotionCard;
