import React, { useState } from 'react';

const amenityIcons = {
  wifi: '📶',
  air_conditioning: '❄️',
  tv: '📺',
  minibar: '🥤',
  balcony: '🌅',
  bathtub: '🛁',
  breakfast: '🥐',
  pool: '🏊',
  mountain_view: '⛰️',
};

const HotelRoomList = ({ rooms = [] }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleBook = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedRoom(null);
  };

  if (!rooms.length) return null;
  return (
    <div className="mt-2">
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-4">Các loại phòng</h2>
      <div className="flex flex-col gap-6">
        {rooms.map((room, idx) => (
          <div key={idx} className="flex flex-col md:flex-row bg-white rounded-2xl shadow-lg p-4 gap-4 border border-gray-100 hover:shadow-2xl hover:border-blue-200 transition-all duration-200">
            <img src={room.images[0]} alt={room.name} className="w-full md:w-56 h-40 object-cover rounded-xl border border-gray-200" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg md:text-xl font-bold text-blue-800">{room.name}</h3>
                  <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-xs font-semibold">Tối đa {room.max_guests} khách</span>
                </div>
                <div className="text-gray-600 text-sm mb-2">{room.description}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {room.amenities.map((a, i) => (
                    <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 text-xs">
                      <span>{amenityIcons[a] || '✔️'}</span> {a.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-2xl font-bold text-orange-500 drop-shadow">{room.price.toLocaleString()}₫/đêm</span>
                <button onClick={() => handleBook(room)} className="px-5 py-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] font-bold rounded-lg shadow hover:from-yellow-500 hover:to-orange-500 transition-all">Đặt phòng</button>
              </div>
              <div className="text-xs text-gray-400 mt-1">Còn lại: {room.available} phòng</div>
            </div>
          </div>
        ))}
      </div>
      {showModal && selectedRoom && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-400">×</button>
            <h3 className="text-xl font-bold text-blue-700 mb-2">Đặt phòng: {selectedRoom.name}</h3>
            <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-full h-40 object-cover rounded-xl mb-3" />
            <div className="text-gray-700 mb-2">{selectedRoom.description}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedRoom.amenities.map((a, i) => (
                <span key={i} className="flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-gray-700 text-xs">
                  <span>{amenityIcons[a] || '✔️'}</span> {a.replace('_', ' ')}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xl font-bold text-orange-500">{selectedRoom.price.toLocaleString()}₫/đêm</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Đặt ngay</button>
            </div>
            <div className="text-xs text-gray-400 mt-1">Còn lại: {selectedRoom.available} phòng</div>
            <button onClick={closeModal} className="mt-4 w-full py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-300 transition">Đóng</button>
          </div>
          <style>{`.animate-fadeIn { animation: fadeIn .3s; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
      )}
    </div>
  );
};

export default HotelRoomList; 