import React from 'react';

const amenityIcons = {
  wifi: '📶',
  parking: '🅿️',
  pool: '🏊',
  spa: '💆',
  gym: '🏋️',
  restaurant: '🍽️',
  bar: '🍸',
  beach_access: '🏖️',
  breakfast: '🥐',
  mountain_view: '⛰️',
};

const HotelAmenities = ({ amenities = [] }) => {
  if (!amenities.length) return null;
  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-blue-700">Tiện nghi nổi bật</h2>
      <div className="flex flex-wrap gap-3">
        {amenities.map((a, idx) => (
          <span key={idx} className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-gray-700 text-sm">
            <span>{amenityIcons[a] || '✔️'}</span> {a.replace('_', ' ')}
          </span>
        ))}
      </div>
    </div>
  );
};

export default HotelAmenities; 