import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileRequest } from '../../Slice/profileSlice'; 
import Navbar from '../public/Navbar';
import Footer from '../public/Footer';
import SideSocials from '../public/SideSocials';

export default function MainLayout() {
  const dispatch = useDispatch();
  const profileState = useSelector((state) => state.profile) || {};
  const profileData = profileState.data;
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#282c33] text-white font-mono selection:bg-[#c778dd] selection:text-black overflow-x-hidden">
      <Navbar />
      <SideSocials profileData={profileData} />
      <main className="max-w-6xl mx-auto px-8 pt-12 pb-24 relative">
        <Outlet />
      </main>
      <Footer profileData={profileData} />
    </div>
  );
}