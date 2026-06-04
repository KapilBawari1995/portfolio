import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileRequest } from '../../Slice/profileSlice';
import dotsPattern from '../../assets/Dots.png';
import profileImg from '../../assets/Image.png';

export default function AboutSection() {
  const dispatch = useDispatch();
  const { data: profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  return (

    <section id="about-me" className="mt-12 md:mt-28 max-w-6xl mx-auto px-4 md:px-8 font-mono text-white">
      
      {/* Header */}
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wider">
          <span className="text-[#c778dd]">#</span>about-me
        </h2>
        <div className="h-[1px] bg-[#c778dd] w-full max-w-[250px] hidden sm:block"></div>
      </div>

  
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
        
       
        <div className="md:col-span-7 space-y-6 text-center md:text-left order-2 md:order-1">
          <p className="text-sm md:text-base text-gray-200 leading-relaxed">
            {profileData?.about_p1 || "Hello! I am a passionate developer..."}
          </p>
          <p className="text-sm md:text-base text-gray-400 leading-relaxed">
            {profileData?.about_p2 || "Transforming my creativity and knowledge into websites..."}
          </p>

          <div className="pt-4 flex justify-center md:justify-start">
            {profileData?.cv_url && (
              <a
                href={profileData.cv_url}
                download="My_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="border border-[#c778dd] text-white px-6 py-3 text-sm hover:bg-[#c778dd]/10 transition-all font-medium flex items-center gap-2"
              >
                Read more <span className="text-lg">→</span>
              </a>
            )}
          </div>
        </div>

     
        <div className="md:col-span-5 relative flex justify-center items-center select-none order-1 md:order-2">
         
          <img src={dotsPattern} alt="Dots" className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 opacity-40 pointer-events-none z-0" />
          
          <div className="relative z-10 w-full max-w-[280px] md:max-w-[320px]">
            <img src={profileImg} alt="Profile" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}