import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-[#1a1c22] text-white">
    
      <aside className="w-64 bg-[#282c33] p-6 border-r border-gray-700 flex flex-col">
        <h1 className="text-xl font-bold mb-8 text-[#c778dd]">ADMIN PANEL</h1>
        <nav className="flex flex-col gap-2 flex-grow">
          {['Dashboard', 'Projects', 'About', 'Skills','Experience','Contacts','Footer','Feedback','Blog'].map((item) => (
            <NavLink 
              key={item} 
              to={`/admin/${item.toLowerCase()}`}
              className={({ isActive }) => 
                `p-3 rounded transition-all ${isActive ? 'bg-[#c778dd] text-black font-bold' : 'hover:bg-gray-700'}`
              }
            >
              {item}
            </NavLink>
          ))}
        </nav>
        
       
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300 font-bold mt-auto text-left">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header with Avatar */}
        <header className="h-16 border-b border-gray-700 flex justify-end items-center px-10 bg-[#282c33]">
          <div className="flex items-center gap-3">
            <span className="text-sm">Admin</span>
            <img 
              src="https://your-image-url.com/avatar.jpg" 
              alt="Admin Avatar"
              className="w-10 h-10 rounded-full border border-[#c778dd] object-cover"
            />
          </div>
        </header>

        {/* Content */}
        <div className="p-10 overflow-y-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}