import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail } from '../actions/userActions';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(5);
  
  const userVerification = useSelector((state) => state.userVerification);
  const { loading, success, error } = userVerification;
  
  useEffect(() => {
    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, token]);
  
  // Countdown timer for redirect
  useEffect(() => {
    let timer;
    if (success && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [success, countdown]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-md">
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <h2 className="mt-6 text-center text-xl font-medium text-gray-900">
              Đang xác thực email của bạn...
            </h2>
          </div>
        ) : success ? (
          <div className="text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Xác thực email thành công!
            </h2>
            <p className="mt-2 text-gray-600">
              Tài khoản của bạn đã được xác thực. Bạn có thể đăng nhập ngay bây giờ.
            </p>
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đăng nhập ngay ({countdown})
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <FaTimesCircle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Xác thực thất bại
            </h2>
            <p className="mt-2 text-gray-600">
              {error || 'Đường dẫn xác thực không hợp lệ hoặc đã hết hạn.'}
            </p>
            <div className="mt-6 space-y-4">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đăng nhập
              </Link>
              <Link
                to="/register"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Đăng ký
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailVerificationPage;
