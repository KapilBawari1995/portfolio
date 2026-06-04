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


  const skillCategories = [
    { title: "Languages", skills: profileData?.skills_languages },
    { title: "Databases", skills: profileData?.skills_databases },
    { title: "Tools", skills: profileData?.skills_tools },
    { title: "Other", skills: profileData?.skills_other },
    { title: "Frameworks", skills: profileData?.skills_frameworks },
  ].filter(cat => Array.isArray(cat.skills) && cat.skills.length > 0);

  const SkillBox = ({ title, skills }) => (
    <div className="border border-gray-600 h-fit w-full">
      <div className="border-b border-gray-600 p-2 font-semibold text-sm">{title}</div>
      <div className="p-2 text-xs text-gray-400 flex flex-wrap gap-2">
        {skills.map((skill, idx) => (
          <span key={idx} className="border border-gray-600 px-1.5 py-0.5 bg-gray-800/30 rounded">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  if (loading) return <p className="text-gray-400 text-center">Loading skills...</p>;

  return (
    
    <section id="skills" className="mt-12 md:mt-28 max-w-6xl mx-auto px-4 md:px-8 font-mono text-white">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wider">
          <span className="text-[#c778dd]">#</span>skills
        </h2>
        <div className="h-[1px] bg-[#c778dd] w-full max-w-[250px] hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
   
        <div className="hidden lg:grid lg:col-span-5 grid-cols-2 gap-y-16 gap-x-8 relative pt-4 opacity-70">
          <div className="w-16 h-16 opacity-50"><img src={dotsPattern} alt="Dots" /></div>
          <div className="w-24 h-24 border border-gray-600 justify-self-end mt-4"></div>
          <div className="w-28 h-28 -mt-6"><img src={geometryLogo} alt="Logo" /></div>
          <div className="w-16 h-16 opacity-50 self-end -ml-12"><img src={dotsPattern} alt="Dots" /></div>
        </div>

     
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {skillCategories.length > 0 ? (
            skillCategories.map((cat, idx) => (
              <SkillBox key={idx} title={cat.title} skills={cat.skills} />
            ))
          ) : (
            <p className="text-gray-500">No skills available.</p>
          )}
        </div>
      </div>
    </section>
  );
}