import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroRequest } from '../../Slice/heroSlice';

import profileImg from '../../assets/Image.png';
import geometryLogo from '../../assets/Logo.png';
import dotsPattern from '../../assets/Dots.png';

export default function Hero() {
  const dispatch = useDispatch();
  const { data: profileData, loading } = useSelector((state) => state.hero);

  useEffect(() => {
    dispatch(fetchHeroRequest());
  }, [dispatch]);

  if (loading) {
    return (
      <section id="home" className="min-h-[80vh] flex items-center justify-center text-gray-400">
        Loading Hero Data...
      </section>
    );
  }

  return (
    <section id="home" className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative mb-24 pt-20">
      <div className="space-y-6 z-10">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {profileData?.hero_title || "Elias is a web designer and front-end developer"}
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
          {profileData?.hero_desc || "He crafts responsive websites where technologies meet creativity"}
        </p>
        <button 
          onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
          className="border border-[#c778dd] text-white px-6 py-3 text-sm hover:bg-[#c778dd]/10 transition-all font-medium cursor-pointer"
        >
          Contact me !!
        </button>
      </div>

      <div className="relative flex flex-col items-center justify-center select-none">
        <img src={geometryLogo} alt="Geometry" className="absolute top-0 left-0 w-40 h-40 opacity-20 pointer-events-none" />
        <img src={dotsPattern} alt="Dots" className="absolute bottom-10 right-0 w-24 h-24 opacity-40 pointer-events-none" />
        
        <div className="relative w-full max-w-[400px] z-10">
          <div className="absolute inset-0 bg-[#c778dd]/20 blur-3xl rounded-full"></div>
          <img src={profileImg} alt="Profile" className="relative w-full h-auto object-contain z-10 drop-shadow-2xl" />
        </div>

        <div className="border border-gray-600 bg-[#1e2227]/80 backdrop-blur-sm px-6 py-3 mt-4 w-full max-w-[360px] flex items-center gap-3 text-sm text-gray-300 z-30">
          <span className="w-3 h-3 bg-[#c778dd] rounded-full animate-ping inline-block"></span>
          <p className="font-medium">
            {profileData?.work_status || "Currently available for freelance work"}
          </p>
        </div>
      </div>
    </section>
  );
}