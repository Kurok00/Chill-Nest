import React, { useState } from 'react';

const HotelGallery = ({ images = [], name, gallery = [] }) => {
  // Nếu có gallery thì ưu tiên gallery, fallback sang images
  const allImages = gallery.length ? gallery : (images.map(img => ({ url: img.url, caption: img.caption || name, type: 'default' })));
  const [showModal, setShowModal] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  // Hiển thị 1 ảnh lớn + 5 ảnh nhỏ
  const mainImg = allImages[0];
  const smallImgs = allImages.slice(1, 6);

  const handleOpenModal = (idx) => {
    setActiveIdx(idx);
    setShowModal(true);
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-2 mb-2">
        <div className="col-span-2 row-span-2 relative cursor-pointer" onClick={() => handleOpenModal(0)}>
          <img src={mainImg.url} alt={mainImg.caption} className="w-full h-60 md:h-72 object-cover rounded-xl shadow" />
          <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">{mainImg.caption}</span>
        </div>
        {smallImgs.map((img, idx) => (
          <div key={idx} className="relative cursor-pointer" onClick={() => handleOpenModal(idx + 1)}>
            <img src={img.url} alt={img.caption} className="w-full h-28 object-cover rounded-xl" />
            {idx === 4 && allImages.length > 6 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-xl cursor-pointer" onClick={() => handleOpenModal(5)}>
                <span className="text-white font-bold text-lg">+{allImages.length - 5} ảnh</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => handleOpenModal(0)} className="mt-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow text-blue-700 font-semibold hover:bg-blue-50">Xem tất cả ảnh</button>
      {showModal && (
        <GalleryModal images={allImages} activeIdx={activeIdx} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

// Modal gallery component
const GalleryModal = ({ images, activeIdx, onClose }) => {
  const [idx, setIdx] = useState(activeIdx);
  const [filter, setFilter] = useState('all');
  // Lấy các loại type
  const types = Array.from(new Set(images.map(img => img.type).filter(Boolean)));
  const roomTypes = Array.from(new Set(images.filter(img => img.type === 'room' && img.roomType).map(img => img.roomType)));
  // Filter ảnh
  let filtered = images;
  if (filter !== 'all') {
    if (types.includes(filter)) filtered = images.filter(img => img.type === filter);
    else if (roomTypes.includes(filter)) filtered = images.filter(img => img.roomType === filter);
  }
  // Đảm bảo idx hợp lệ
  const safeIdx = Math.max(0, Math.min(idx, filtered.length - 1));
  const current = filtered[safeIdx];

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center animate-fadeIn">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-4 relative flex flex-col">
        <button onClick={onClose} className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-red-400">×</button>
        <div className="flex flex-wrap gap-2 mb-4">
          <button onClick={() => { setFilter('all'); setIdx(0); }} className={`px-3 py-1 rounded-full text-sm font-semibold ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>Tất cả</button>
          {types.map(t => (
            <button key={t} onClick={() => { setFilter(t); setIdx(0); }} className={`px-3 py-1 rounded-full text-sm font-semibold ${filter === t ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{t === 'room' ? 'Phòng' : t.charAt(0).toUpperCase() + t.slice(1)}</button>
          ))}
          {roomTypes.length > 0 && roomTypes.map(rt => (
            <button key={rt} onClick={() => { setFilter(rt); setIdx(0); }} className={`px-3 py-1 rounded-full text-sm font-semibold ${filter === rt ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{rt}</button>
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full flex items-center justify-center">
            <button onClick={() => setIdx(i => Math.max(0, i - 1))} disabled={safeIdx === 0} className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/70 disabled:opacity-30">&#8592;</button>
            <img src={current.url} alt={current.caption} className="max-h-[60vh] rounded-xl object-contain mx-auto" />
            <button onClick={() => setIdx(i => Math.min(filtered.length - 1, i + 1))} disabled={safeIdx === filtered.length - 1} className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center text-2xl hover:bg-black/70 disabled:opacity-30">&#8594;</button>
          </div>
          <div className="mt-2 text-center text-gray-700 font-semibold">{current.caption}</div>
          <div className="flex flex-wrap gap-2 mt-4 max-h-32 overflow-y-auto justify-center">
            {filtered.map((img, i) => (
              <img key={i} src={img.url} alt={img.caption} className={`w-20 h-14 object-cover rounded cursor-pointer border-2 ${i === safeIdx ? 'border-blue-500' : 'border-transparent'}`} onClick={() => setIdx(i)} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .animate-fadeIn { animation: fadeIn .3s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default HotelGallery; 