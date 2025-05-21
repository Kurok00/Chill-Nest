import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser } from 'react-icons/fa';

const SearchForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  
  const handleSearch = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    
    if (location) searchParams.append('location', location);
    if (checkIn) searchParams.append('checkIn', checkIn.toISOString().split('T')[0]);
    if (checkOut) searchParams.append('checkOut', checkOut.toISOString().split('T')[0]);
    if (guests) searchParams.append('guests', guests);
    
    navigate(`/search?${searchParams.toString()}`);
  };
  
  return (
    <div className="relative w-full max-w-3xl mx-auto -mt-16 z-20">
      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow-xl px-6 py-4 flex flex-col md:flex-row items-center gap-4 md:gap-0 md:divide-x divide-gray-200"
      >
        {/* Location */}
        <div className="flex-1 flex flex-col items-start md:items-stretch md:pr-6">
          <label className="text-xs font-semibold text-gray-600 mb-1 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500 text-lg" />
            Địa điểm
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Thành phố, khách sạn, địa điểm..."
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {/* Check-in */}
        <div className="flex-1 flex flex-col items-start md:items-stretch md:px-6">
          <label className="text-xs font-semibold text-gray-600 mb-1 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500 text-lg" />
            Nhận phòng
          </label>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Chọn ngày nhận phòng"
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {/* Check-out */}
        <div className="flex-1 flex flex-col items-start md:items-stretch md:px-6">
          <label className="text-xs font-semibold text-gray-600 mb-1 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500 text-lg" />
            Trả phòng
          </label>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="Chọn ngày trả phòng"
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
        {/* Guests */}
        <div className="flex-1 flex flex-col items-start md:items-stretch md:px-6">
          <label className="text-xs font-semibold text-gray-600 mb-1 flex items-center">
            <FaUser className="mr-2 text-blue-500 text-lg" />
            Khách
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num} khách</option>
            ))}
          </select>
        </div>
        {/* Search Button */}
        <div className="flex items-end md:pl-6 w-full md:w-auto mt-2 md:mt-0">
          <button
            type="submit"
            className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-8 rounded-xl flex items-center justify-center shadow transition-colors duration-200 text-base"
          >
            <FaSearch className="mr-2 text-lg" />
            Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
