import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperienceRequest } from '../../Slice/experienceSlice';

export default function ExperienceSection() {
  const dispatch = useDispatch();
  const { data: expData, loading } = useSelector((state) => state.experience);

  useEffect(() => {
    dispatch(fetchExperienceRequest());
  }, [dispatch]);

  if (loading) return <p className="text-gray-400 text-center">Loading experience...</p>;

  return (
    <section id="experience" className="mt-28 max-w-6xl mx-auto px-8">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-wider text-white">
          <span className="text-[#c778dd]">#</span>experience
        </h2>
        <div className="h-[1px] bg-[#c778dd] w-32 md:w-64 hidden sm:block"></div>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-10">
        {expData.length > 0 ? (
          expData.map((exp) => (
            <div key={exp.id} className="relative pl-8 border-l border-[#c778dd]">
              <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-[#c778dd] rounded-full"></div>
              <div className="bg-[#1e2227] p-6 border border-gray-700 hover:border-[#c778dd] transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-1 border border-gray-700">
                    {exp.start_date} - {exp.end_date || "Present"}
                  </span>
                </div>
                <p className="text-[#c778dd] font-medium mb-3">{exp.company} | {exp.type}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{exp.responsibilities}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.skills ? (
                    (Array.isArray(exp.skills) ? exp.skills : exp.skills.split(',')).map((skill, idx) => (
                      <span key={idx} className="text-[10px] uppercase tracking-widest text-[#c778dd] border border-[#c778dd]/30 px-2 py-1">
                        {skill.trim()}
                      </span>
                    ))
                  ) : null}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No experience records found.</p>
        )}
      </div>
    </section>
  );
}