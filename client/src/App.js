import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import Notification from './components/ui/Notification';
import ResetPasswordPage from './pages/ResetPasswordPage';
import HotelDetailPage from './pages/HotelDetailPage';
import ScrollToTop from './components/layout/ScrollToTop';
import FilterPage from './pages/FilterPage';

function AppContent() {
  const location = useLocation();
  const isResetPassword = location.pathname.startsWith('/reset-password/');

  return (
    <>
      {!isResetPassword && <Header />}
      <Notification />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/homestays/:id" element={<HotelDetailPage />} />
          <Route path="/search" element={<FilterPage />} />
        </Routes>
      </main>
      {!isResetPassword && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}

export default App;
