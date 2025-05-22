// Sample data for development
export const featuredProperties = [
  {
    _id: "prop1",
    name: "Vinpearl Resort & Spa Nha Trang",
    description: "Khu nghỉ dưỡng 5 sao với tầm nhìn biển tuyệt đẹp",
    property_type: "resort",
    location: {
      address: {
        street: "Đảo Hòn Tre",
        district: "Vĩnh Nguyên",
        city: "Nha Trang",
        province: "Khánh Hòa",
        country: "Vietnam"
      },
      coordinates: {
        latitude: 12.2152,
        longitude: 109.1947
      }
    },
    images: [
      {
        url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-600",
        caption: "Bể bơi vô cực",
        is_main: true
      }
    ],
    price_range: {
      min: 2500000,
      max: 8000000
    },
    star_rating: 5,
    amenities: ["wifi", "parking", "pool", "spa", "gym", "restaurant", "bar", "beach_access"],
    ratings: {
      average: 4.7,
      cleanliness: 4.8,
      accuracy: 4.6,
      location: 4.9,
      value: 4.5,
      checkin: 4.7
    },
    review_count: 845,
    is_featured: true,
    is_verified: true,
    detail: "Vinpearl Resort & Spa Nha Trang là khu nghỉ dưỡng 5 sao đẳng cấp quốc tế, tọa lạc trên đảo Hòn Tre với bãi biển riêng tuyệt đẹp. Khuôn viên rộng lớn, nhiều tiện ích giải trí, nhà hàng sang trọng và dịch vụ spa cao cấp.",
    policies: "Nhận phòng từ 14:00, trả phòng trước 12:00. Không hút thuốc trong phòng. Không mang thú cưng. Trẻ em dưới 6 tuổi miễn phí.",
    extra_amenities: ["Xe đưa đón sân bay miễn phí", "Dịch vụ giặt là", "Phòng gym 24/7", "Khu vui chơi trẻ em"],
    gallery: [
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-800", caption: "Toàn cảnh Vinpearl Resort & Spa Nha Trang", type: "exterior" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Lối vào chính sang trọng", type: "lobby" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Hồ bơi ngoài trời tuyệt đẹp", type: "pool" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Nhà hàng buffet sáng", type: "restaurant" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Phòng Deluxe Double view biển", type: "room", roomType: "Deluxe Double Room" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Phòng Family Suite rộng rãi", type: "room", roomType: "Family Suite" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Khu vui chơi trẻ em", type: "facility" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Spa cao cấp", type: "spa" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Phòng gym hiện đại", type: "gym" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Ban công hướng biển", type: "room", roomType: "Deluxe Double Room" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Phòng tắm sang trọng", type: "room", roomType: "Family Suite" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Khuôn viên xanh mát", type: "exterior" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Quầy bar cạnh hồ bơi", type: "bar" },
      { url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400", caption: "Sảnh chờ sang trọng", type: "lobby" },
    ],
    rooms: [
      {
        name: "Deluxe Double Room",
        description: "Phòng rộng rãi, view biển, 1 giường đôi lớn.",
        price: 1800000,
        amenities: ["wifi", "air_conditioning", "tv", "minibar", "balcony"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400"
        ],
        max_guests: 2,
        available: 3
      },
      {
        name: "Family Suite",
        description: "Phòng suite cho gia đình, 2 phòng ngủ, view biển.",
        price: 3500000,
        amenities: ["wifi", "air_conditioning", "tv", "minibar", "balcony", "bathtub"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-400"
        ],
        max_guests: 4,
        available: 2
      }
    ]
  },
  {
    _id: "prop2",
    name: "Mai Châu Hideaway Homestay",
    description: "Homestay yên bình giữa thung lũng Mai Châu",
    property_type: "homestay",
    location: {
      address: {
        street: "Bản Lác",
        district: "Mai Châu",
        city: "Hòa Bình",
        province: "Hòa Bình",
        country: "Vietnam"
      }
    },
    images: [
      {
        url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200871912-592258729faec3c08e23d4f7c8c0da07.png?tr=q-75,w-600",
        caption: "Cảnh quan từ ban công",
        is_main: true
      }
    ],
    price_range: {
      min: 600000,
      max: 1200000
    },
    star_rating: 0,
    amenities: ["wifi", "parking", "breakfast", "mountain_view"],
    ratings: {
      average: 4.6,
      cleanliness: 4.4,
      accuracy: 4.7,
      location: 4.9,
      value: 4.8,
      checkin: 4.5
    },
    review_count: 213,
    is_featured: true,
    is_verified: true,
    detail: "Mai Châu Hideaway Homestay nằm giữa thung lũng xanh mát, không gian yên tĩnh, gần gũi thiên nhiên. Phù hợp nghỉ dưỡng, trải nghiệm văn hóa bản địa.",
    policies: "Nhận phòng từ 13:00, trả phòng trước 11:00. Không hút thuốc trong phòng. Hỗ trợ đặt tour tham quan bản làng.",
    extra_amenities: ["Thuê xe đạp miễn phí", "Bếp chung cho khách", "BBQ ngoài trời"],
    rooms: [
      {
        name: "Standard Room",
        description: "Phòng tiêu chuẩn, view núi, 1 giường đôi.",
        price: 700000,
        amenities: ["wifi", "mountain_view", "breakfast"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200871912-592258729faec3c08e23d4f7c8c0da07.png?tr=q-75,w-400"
        ],
        max_guests: 2,
        available: 5
      },
      {
        name: "Family Bungalow",
        description: "Bungalow cho gia đình, 2 giường đôi, gần hồ bơi.",
        price: 1200000,
        amenities: ["wifi", "breakfast", "pool"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200871912-592258729faec3c08e23d4f7c8c0da07.png?tr=q-75,w-400"
        ],
        max_guests: 4,
        available: 1
      }
    ]
  },
  {
    _id: "prop3",
    name: "InterContinental Danang",
    description: "Khu nghỉ dưỡng sang trọng với thiết kế độc đáo",
    property_type: "hotel",
    location: {
      address: {
        district: "Sơn Trà",
        city: "Đà Nẵng",
        province: "Đà Nẵng"
      }
    },
    images: [
      {
        url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201226378-8affc1dfeeafe879121fc94652a7332f.png?tr=q-75,w-600",
        caption: "Hồ bơi vô cực",
        is_main: true
      }
    ],
    price_range: {
      min: 6000000,
      max: 30000000
    },
    star_rating: 5,
    ratings: {
      average: 4.9
    },
    review_count: 612,
    is_featured: true,
    detail: "InterContinental Danang là khu nghỉ dưỡng sang trọng với thiết kế độc đáo, hòa mình vào thiên nhiên bán đảo Sơn Trà. Có nhiều nhà hàng, bar, hồ bơi vô cực.",
    policies: "Nhận phòng từ 15:00, trả phòng trước 12:00. Không hút thuốc trong phòng. Có thể mang thú cưng nhỏ (có phụ phí).", 
    extra_amenities: ["Spa cao cấp", "Dịch vụ xe điện nội khu", "Lớp yoga buổi sáng"],
    rooms: [
      {
        name: "Premier Ocean View",
        description: "Phòng cao cấp, view biển, ban công riêng.",
        price: 6500000,
        amenities: ["wifi", "air_conditioning", "tv", "balcony", "bathtub"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201226378-8affc1dfeeafe879121fc94652a7332f.png?tr=q-75,w-400"
        ],
        max_guests: 2,
        available: 2
      }
    ]
  },
  {
    _id: "prop4",
    name: "Homestay Hội An Riverside",
    description: "Homestay ven sông yên bình tại Hội An",
    property_type: "homestay",
    location: {
      address: {
        district: "Cẩm Thanh",
        city: "Hội An",
        province: "Quảng Nam"
      }
    },
    images: [
      {
        url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201184025-b629781230030dbfc28bcbfb127286f6.png?tr=q-75,w-600",
        is_main: true
      }
    ],
    price_range: {
      min: 800000,
      max: 1500000
    },
    star_rating: 0,
    ratings: {
      average: 4.8
    },
    review_count: 143,
    is_featured: true,
    detail: "Homestay ven sông yên bình, không gian mở, gần trung tâm phố cổ Hội An. Phù hợp nhóm bạn, gia đình nhỏ.",
    policies: "Nhận phòng từ 12:00, trả phòng trước 11:00. Không tổ chức tiệc lớn sau 22:00.",
    extra_amenities: ["Thuyền kayak miễn phí", "Sân vườn BBQ", "Dịch vụ thuê xe máy"],
    rooms: [
      {
        name: "Riverside Room",
        description: "Phòng hướng sông, 1 giường đôi, yên tĩnh.",
        price: 900000,
        amenities: ["wifi", "breakfast", "mountain_view"],
        images: [
          "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201184025-b629781230030dbfc28bcbfb127286f6.png?tr=q-75,w-400"
        ],
        max_guests: 2,
        available: 2
      }
    ]
  }
];

export const popularLocations = [
  {
    id: "loc1",
    city: "Đà Lạt",
    province: "Lâm Đồng",
    image_url: "https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200776552-f852b752ae88e7e0902fb0d3bfc41a00.png?tr=q-75,w-600",
    property_count: 324
  },
  {
    id: "loc2",
    city: "Hội An",
    province: "Quảng Nam",
    image_url: "https://vnn-imgs-a1.vgcloud.vn/icdn.dantri.com.vn/2021/05/08/hoi-an-docx-1620446751420.jpeg",
    property_count: 217
  },
  {
    id: "loc3",
    city: "Nha Trang",
    province: "Khánh Hòa",
    image_url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f6/nha-trang.jpg?w=700&h=500&s=1",
    property_count: 412
  },
  {
    id: "loc4",
    city: "Phú Quốc",
    province: "Kiên Giang",
    image_url: "https://a.cdn-hotels.com/gdcs/production48/d867/1be9a391-5ae9-4d27-8164-99ecf026f3e9.jpg",
    property_count: 278
  }
];

export const latestBlogs = [
  {
    _id: "blog1",
    title: "Top 10 Homestay Đẹp Nhất Đà Lạt Cho Chuyến Du Lịch Hoàn Hảo",
    slug: "top-10-homestay-dep-nhat-da-lat",
    summary: "Khám phá những homestay view đẹp, giá tốt và được ưa chuộng nhất tại thành phố ngàn hoa Đà Lạt",
    featured_image: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-600",
    author: {
      user_name: "Minh Anh",
      profile_image: "https://i.imgur.com/qwfGlpK.jpg"
    },
    categories: ["Homestay", "Đà Lạt"],
    published_at: "2023-05-15T07:00:00Z",
    views: 2543
  },
  {
    _id: "blog2",
    title: "Kinh Nghiệm Du Lịch Tự Túc Hội An 3 Ngày 2 Đêm",
    slug: "kinh-nghiem-du-lich-tu-tuc-hoi-an",
    summary: "Hướng dẫn chi tiết lịch trình, chỗ ở và kinh nghiệm du lịch Hội An tiết kiệm nhất",
    featured_image: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200871912-592258729faec3c08e23d4f7c8c0da07.png?tr=q-75,w-600",
    author: {
      user_name: "Travel Expert",
      profile_image: "https://i.imgur.com/8uYeREX.jpg"
    },
    categories: ["Hướng dẫn", "Hội An"],
    published_at: "2023-06-02T10:15:00Z",
    views: 1876
  },
  {
    _id: "blog3",
    title: "Review 5 Resort Sang Chảnh Nhất Phú Quốc 2023",
    slug: "review-5-resort-sang-chanh-nhat-phu-quoc",
    summary: "Điểm danh những resort đẳng cấp 5 sao tại đảo ngọc Phú Quốc cho kỳ nghỉ đáng nhớ",
    featured_image: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201226378-8affc1dfeeafe879121fc94652a7332f.png?tr=q-75,w-600",
    author: {
      user_name: "Luxe Travel",
      profile_image: "https://i.imgur.com/YxXpAdT.jpg"
    },
    categories: ["Resort", "Phú Quốc"],
    published_at: "2023-06-20T08:30:00Z",
    views: 3210
  },
  {
    _id: "blog4",
    title: "Ăn Gì, Chơi Gì Khi Du Lịch Nha Trang?",
    slug: "an-gi-choi-gi-khi-du-lich-nha-trang",
    summary: "Tổng hợp những địa điểm ăn uống, tham quan không thể bỏ qua khi đến Nha Trang",
    featured_image: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201184025-b629781230030dbfc28bcbfb127286f6.png?tr=q-75,w-600",
    author: {
      user_name: "Foodie Traveler",
      profile_image: "https://i.imgur.com/ZqS9fZA.jpg"
    },
    categories: ["Ẩm thực", "Nha Trang"],
    published_at: "2023-07-10T09:45:00Z",
    views: 1520
  }
];

export const currentPromotions = [
  {
    _id: "promo1",
    name: "Hè Rực Rỡ - Giảm Đến 30% Khi Đặt Phòng Khách Sạn",
    description: "Áp dụng cho đặt phòng từ 15/6 đến 15/8/2023 tại các khách sạn và resort cao cấp",
    discount_value: 30,
    discount_unit: "percentage",
    validity_period: {
      start_date: "2023-06-15T00:00:00Z",
      end_date: "2023-08-15T23:59:59Z"
    },
    applicable_properties: [
      {
        images: [
          {
            url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200921330-784c7f0f6798fdb7c3b14d23881d5090.jpeg?tr=q-75,w-600"
          }
        ]
      }
    ]
  },
  {
    _id: "promo2",
    name: "Trải Nghiệm Homestay - Giảm 200,000đ",
    description: "Ưu đãi đặc biệt cho homestay tại các điểm du lịch hot nhất hè này",
    discount_value: 200000,
    discount_unit: "amount",
    validity_period: {
      start_date: "2023-07-01T00:00:00Z",
      end_date: "2023-09-30T23:59:59Z"
    },
    applicable_properties: [
      {
        images: [
          {
            url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517200871912-592258729faec3c08e23d4f7c8c0da07.png?tr=q-75,w-600"
          }
        ]
      }
    ]
  },
  {
    _id: "promo3",
    name: "Đặt Sớm - Tiết Kiệm 25% Cho Kỳ Nghỉ Lễ",
    description: "Đặt phòng trước 30 ngày cho các dịp lễ, nhận ngay ưu đãi lớn",
    discount_value: 25,
    discount_unit: "percentage",
    validity_period: {
      start_date: "2023-07-15T00:00:00Z",
      end_date: "2023-12-31T23:59:59Z"
    },
    applicable_properties: [
      {
        images: [
          {
            url: "https://ik.imagekit.io/tvlk/image/imageResource/2018/01/29/1517201184025-b629781230030dbfc28bcbfb127286f6.png?tr=q-75,w-600"
          }
        ]
      }
    ]
  }
];
