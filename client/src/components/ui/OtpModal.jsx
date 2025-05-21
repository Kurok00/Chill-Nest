import React, { useState, useRef, useEffect } from 'react';
import { FaCheckCircle, FaTimes, FaSpinner } from 'react-icons/fa';

const OtpModal = ({ email, user_name, onSubmit, onClose, onResend, error }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút = 600 giây
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [resendError, setResendError] = useState(null);
  const inputRefs = useRef([]);

  // Timer đếm ngược
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft]);
  
  // Reset resend success message after 5 seconds
  useEffect(() => {
    if (resendSuccess) {
      const timer = setTimeout(() => {
        setResendSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resendSuccess]);

  // Reset resend error message after 5 seconds
  useEffect(() => {
    if (resendError) {
      const timer = setTimeout(() => {
        setResendError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [resendError]);

  // Format thời gian
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Xử lý nhập từng ô
  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val && e.nativeEvent.inputType !== 'deleteContentBackward') return;
    
    const newOtp = [...otp];
    // Nếu là xóa thì làm trống ô hiện tại
    if (e.nativeEvent.inputType === 'deleteContentBackward') {
      newOtp[idx] = '';
    } else {
      newOtp[idx] = val[val.length - 1];
    }
    
    setOtp(newOtp);
    
    // Chỉ tự động focus vào ô tiếp theo khi nhập (không phải khi xóa)
    if (idx < 5 && val && e.nativeEvent.inputType !== 'deleteContentBackward') {
      inputRefs.current[idx + 1].focus();
    }
  };
  
  const handleKeyDown = (e, idx) => {
    switch (e.key) {
      case 'Backspace':
        // Xử lý phím Backspace
        if (!otp[idx] && idx > 0) {
          // Ô hiện tại trống, di chuyển focus về ô trước đó
          inputRefs.current[idx - 1].focus();
        } else {
          // Xóa giá trị hiện tại
          const newOtp = [...otp];
          newOtp[idx] = '';
          setOtp(newOtp);
        }
        break;
      
      case 'ArrowLeft':
        // Di chuyển sang ô bên trái
        if (idx > 0) {
          e.preventDefault();
          inputRefs.current[idx - 1].focus();
        }
        break;
      
      case 'ArrowRight':
        // Di chuyển sang ô bên phải
        if (idx < 5) {
          e.preventDefault();
          inputRefs.current[idx + 1].focus();
        }
        break;
      
      case 'Delete':
        // Xóa giá trị hiện tại
        const newOtp = [...otp];
        newOtp[idx] = '';
        setOtp(newOtp);
        break;
        
      default:
        // Nếu nhập một số, tự động điền vào ô hiện tại và di chuyển
        if (/^[0-9]$/.test(e.key)) {
          e.preventDefault();
          const newOtp = [...otp];
          newOtp[idx] = e.key;
          setOtp(newOtp);
          
          // Di chuyển đến ô tiếp theo
          if (idx < 5) {
            inputRefs.current[idx + 1].focus();
          }
        }
        break;
    }
  };
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedData = e.clipboardData.getData('Text');
    const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');
    
    if (digits.length) {
      // Create a new OTP array, preserving existing values
      const newOtp = [...otp];
      
      // Fill in pasted digits
      digits.forEach((digit, i) => {
        if (i < 6) newOtp[i] = digit;
      });
      
      setOtp(newOtp);
      
      // Focus on the appropriate input field
      if (digits.length < 6) {
        // If we didn't fill all fields, focus on the next empty one
        inputRefs.current[Math.min(digits.length, 5)].focus();
      } else {
        // If all fields are filled, focus on the last one
        inputRefs.current[5].focus();
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join(''));
  };
  
  const handleResendOtp = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setResendError(null);
    
    try {
      await onResend(email);
      // Reset timer
      setTimeLeft(600);
      setResendSuccess(true);
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      setResendError(error.response?.data?.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 animate-fadeIn" onClick={e => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl animate-modalIn flex flex-col bg-[#1b2340] border border-[#232b4a]" style={{ minHeight: 420 }}>
        <div className="flex flex-col items-center justify-center p-8 relative">
          <img src="/logo192.png" alt="ChillNest" className="w-14 h-14 mb-2 drop-shadow-xl" />
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_4px_16px_rgba(255,184,92,0.7)] tracking-wide mb-2" style={{textShadow: '0 2px 8px #000, 0 0 2px #FFB85C'}}>Xác thực OTP</h2>
          <p className="text-lg text-white font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] mb-2 text-center">Nhập mã OTP đã gửi đến email của bạn để hoàn tất đăng ký</p>
          
          <div className="text-sm text-gray-300 mb-4">
            <strong className="text-[#FFB85C]">{email}</strong>
            {timeLeft > 0 ? (
              <div className="mt-1 text-center">
                <span className="text-sm">Mã OTP hết hạn sau: </span>
                <span className={`font-bold ${timeLeft < 60 ? 'text-red-400' : 'text-[#FFB85C]'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            ) : (
              <div className="mt-1 text-center text-red-400">
                Mã OTP đã hết hạn. Vui lòng yêu cầu gửi lại mã.
              </div>
            )}
          </div>
          
          {resendSuccess && (
            <div className="mb-4 p-2 bg-[#1c3a29] border border-[#34d399] rounded-md text-green-400 text-sm font-medium flex items-center">
              <FaCheckCircle className="mr-2" /> Mã OTP mới đã được gửi đến email của bạn.
            </div>
          )}
          
          {resendError && (
            <div className="mb-4 p-2 bg-[#3a1c1c] border border-[#ff8c8c] rounded-md text-[#FFB85C] text-sm font-medium">
              <strong>Lỗi:</strong> {resendError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="flex space-x-2 mb-4" onPaste={handlePaste}>
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => inputRefs.current[idx] = el}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="one-time-code"
                  maxLength={1}
                  className={`w-12 h-12 text-2xl text-center border-2 ${error ? 'border-red-500' : 'border-[#FFB85C]'} rounded-lg bg-[#232b4a] text-white placeholder-yellow-200 focus:ring-2 focus:ring-[#FFB85C] focus:border-yellow-400 shadow-md transition-all outline-none font-bold`}
                  value={digit}
                  onChange={e => handleChange(e, idx)}
                  onKeyDown={e => handleKeyDown(e, idx)}
                  onFocus={e => e.target.select()} // Select all text on focus for easier editing
                  autoFocus={idx === 0}
                  aria-label={`OTP số ${idx + 1}`}
                />
              ))}
            </div>
            {error && <div className="mb-2 p-2 bg-[#3a1c1c] border border-[#ff8c8c] rounded-md text-[#FFB85C] text-sm font-medium">
              <strong>Lỗi:</strong> {error}
            </div>}
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-[#151c32] py-2 rounded-lg hover:from-yellow-500 hover:to-orange-500 font-extrabold text-lg shadow-lg transition-all mb-2"
              disabled={otp.some(digit => digit === '') || timeLeft <= 0}
            >
              Xác nhận
            </button>
            <button 
              type="button" 
              onClick={handleResendOtp} 
              disabled={isResending || timeLeft > 540} // Chỉ cho phép gửi lại sau 1 phút
              className={`text-sm ${isResending || timeLeft > 540 ? 'text-gray-500 cursor-not-allowed' : 'text-[#FFB85C] hover:text-yellow-500 cursor-pointer'} font-semibold mt-2 flex items-center justify-center`}
            >
              {isResending ? (
                <>
                  <FaSpinner className="animate-spin mr-2" /> Đang gửi...
                </>
              ) : timeLeft > 540 ? (
                `Gửi lại mã sau ${formatTime(timeLeft - 540)}`
              ) : (
                'Gửi lại mã OTP'
              )}
            </button>
          </form>
        </div>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-[#232b4a] hover:bg-[#FFB85C]/20 text-gray-400 hover:text-[#FFB85C] transition-colors text-xl shadow z-10"
          aria-label="Đóng"
        >
          <FaTimes />
        </button>
        <style>{`
          .animate-fadeIn { animation: fadeIn .3s; }
          .animate-modalIn { animation: modalIn .4s cubic-bezier(.4,2,.6,1); }
          .animate-spin { animation: spin 1s linear infinite; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes modalIn { from { transform: scale(.92) translateY(40px); opacity: 0; } to { transform: none; opacity: 1; } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </div>
  );
};

export default OtpModal;
