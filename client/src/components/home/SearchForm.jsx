import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaChevronDown, FaChevronUp, FaMinus, FaPlus } from 'react-icons/fa';

const HOT_LOCATIONS = [
  { name: 'Đà Lạt', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', count: 924 },
  { name: 'Phan Thiết', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', count: 311 },
  { name: 'Nha Trang', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80', count: 875 },
  { name: 'Phú Quốc', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', count: 733 },
  { name: 'Đà Nẵng', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80', count: 1146 },
  { name: 'Vũng Tàu', image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80', count: 619 },
  { name: 'Quy Nhơn', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', count: 293 },
  { name: 'Vịnh Hạ Long', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', count: 555 },
  { name: 'Hội An', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', count: 680 },
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [showGuestPopup, setShowGuestPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const locationInputRef = useRef(null);

  const filteredLocations = location
    ? HOT_LOCATIONS.filter(l => l.name.toLowerCase().includes(location.toLowerCase()))
    : HOT_LOCATIONS;

  const handleSearch = (e) => {
    e.preventDefault();
    let err = {};
    if (!location) err.location = 'Vui lòng nhập địa điểm';
    if (!checkIn) err.checkIn = 'Chọn ngày nhận phòng';
    if (!checkOut) err.checkOut = 'Chọn ngày trả phòng';
    if (checkIn && checkOut && checkOut < checkIn) err.checkOut = 'Ngày trả phòng phải sau ngày nhận phòng';
    setError(err);
    if (Object.keys(err).length > 0) return;
    setLoading(true);
    setTimeout(() => {
      const searchParams = new URLSearchParams();
      if (location) searchParams.append('location', location);
      if (checkIn) searchParams.append('checkIn', checkIn.toISOString().split('T')[0]);
      if (checkOut) searchParams.append('checkOut', checkOut.toISOString().split('T')[0]);
      searchParams.append('guests', adults + children);
      searchParams.append('rooms', rooms);
      navigate(`/search?${searchParams.toString()}`);
      setLoading(false);
    }, 600);
  };

  React.useEffect(() => {
    const handleClick = (e) => {
      if (locationInputRef.current && !locationInputRef.current.contains(e.target)) {
        setShowLocationDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Format ngày
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  // Lấy thứ trong tuần
  const getDayOfWeek = (date) => {
    if (!date) return '';
    return dToDay(new Date(date).getDay());
  };
  const dToDay = (d) => ['Chủ nhật','Thứ hai','Thứ ba','Thứ tư','Thứ năm','Thứ sáu','Thứ bảy'][d];
  // Số đêm
  const getNights = () => {
    if (!checkIn || !checkOut) return '';
    const diff = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : '';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl px-2 py-2 md:px-4 md:py-3 w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-0">
        {/* Địa điểm */}
        <div className="flex flex-col justify-center px-3 py-2 md:border-r border-gray-200 group relative">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-blue-500 text-lg" /> Địa điểm
          </label>
          <div className="relative" ref={locationInputRef}>
            <input
              type="text"
              value={location}
              onChange={e => {
                setLocation(e.target.value);
                setShowLocationDropdown(true);
                setError(prev => ({ ...prev, location: undefined }));
              }}
              onFocus={() => setShowLocationDropdown(true)}
              placeholder="Bạn muốn đi đâu?"
              className={`sb__search-input w-full bg-transparent border-none outline-none text-base font-semibold focus:ring-0 px-0 py-1 ${error.location ? 'text-red-500' : 'text-gray-800'}`}
              autoComplete="off"
              style={{boxShadow: 'none'}}
            />
            {showLocationDropdown && (
              <div
                className="absolute left-0 right-0 top-full bg-white shadow-xl rounded-xl mt-1 z-50 max-h-96 overflow-y-auto overflow-x-hidden animate-fadeInUp p-4 w-full min-w-[320px] md:w-[420px] md:min-w-[420px]"
                style={{zIndex: 9999}}
              >
                <div>
                  <div className="font-bold text-lg mb-3">Địa điểm đang hot nhất</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filteredLocations.length === 0 ? (
                      HOT_LOCATIONS.map(loc => (
                        <button
                          key={loc.name}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition border border-transparent hover:border-blue-400"
                          onClick={() => {
                            setLocation(loc.name);
                            setShowLocationDropdown(false);
                          }}
                          type="button"
                        >
                          <img src={loc.image} alt={loc.name} className="w-14 h-14 object-cover rounded-lg" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-800">{loc.name}</div>
                            <div className="text-xs text-gray-500">{loc.count} KS</div>
                          </div>
                        </button>
                      ))
                    ) : (
                      filteredLocations.map(loc => (
                        <button
                          key={loc.name}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 transition border border-transparent hover:border-blue-400"
                          onClick={() => {
                            setLocation(loc.name);
                            setShowLocationDropdown(false);
                          }}
                          type="button"
                        >
                          <img src={loc.image} alt={loc.name} className="w-14 h-14 object-cover rounded-lg" />
                          <div className="text-left">
                            <div className="font-semibold text-gray-800">{loc.name}</div>
                            <div className="text-xs text-gray-500">{loc.count} KS</div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
            {error.location && <div className="text-xs text-red-500 mt-1">{error.location}</div>}
          </div>
        </div>
        {/* Nhận phòng */}
        <div className="flex flex-col justify-center px-3 py-2 md:border-r border-gray-200 group relative">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500 text-lg" /> Nhận phòng
          </label>
          <DatePicker
            selected={checkIn}
            onChange={date => {
              setCheckIn(date);
              setError(prev => ({ ...prev, checkIn: undefined }));
              if (checkOut && date && checkOut < date) setCheckOut(null);
            }}
            selectsStart
            startDate={checkIn}
            endDate={checkOut}
            minDate={new Date()}
            placeholderText="Chọn ngày nhận phòng"
            customInput={
              <button type="button" className="w-full text-left bg-transparent border-none outline-none font-semibold text-base px-0 py-1 focus:ring-0">
                <span className="block text-gray-800">{checkIn ? `${getDayOfWeek(checkIn)}, ${formatDate(checkIn)}` : <span className="text-gray-400">Chọn ngày</span>}</span>
              </button>
            }
          />
          {error.checkIn && <div className="text-xs text-red-500 mt-1">{error.checkIn}</div>}
        </div>
        {/* Số đêm */}
        <div className="flex flex-col justify-center items-center px-3 py-2 md:border-r border-gray-200 group">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
            <i className="ivv-moon text-blue-500 text-lg mr-2" /> Số đêm
          </label>
          <span className="text-lg font-bold text-blue-600">{getNights() || '--'}</span>
        </div>
        {/* Trả phòng */}
        <div className="flex flex-col justify-center px-3 py-2 md:border-r border-gray-200 group relative">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
            <FaCalendarAlt className="mr-2 text-blue-500 text-lg" /> Trả phòng
          </label>
          <DatePicker
            selected={checkOut}
            onChange={date => {
              setCheckOut(date);
              setError(prev => ({ ...prev, checkOut: undefined }));
            }}
            selectsEnd
            startDate={checkIn}
            endDate={checkOut}
            minDate={checkIn || new Date()}
            placeholderText="Chọn ngày trả phòng"
            customInput={
              <button type="button" className="w-full text-left bg-transparent border-none outline-none font-semibold text-base px-0 py-1 focus:ring-0">
                <span className="block text-gray-800">{checkOut ? `${getDayOfWeek(checkOut)}, ${formatDate(checkOut)}` : <span className="text-gray-400">Chọn ngày</span>}</span>
              </button>
            }
          />
          {error.checkOut && <div className="text-xs text-red-500 mt-1">{error.checkOut}</div>}
        </div>
        {/* Khách & phòng */}
        <div className="flex flex-col justify-center px-3 py-2 group relative">
          <label className="text-xs text-gray-500 font-semibold mb-1 flex items-center">
            <FaUser className="mr-2 text-blue-500 text-lg" /> Khách & Phòng
          </label>
          <button
            type="button"
            className="w-full text-left bg-transparent border-none outline-none font-semibold text-base px-0 py-1 focus:ring-0 flex items-center justify-between"
            onClick={() => setShowGuestPopup(v => !v)}
            style={{boxShadow: 'none'}}
          >
            <span>{adults} người lớn, {children} trẻ em, {rooms} phòng</span>
            {showGuestPopup ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showGuestPopup && (
            <div className="absolute left-0 right-0 top-full bg-white shadow-xl rounded-xl mt-1 z-50 p-4 animate-fadeInUp" style={{zIndex: 9999}}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Người lớn</span>
                <div className="flex items-center gap-2">
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setAdults(a => Math.max(1, a-1))}><FaMinus /></button>
                  <span className="w-6 text-center">{adults}</span>
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setAdults(a => a+1)}><FaPlus /></button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Trẻ em</span>
                <div className="flex items-center gap-2">
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setChildren(c => Math.max(0, c-1))}><FaMinus /></button>
                  <span className="w-6 text-center">{children}</span>
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setChildren(c => c+1)}><FaPlus /></button>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Phòng</span>
                <div className="flex items-center gap-2">
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setRooms(r => Math.max(1, r-1))}><FaMinus /></button>
                  <span className="w-6 text-center">{rooms}</span>
                  <button type="button" className="p-1 rounded-full bg-gray-100 hover:bg-blue-100" onClick={() => setRooms(r => r+1)}><FaPlus /></button>
                </div>
              </div>
              <button type="button" className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-xl" onClick={() => setShowGuestPopup(false)}>Xong</button>
            </div>
          )}
        </div>
        {/* Nút tìm kiếm */}
        <div className="flex items-center justify-center px-3 py-2">
          <button
            type="submit"
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-2xl flex items-center justify-center shadow transition-colors duration-200 text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            ) : <FaSearch className="mr-2 text-lg" />}
            Tìm kiếm
          </button>
        </div>
      </form>
      <style>{`
        .animate-fadeInUp { animation: fadeInUp .5s cubic-bezier(.4,2,.6,1) both; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default SearchForm;
