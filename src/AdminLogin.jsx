import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from './adminSlice/adminloginslice';
import { supabase } from './supabaseClient'; // अपनी supabase क्लाइंट फ़ाइल इम्पोर्ट करें

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { loading, error, user } = useSelector((state) => state.adminlogin);

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin/dashboard', { replace: true });
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#1a1c22] font-mono">
      <form onSubmit={handleLogin} className="bg-[#282c33] p-10 rounded-lg border border-gray-700 w-96 shadow-2xl">
        <h2 className="text-2xl font-bold text-[#c778dd] mb-6 text-center">ADMIN ACCESS</h2>
        
        {error && <p className="text-red-500 text-xs mb-4 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-2">Email Address</label>
          <input 
            type="email" 
            className="w-full bg-gray-800 p-3 border border-gray-600 rounded text-white outline-none focus:border-[#c778dd]" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-2">Password</label>
          <input 
            type="password" 
            className="w-full bg-gray-800 p-3 border border-gray-600 rounded text-white outline-none focus:border-[#c778dd]" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button 
          disabled={loading} 
          className="w-full bg-[#c778dd] text-black font-bold py-3 rounded hover:bg-white transition-all"
        >
          {loading ? 'AUTHENTICATING...' : 'LOGIN TO DASHBOARD'}
        </button>
      </form>
    </div>
  );
}