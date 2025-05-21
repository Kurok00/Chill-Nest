import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.notification);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (notification && notification.message) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        dispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!showNotification || !notification || !notification.message) {
    return null;
  }

  // Always use white background, orange text, orange border/icon for notification
  // Main: bg-white, Orange: #f97316 (rgb(249 115 22))
  let bgColor = 'bg-white border-[#f97316] text-[#f97316]';
  let iconColor = '#f97316';
  let borderColor = '#f97316';
  if (notification.type === 'error') {
    borderColor = '#ef4444'; // red-500
    bgColor = 'bg-white border-[#ef4444] text-[#f97316]';
    iconColor = '#ef4444';
  }

  return (
    <div
      className={`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] px-6 py-4 rounded-2xl border-2 shadow-2xl max-w-lg min-w-[320px] flex items-center gap-4 animate-fadeSlideIn ${bgColor}`}
      role="alert"
      style={{
        animation: 'fadeSlideIn .5s cubic-bezier(.4,2,.6,1)',
        borderColor: borderColor,
        background: '#fff',
      }}
    >
      <div className="flex-shrink-0">
        <svg className="h-8 w-8 drop-shadow-xl" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          {notification.type === 'success' && (
            <path fill={iconColor} d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.5-5.5l-3-3 1.41-1.41L8.5 9.67l4.59-4.59L14.5 7l-6 6z" />
          )}
          {notification.type === 'error' && (
            <path fill={iconColor} d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V5z" />
          )}
          {notification.type === 'warning' && (
            <path fill={iconColor} d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V5z" />
          )}
          {(!notification.type || notification.type === 'info') && (
            <path fill={iconColor} d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V5z" />
          )}
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-bold text-lg mb-1 tracking-wide drop-shadow-sm" style={{color: '#f97316'}}>{notification.title || 'Thông báo'}</p>
        <p className="text-base font-medium drop-shadow-sm" style={{color: '#f97316'}}>{notification.message}</p>
      </div>
      <button
        onClick={() => {
          setShowNotification(false);
          dispatch({ type: 'CLEAR_NOTIFICATION' });
        }}
        className="ml-2 p-1 rounded-full hover:bg-[#f973161a] transition-colors"
        aria-label="Đóng thông báo"
      >
        <svg className="h-6 w-6" fill="none" stroke="#f97316" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(-40px) scale(.95) translateX(-50%); }
          to { opacity: 1; transform: translateY(0) scale(1) translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Notification;
