import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkillsRequest } from '../../Slice/skillsSlice';
import dotsPattern from '../../assets/Dots.png';
import geometryLogo from '../../assets/Logo.png';

export default function SkillsSection() {
  const dispatch = useDispatch();
  const { data: profileData, loading } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchSkillsRequest());
  }, [dispatch]);

  const SkillBox = ({ title, skills }) => (
    <div className="border border-gray-600 h-fit">
      <div className="border-b border-gray-600 p-2 font-semibold text-sm">{title}</div>
      <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2">
        {Array.isArray(skills) ? (
          skills.map((skill, idx) => (
            <span key={idx} className="border border-gray-700 px-1.5 py-0.5 bg-gray-800/30 rounded">
              {skill}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No skills listed</span>
        )}
      </div>
    </div>
  );

  if (loading) return <p className="text-gray-400 text-center">Loading skills...</p>;

  return (
    <section id="skills" className="mt-28 max-w-6xl mx-auto px-8 font-mono bg-[#282c33] text-white">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-wider"><span className="text-[#c778dd]">#</span>skills</h2>
        <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="hidden md:grid lg:col-span-5 grid-cols-2 gap-y-16 gap-x-8 relative pt-4 opacity-70 select-none">
          <div className="w-16 h-16 opacity-50"><img src={dotsPattern} alt="Dots" /></div>
          <div className="w-24 h-24 border border-gray-600 justify-self-end mt-4"></div>
          <div className="w-28 h-28 -mt-6"><img src={geometryLogo} alt="Logo" /></div>
          <div className="w-16 h-16 opacity-50 self-end -ml-12"><img src={dotsPattern} alt="Dots" /></div>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <SkillBox title="Languages" skills={profileData?.skills_languages} />
          <SkillBox title="Databases" skills={profileData?.skills_databases} />
          <div className="sm:row-span-2">
             <SkillBox title="Tools" skills={profileData?.skills_tools} />
          </div>
          <SkillBox title="Other" skills={profileData?.skills_other} />
          <SkillBox title="Frameworks" skills={profileData?.skills_frameworks} />
        </div>
      </div>
    </section>
  );
}