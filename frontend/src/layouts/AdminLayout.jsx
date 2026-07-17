import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

const AdminLayout = () => {
  return (
    <div className="flex h-screen w-full bg-[#030303] text-slate-100 font-sans overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <AdminHeader />
        
        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
          
          {/* Admin Footer */}
          <footer className="w-full max-w-[1600px] mx-auto px-8 py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-[#666]">
            <p>© 2025 Nexora Technologies. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <span className="w-px h-3 bg-white/10"></span>
              <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
