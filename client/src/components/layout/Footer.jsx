import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Về ChillNest</h3>
            <p className="text-gray-300 mb-4">
              ChillNest là nền tảng đặt phòng khách sạn và homestay hàng đầu Việt Nam, kết nối du khách với những chỗ ở tuyệt vời nhất.
            </p>            <div className="flex space-x-4">
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" className="text-white hover:text-blue-400">
                <FaFacebookF />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" className="text-white hover:text-blue-400">
                <FaTwitter />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" className="text-white hover:text-blue-400">
                <FaInstagram />
              </a>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#!" className="text-white hover:text-blue-400">
                <FaYoutube />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">Giới thiệu</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Liên hệ</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white">Chính sách bảo mật</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white">Câu hỏi thường gặp</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-400 mt-1 mr-3" />
                <span className="text-gray-300">123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center">
                <FaPhoneAlt className="text-blue-400 mr-3" />
                <span className="text-gray-300">+84 28 1234 5678</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-blue-400 mr-3" />
                <span className="text-gray-300">contact@chillnest.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-300 mb-4">
              Nhận thông tin ưu đãi và cập nhật mới nhất từ chúng tôi.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Email của bạn" 
                className="px-4 py-2 w-full text-gray-800 rounded-l focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r"
              >
                Đăng ký
              </button>
            </form>
          </div>
        </div>
        
        <hr className="border-gray-700 my-8" />
        
        <div className="text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ChillNest. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
