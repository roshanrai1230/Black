import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#030303] text-slate-100 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow flex flex-col items-center w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
