import React from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import { useAuth } from '../../hooks/useAuth';

const AdminRoute: React.FC = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f0f0] flex items-center justify-center">
        <div className="border-4 border-black px-8 py-4 bg-yellow-300 shadow-[6px_6px_0_0_rgba(0,0,0,1)] animate-pulse">
          <span className="font-black uppercase text-xl tracking-tighter">Loading System...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={() => {}} />;
  }

  return <AdminDashboard onLogout={() => {}} />;
};

export default AdminRoute;
