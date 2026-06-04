import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminNotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-[#1a1c22] text-white font-mono p-10">
      <h1 className="text-7xl font-black text-[#c778dd] mb-6">404</h1>
      <h2 className="text-2xl font-bold mb-4">Admin Page Not Found</h2>
     
      
      <button 
        onClick={() => navigate('/admin/dashboard')}
        className="px-6 py-3 bg-[#c778dd] text-black font-bold rounded hover:bg-white transition-all duration-300"
      >
        go to Admin Deshboard page
      </button>
    </div>
  );
}