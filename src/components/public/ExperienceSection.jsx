import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperienceRequest } from '../../Slice/experienceSlice';

export default function ExperienceSection() {
  const dispatch = useDispatch();
  const { data: expData, loading } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(fetchExperienceRequest());
  }, [dispatch]);

 
  const sortedExperience = [...expData].sort((a, b) => {
    const aIsPresent = !a.end_date || a.end_date.toLowerCase() === 'present';
    const bIsPresent = !b.end_date || b.end_date.toLowerCase() === 'present';
    
    if (aIsPresent && !bIsPresent) return -1; 
    if (!aIsPresent && bIsPresent) return 1;
    return new Date(b.start_date) - new Date(a.start_date); 
  });

  if (loading) return <p className="text-gray-400 text-center">Loading experience...</p>;

  return (
    <section id="experience" className="mt-12 md:mt-28 max-w-6xl mx-auto lg:px-4 md:px-2">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wider text-white">
          <span className="text-[#c778dd]">#</span>experience
        </h2>
        <div className="h-[1px] bg-[#c778dd] w-full max-w-[250px] hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:gap-8 mt-6 md:mt-10">
        {sortedExperience.length > 0 ? (
          sortedExperience.map((exp) => {
            const isPresent = !exp.end_date || exp.end_date.toLowerCase() === 'present';
            
            return (
              <div key={exp.id} className={`relative pl-6 md:pl-8 border-l ${isPresent ? 'border-[#c778dd]' : 'border-gray-600'}`}>
                <div className={`absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full ${isPresent ? 'bg-[#c778dd] ring-4 ring-[#c778dd]/20' : 'bg-gray-600'}`}></div>
                
                <div className={`bg-[#1e2227] p-4 md:p-6 border ${isPresent ? 'border-[#c778dd]' : 'border-gray-700'} hover:border-[#c778dd] transition-all duration-300`}>
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] md:text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 border border-gray-700 w-fit">
                        {exp.start_date} - {exp.end_date || "Present"}
                      </span>
                     
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white">{exp.role}</h3>
                  </div>
                  
                  <p className="text-[#c778dd] text-sm md:text-base font-medium mb-3">
                    {exp.company} 
                  </p>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                    {exp.responsibilities}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills ? (
                      (Array.isArray(exp.skills) ? exp.skills : exp.skills.split(',')).map((skill, idx) => (
                        <span key={idx} className="text-[9px] md:text-[10px] uppercase tracking-widest text-[#c778dd] border border-[#c778dd]/30 px-2 py-1">
                          {skill.trim()}
                        </span>
                      ))
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 text-center">No experience records found.</p>
        )}
      </div>
    </section>
  );
}