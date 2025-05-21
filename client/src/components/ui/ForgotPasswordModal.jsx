import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const ForgotPasswordModal = ({ show, onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  if (!show) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError('Vui lòng nhập địa chỉ email hợp lệ!');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/users/forgotpassword', { email });
      setSuccess('Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn!');
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: { type: 'success', message: data.message || 'Đã gửi email đặt lại mật khẩu.' },
      });
      setEmail('');
    } catch (err) {
      setError(err.response?.data?.message || 'Không gửi được email. Vui lòng thử lại!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 animate-fadeIn" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl animate-modalIn bg-[#232b4a] border border-[#232b4a] p-8">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-[#FFB85C]/20 text-gray-400 hover:text-[#FFB85C] transition-colors text-xl shadow z-10">×</button>
        <h2 className="text-2xl font-bold text-[#FFB85C] mb-2 text-center">Quên mật khẩu</h2>
        <p className="text-gray-300 text-center mb-6">Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full px-3 py-2 border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none mb-4"
            placeholder="Nhập email..."
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error && <div className="mb-2 text-red-400 text-sm">{error}</div>}
          {success && <div className="mb-2 text-green-400 text-sm">{success}</div>}
          <button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all mt-2">
            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
