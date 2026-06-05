import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExperienceRequest } from '../../Slice/experienceSlice';
import { FaMapMarkerAlt, FaBriefcase, FaLaptopHouse, FaCalendarAlt } from 'react-icons/fa';

export default function ExperienceSection() {
  const dispatch = useDispatch();
  const { data: expData, loading } = useSelector((state) => state.experience);

  useEffect(() => { dispatch(fetchExperienceRequest()); }, [dispatch]);

  const sortedExperience = [...expData].sort((a, b) => new Date(b.start_date) - new Date(a.start_date));

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;

  return (
    <section id="experience" className="mt-20 max-w-5xl mx-auto px-6">
      <h2 className="text-2xl font-bold text-white mb-10"><span className="text-[#c778dd]">#</span>experience</h2>
      
      <div className="space-y-12">
        {sortedExperience.map((exp) => {
          const isPresent = !exp.end_date; // Agar end_date nahi hai toh 'Present'
          
          return (
            <div key={exp.id} className={`relative pl-8 border-l-2 ${isPresent ? 'border-[#c778dd]' : 'border-gray-600'}`}>
              {/* Timeline Dot */}
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${isPresent ? 'bg-[#c778dd] shadow-[0_0_10px_#c778dd]' : 'bg-gray-600'}`}></div>
              
              <div className="bg-[#1e2227] p-6 border border-gray-700 rounded-lg hover:border-[#c778dd] transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <p className="text-[#c778dd] font-medium">{exp.company}</p>
                  </div>
                </div>

                {/* Data with Icons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#c778dd]" /> {exp.start_date} - {exp.end_date || "Present"}</span>
                  <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-[#c778dd]" /> {exp.location}</span>
                  <span className="flex items-center gap-2"><FaBriefcase className="text-[#c778dd]" /> {exp.type}</span>
                  <span className="flex items-center gap-2"><FaLaptopHouse className="text-[#c778dd]" /> {exp.work_mode}</span>
                </div>

                <p className="text-gray-400 text-sm mb-4 border-t border-gray-700 pt-4">{exp.responsibilities}</p>
                
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(exp.skills) ? exp.skills : (exp.skills || "").split(',')).map((skill, idx) => (
                    <span key={idx} className="text-[10px] text-gray-300 bg-gray-800 px-2 py-1 rounded">{skill.trim()}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}