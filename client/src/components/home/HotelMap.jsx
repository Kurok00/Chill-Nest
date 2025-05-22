import React from 'react';

const HotelMap = ({ location }) => {
  const lat = location?.coordinates?.latitude;
  const lng = location?.coordinates?.longitude;
  if (!lat || !lng) return <div className="text-gray-500">Không có thông tin bản đồ.</div>;
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&hl=vi&z=15&output=embed`;
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Vị trí trên bản đồ</h2>
      <div className="rounded-xl overflow-hidden shadow border border-gray-100">
        <iframe
          title="Google Map"
          src={mapSrc}
          width="100%"
          height="320"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default HotelMap; 