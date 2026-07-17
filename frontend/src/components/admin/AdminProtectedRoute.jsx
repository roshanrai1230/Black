import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/admin/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok && data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          // Token expired or invalid on backend
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error("Auth server unreachable, checking local token fallback", err);
        // Fallback: If token exists locally, allow access to prevent development lockouts
        setIsAuthenticated(true);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030303] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-t-[#4f46e5] border-white/10 animate-spin"></div>
          <span className="text-[#888] text-xs font-semibold uppercase tracking-wider">Verifying Admin Session...</span>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
