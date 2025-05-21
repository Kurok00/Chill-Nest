import React, { useState, useRef } from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

const OtpModal = ({ email, user_name, onSubmit, onClose, onResend, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Xử lý nhập từng ô
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;
    const newOtp = [...otp];
    newOtp[idx] = val[val.length - 1];
    setOtp(newOtp);
    if (idx < 5 && val) inputRefs.current[idx + 1].focus();
  };
  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };
  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('Text').replace(/\D/g, '').slice(0, 6).split('');
    if (pasted.length) {
      const newOtp = [...otp];
      pasted.forEach((num, i) => { if (i < 6) newOtp[i] = num; });
      setOtp(newOtp);
      if (pasted.length === 6) inputRefs.current[5].focus();
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join(''));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn" onClick={e => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl animate-modalIn flex flex-col bg-[#1b2340] border border-[#232b4a]" style={{ minHeight: 420 }}>
        <div className="flex flex-col items-center justify-center p-8 relative">
          <img src="/logo192.png" alt="ChillNest" className="w-14 h-14 mb-2 drop-shadow-xl" />
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(255,184,92,0.7)] tracking-wide mb-2" style={{textShadow: '0 2px 8px #000, 0 0 2px #FFB85C'}}>Xác thực OTP</h2>
          <p className="text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-4 text-center">Nhập mã OTP đã gửi đến email của bạn để hoàn tất đăng ký</p>
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="flex space-x-2 mb-4" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => inputRefs.current[idx] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 text-2xl text-center border-2 border-[#FFB85C] rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none font-bold"
                  value={digit}
                  onChange={e => handleChange(e, idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  autoFocus={idx === 0}
                  aria-label={`OTP số ${idx + 1}`}
                />
              ))}
            </div>
            {error && <div className="mb-2 text-[#FFB85C] text-sm">{error}</div>}
            <button type="submit" className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all mb-2">
              Xác nhận
            </button>
            <button type="button" onClick={onResend} className="text-sm text-[#FFB85C] hover:text-yellow-500 font-semibold mt-1">
              Gửi lại mã OTP
            </button>
          </form>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-[#FFB85C]/20 text-gray-400 hover:text-[#FFB85C] transition-colors text-xl shadow z-10">
          <FaTimes />
        </button>
        <style>{`
          .animate-fadeIn { animation: fadeIn .3s; }
          .animate-modalIn { animation: modalIn .4s cubic-bezier(.4,2,.6,1); }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes modalIn { from { transform: scale(.92) translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
        `}</style>
      </div>
    </div>
  );
};

export default OtpModal;
