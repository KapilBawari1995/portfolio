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
    <section id="home" className="min-h-[80vh] grid grid-cols-1   
    lg:grid-cols-2 gap-8 lg:gap-12 items-center relative lg:mb-24  lg:px-6 max-w-6xl mx-auto md:px-0">
      {/* Text Section */}
      <div className="space-y-6 z-10 text-center lg:text-left order-2 lg:order-1">
        <h1 className="lg:text-5xl text-2xl font-bold leading-tight">
          {profileData?.hero_title || "kapil is a web Softeware  and front-end developer"}
        </h1>
        <p className="text-gray-400 text-base md:text-xl leading-relaxed">
          {profileData?.hero_desc || "He crafts responsive websites where technologies meet creativity"}
        </p>
        <button 
          onClick={() => document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })}
          className="border border-[#c778dd] text-white px-6 py-3 text-sm hover:bg-[#c778dd]/10 transition-all font-medium cursor-pointer"
        >
          Contact me !!
        </button>
      </div>

      {/* Image Section */}
      <div className="relative flex flex-col items-center justify-center select-none order-1 lg:order-2 mt-10 lg:mt-0">
       
        <img src={geometryLogo} alt="Geometry" className="absolute top-0 right-10 lg:left-0 w-24 h-24 md:w-32 md:h-32 opacity-20 pointer-events-none" />
        <img src={dotsPattern} alt="Dots" className="absolute bottom-5 right-5 w-16 h-16 md:w-20 md:h-20 opacity-40 pointer-events-none" />
        
        <div className="relative w-full max-w-[300px] md:max-w-[400px] z-10">
          <div className="absolute inset-0 bg-[#c778dd]/20 blur-3xl rounded-full"></div>
          <img src={profileImg} alt="Profile" className="relative w-full h-auto object-contain z-10 drop-shadow-2xl" />
        </div>
        <div className="border border-gray-600 bg-[#1e2227]/80 backdrop-blur-sm px-4 py-2 mt-6 w-full max-w-[300px] md:max-w-[360px] flex items-center justify-center gap-3 text-xs md:text-sm text-gray-300 z-30">
          <span className="w-3 h-3 bg-[#c778dd] rounded-full animate-ping inline-block"></span>
          <p className="font-medium">
            {profileData?.work_status || "Currently available for freelance work"}
          </p>
        </div>
      </div>
    </section>
  );
}