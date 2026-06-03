import React, { useEffect } from 'react'; // 1. useEffect import karein
import { useSelector, useDispatch } from 'react-redux'; // 2. useDispatch import karein
import { fetchProfileRequest } from '../../Slice/profileSlice'; // 3. Action import karein
import dotsPattern from '../../assets/Dots.png';
import profileImg from '../../assets/Image.png';

export default function AboutSection() {
  const dispatch = useDispatch(); // 4. Hook initialize karein
  const { data: profileData } = useSelector((state) => state.profile);

  // 5. Component mount hote hi data fetch karein
  useEffect(() => {
    dispatch(fetchProfileRequest());
  }, [dispatch]);

  return (
    <section id="about-me" className="mt-28 max-w-6xl mx-auto px-8 font-mono bg-[#282c33] text-white">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-wider">
          <span className="text-[#c778dd]">#</span>about-me
        </h2>
        <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7 space-y-8 z-10">
          <p className="text-base text-gray-200">
            {profileData?.about_p1 || "Hello! I am a passionate developer..."}
          </p>
          <div className="space-y-6 text-sm md:text-base text-gray-400 leading-relaxed">
            <p>{profileData?.about_p2 || "Transforming my creativity and knowledge into websites..."}</p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">

            {profileData?.cv_url && (
              <a
                href={profileData.cv_url}
                download="My_Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className="border border-white text-white px-4 py-2 text-sm hover:bg-white hover:text-[#282c33] transition-all font-medium flex items-center gap-2"
              >
                Download CV <span className="text-sm">↓</span>
              </a>
            )}
          </div>
        </div>

        <div className="md:col-span-5 relative flex justify-center items-center select-none mt-12 md:mt-0">
          <img src={dotsPattern} alt="Dots" className="absolute top-12 left-4 w-16 h-16 opacity-40 pointer-events-none z-0" />
          <div className="relative z-10 w-full max-w-[320px]">
            <img src={profileImg} alt="Profile" className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}