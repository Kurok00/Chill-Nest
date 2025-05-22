import React, { useState } from 'react';

const FILTERS = [
  { label: 'Tất cả', value: '' },
  { label: 'Giải trí', value: 'entertainment' },
  { label: 'Ăn uống', value: 'restaurant' },
  { label: 'Dịch vụ', value: 'hospital' },
  { label: 'Giao thông', value: 'station' },
  { label: 'Khác', value: 'other' },
];

const NEARBY_PLACES = [
  { name: 'Bui Thi Xuan Street', type: 'road', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726698277-52a042c6eb44f739e2bdb404b5011588.png?tr=h-24,q-75,w-24', distance: 35, unit: 'm' },
  { name: 'Nguyen Van Troi Street Da Lat', type: 'road', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726698277-52a042c6eb44f739e2bdb404b5011588.png?tr=h-24,q-75,w-24', distance: 345, unit: 'm' },
  { name: 'Lam Dong General Hospital', type: 'hospital', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726707694-57b53327c608dfa2b911fc17cc5a6a2a.png?tr=h-24,q-75,w-24', distance: 977, unit: 'm', desc: 'Public Service' },
  { name: 'Dalat Train Station', type: 'station', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726738977-de00890e4808408d5f0a539173b4cb48.png?tr=h-24,q-75,w-24', distance: 1.67, unit: 'km', desc: 'Transportation Hub' },
];

const POPULAR_PLACES = [
  { name: 'Dalat Train Station', type: 'station', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726738977-de00890e4808408d5f0a539173b4cb48.png?tr=h-24,q-75,w-24', distance: 1.67, unit: 'km', group: 'Transportation Hub' },
  { name: 'Da Lat Market', type: 'market', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726726363-44a43118fd320526eea2f316e6346818.png?tr=h-24,q-75,w-24', distance: 377, unit: 'm', group: 'Entertainment/Attraction' },
  { name: 'Dalat University', type: 'university', icon: 'https://ik.imagekit.io/tvlk/image/imageResource/2020/02/03/1580726698277-52a042c6eb44f739e2bdb404b5011588.png?tr=h-24,q-75,w-24', distance: 1.09, unit: 'km', group: 'Others' },
];

const MAP_IMG = 'https://maps.googleapis.com/maps/api/staticmap?center=11.9458564,108.4395725&zoom=15&size=400x200&markers=color:blue%7C11.9458564,108.4395725&key=AIzaSyDDvRZqtRfcu2gynuJTpE2ODnR-3p6bWfk';

const NearbyPlacesBlock = () => {
  const [filter, setFilter] = useState('');
  // Lọc theo type
  const filteredNearby = filter ? NEARBY_PLACES.filter(p => p.type === filter) : NEARBY_PLACES;
  const filteredPopular = filter ? POPULAR_PLACES.filter(p => p.type === filter) : POPULAR_PLACES;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 mt-8">
      <h2 className="text-xl md:text-2xl font-bold text-blue-700 mb-3">Địa điểm xung quanh</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTERS.map(f => (
          <button key={f.value} onClick={() => setFilter(f.value)}
            className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${filter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}>{f.label}</button>
        ))}
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Map + Nearby */}
        <div className="md:w-1/2 flex flex-col gap-3">
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-2">
            <img src={MAP_IMG} alt="map" className="w-full h-40 object-cover" />
          </div>
          <div className="text-gray-600 text-sm flex items-center gap-2 mb-2">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="#687176" d="M21 10C21 7.25554 20.0331 4.98482 18.3787 3.40236C16.7312 1.8265 14.4725 1 12 1C9.52754 1 7.26876 1.8265 5.62128 3.40236C3.96688 4.98482 3 7.25554 3 10C3 13.4069 5.24119 16.5278 7.2718 18.6854C8.31023 19.7887 9.34524 20.694 10.1194 21.323C10.5073 21.6381 10.8316 21.8855 11.0609 22.0554C11.0795 22.0692 11.0982 22.0831 11.1169 22.0971C11.3805 22.2937 11.6567 22.4998 12 22.4998C12.3432 22.4999 12.6194 22.2938 12.8829 22.0972C12.9017 22.0832 12.9205 22.0692 12.9391 22.0554C13.1684 21.8855 13.4927 21.6381 13.8806 21.323C14.6548 20.694 15.6898 19.7887 16.7282 18.6854C18.7588 16.5278 21 13.4069 21 10ZM15.5 9.5C15.5 11.433 13.933 13 12 13C10.067 13 8.5 11.433 8.5 9.5C8.5 7.567 10.067 6 12 6C13.933 6 15.5 7.567 15.5 9.5Z"/></svg>
            83 Bui Thi Xuan, Ward 2, Da Lat, Lam Dong
          </div>
          <h3 className="font-semibold text-blue-700 mb-2">Nearby Places</h3>
          <ul className="space-y-2">
            {filteredNearby.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <img src={p.icon} alt="" className="w-6 h-6" />
                <span className="font-semibold text-gray-800">{p.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{p.distance} {p.unit}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Popular */}
        <div className="md:w-1/2 flex flex-col gap-3">
          <h3 className="font-semibold text-blue-700 mb-2">Popular in the Area</h3>
          <ul className="space-y-2">
            {filteredPopular.map((p, i) => (
              <li key={i} className="flex items-center gap-2">
                <img src={p.icon} alt="" className="w-6 h-6" />
                <span className="font-semibold text-gray-800">{p.name}</span>
                <span className="text-xs text-gray-500 ml-auto">{p.distance} {p.unit}</span>
                <span className="text-xs text-gray-400 ml-2">{p.group}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
        <svg width="16" height="16" fill="none" viewBox="0 0 12 12"><circle cx="6" cy="6" r="6" fill="#0194f3"/><path fill="#fff" d="M5.75 2.75C5.33579 2.75 5 3.08579 5 3.5V4C5 4.41421 5.33579 4.75 5.75 4.75H6.25C6.66421 4.75 7 4.41421 7 4V3.5C7 3.08579 6.66421 2.75 6.25 2.75H5.75ZM6.75 6.5C6.75 6.08579 6.41421 5.75 6 5.75C5.58579 5.75 5.25 6.08579 5.25 6.5V8.5C5.25 8.91421 5.58579 9.25 6 9.25C6.41421 9.25 6.75 8.91421 6.75 8.5V6.5Z"/></svg>
        Distances shown are based on straight line distances. Actual travel distances may vary.
      </div>
    </div>
  );
};

export default NearbyPlacesBlock; 