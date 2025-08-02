import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import PropertyManagement from '../../components/admin/PropertyManagement';
import RoomManagement from '../../components/admin/RoomManagement';
import AmenityManagement from '../../components/admin/AmenityManagement';
import LocationManagement from '../../components/admin/LocationManagement';

const AdminPropertiesPage = () => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 bg-gray-900">
        <AdminHeader />
        <div className="max-w-6xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-white">Quản lý khách sạn, phòng, tiện ích, địa điểm</h1>
          <div className="mb-8">
            <PropertyManagement />
          </div>
          <div className="mb-8">
            <RoomManagement />
          </div>
          <div className="mb-8">
            <AmenityManagement />
          </div>
          <div className="mb-8">
            <LocationManagement />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertiesPage; 