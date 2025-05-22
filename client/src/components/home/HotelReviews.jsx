import React from 'react';

const sampleReviews = [
  {
    name: 'Nguyễn Văn A',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    content: 'Phòng sạch sẽ, view đẹp, nhân viên thân thiện. Sẽ quay lại!',
    date: '2024-06-01'
  },
  {
    name: 'Trần Thị B',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    content: 'Vị trí thuận tiện, bữa sáng ngon, giá hợp lý.',
    date: '2024-05-20'
  },
  {
    name: 'Lê Quốc C',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 5,
    content: 'Không gian yên tĩnh, phù hợp nghỉ dưỡng cuối tuần.',
    date: '2024-04-15'
  }
];

const HotelReviews = () => {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Đánh giá khách hàng</h2>
      <div className="flex flex-col gap-6">
        {sampleReviews.map((r, idx) => (
          <div key={idx} className="flex gap-4 bg-white rounded-xl shadow p-4 border border-gray-100">
            <img src={r.avatar} alt={r.name} className="w-14 h-14 rounded-full object-cover border-2 border-blue-200" />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-800">{r.name}</span>
                <span className="text-yellow-400">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                <span className="text-xs text-gray-400 ml-2">{new Date(r.date).toLocaleDateString('vi-VN')}</span>
              </div>
              <div className="text-gray-700 text-sm">{r.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelReviews; 