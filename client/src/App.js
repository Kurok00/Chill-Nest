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
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminRegisterPage from './pages/admin/AdminRegisterPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isResetPassword = location.pathname.startsWith('/reset-password/');
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isResetPassword && !isAdminPage && <Header />}
      <Notification />
      <main className="min-h-screen">
        <Routes>
          {/* Trang khách */}
          <Route path="/" element={<HomePage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/hotels/:id" element={<HotelDetailPage />} />
          <Route path="/homestays/:id" element={<HotelDetailPage />} />
          <Route path="/search" element={<FilterPage />} />
          
          {/* Trang admin */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/register" element={<AdminRegisterPage />} />
          <Route path="/admin/dashboard" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/properties" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/bookings" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/reports" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          } />
          <Route path="/admin" element={<AdminLoginPage />} />
        </Routes>
      </main>
      {!isResetPassword && !isAdminPage && <Footer />}
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
