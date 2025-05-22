import React from 'react';
import { Link } from 'react-router-dom';

const DESTINATIONS = [
  {
    name: 'Phú Quốc',
    slug: 'phu-quoc',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/13/phuquoc_show_ebkmxx_.webp',
    count: 733,
    colSpan: 2,
    rowSpan: 1
  },
  {
    name: 'Vũng Tàu',
    slug: 'vung-tau',
    image: 'https://cdn1.ivivu.com/images/2025/04/21/14/vungtau_show_mnw3ej_.webp',
    count: 619,
    colSpan: 1,
    rowSpan: 2
  },
  {
    name: 'Đà Lạt',
    slug: 'da-lat',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/10/dalat_show_2ancd3_.webp',
    count: 924,
    colSpan: 1,
    rowSpan: 1
  },
  {
    name: 'Quy Nhơn',
    slug: 'quy-nhon',
    image: 'https://cdn1.ivivu.com/images/2025/04/18/11/quynhon_show_bymdwj_.webp',
    count: 293,
    colSpan: 1,
    rowSpan: 1
  },
  {
    name: 'Nha Trang',
    slug: 'nha-trang',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/11/nhatrang_show_su3sb3_.webp',
    count: 875,
    colSpan: 1,
    rowSpan: 2
  },
  {
    name: 'Đà Nẵng',
    slug: 'da-nang',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/11/danang_show_2lamnx_.webp',
    count: 1146,
    colSpan: 2,
    rowSpan: 1
  },
  {
    name: 'Phan Thiết',
    slug: 'phan-thiet',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/11/phanthiet_show_wrdctj_.webp',
    count: 311,
    colSpan: 1,
    rowSpan: 1
  },
  {
    name: 'Phú Yên',
    slug: 'phu-yen',
    image: 'https://cdn1.ivivu.com/images/2025/04/16/11/phuyen_show_vtndp3_.webp',
    count: 15,
    colSpan: 1,
    rowSpan: 1
  }
];

const DestinationGrid = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Điểm đến yêu thích trong nước</h2>
        <p className="text-gray-500 mb-8">Lên rừng xuống biển. Trọn vẹn Việt Nam</p>
        <div className="grid grid-cols-3 grid-rows-4 gap-2 xs:gap-4">
          {DESTINATIONS.map((d, idx) => (
            <Link
              to={`/destinations/${d.slug}`}
              key={d.slug}
              className={`relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 border border-gray-100
                ${d.colSpan ? `col-span-${d.colSpan}` : ''} ${d.rowSpan ? `row-span-${d.rowSpan}` : ''}`}
              style={{ minHeight: 120, height: '100%' }}
            >
              <img
                src={d.image}
                alt={d.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>
              <div className="absolute left-0 bottom-0 p-4 z-20">
                <h3 className="text-white text-lg md:text-xl font-bold drop-shadow mb-1">{d.name}</h3>
                <p className="text-white/90 text-sm font-medium drop-shadow">{d.count} khách sạn</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationGrid; 