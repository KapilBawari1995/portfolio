import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminAddExperienceRequest, adminUpdateExperienceRequest } from '../../adminSlice/adminExperienceSlice';

export default function ExperienceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: allExperience, loading } = useSelector((state) => state.adminExperience);
  
  const [formData, setFormData] = useState({
    company: '', role: '', location: '', work_mode: 'Remote', 
    type: 'Full-time', skills: '', responsibilities: '', status: 'active',
    start_date: '', end_date: '', is_currently_working: false
  });

  useEffect(() => {
    if (id) {
      const item = allExperience.find(exp => exp.id == id);
      if (item) {
        setFormData({
          ...item,
          is_currently_working: !item.end_date // Agar end_date null hai, toh checkbox true
        });
      }
    }
  }, [id, allExperience]);

  const handleSubmit = () => {
    const payload = { ...formData };
    if (payload.is_currently_working) payload.end_date = null; // Currently working toh end_date null
    delete payload.is_currently_working;

    if (id) dispatch(adminUpdateExperienceRequest({ id, payload }));
    else dispatch(adminAddExperienceRequest(payload));
    
    navigate('/admin/experience');
  };

  return (
    <div className="bg-[#282c33] p-8 text-white max-w-3xl mx-auto rounded-lg border border-gray-700">
      <h2 className="text-3xl font-bold mb-6 text-[#c778dd]">{id ? 'Edit Experience' : 'Add New Experience'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input className="w-full bg-gray-900 p-3 rounded" placeholder="Company" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
        <input className="w-full bg-gray-900 p-3 rounded" placeholder="Role" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
        <input className="w-full bg-gray-900 p-3 rounded" placeholder="Location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />

        <select className="w-full bg-gray-900 p-3 rounded" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
          <option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Internship">Internship</option> 
          <option value="contact">contact</option>
        </select>

        <select className="w-full bg-gray-900 p-3 rounded" value={formData.work_mode} onChange={(e) => setFormData({...formData, work_mode: e.target.value})}>
          <option value="Remote">Remote</option><option value="On-site">On-site</option><option value="Hybrid">Hybrid</option>
        </select>

        {/* Date Section */}
        <input type="date" className="w-full bg-gray-900 p-3 rounded" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} />
        
        {!formData.is_currently_working && (
          <input type="date" className="w-full bg-gray-900 p-3 rounded" value={formData.end_date || ''} onChange={(e) => setFormData({...formData, end_date: e.target.value})} />
        )}
      </div>

      <div className="flex items-center gap-2 my-4">
        <input type="checkbox" checked={formData.is_currently_working} onChange={(e) => setFormData({...formData, is_currently_working: e.target.checked})} />
        <label>I am currently working here</label>
      </div>

      <textarea className="w-full bg-gray-900 p-3 rounded mb-4" placeholder="Skills (comma separated)" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
      <textarea className="w-full bg-gray-900 p-3 rounded mb-4" placeholder="Responsibilities" value={formData.responsibilities} onChange={(e) => setFormData({...formData, responsibilities: e.target.value})} />
      
      <button onClick={handleSubmit} className="w-full bg-[#c778dd] p-4 text-black font-bold rounded hover:bg-white transition-all">
        {loading ? 'SAVING...' : (id ? 'UPDATE EXPERIENCE' : 'ADD EXPERIENCE')}
      </button>
    </div>
  );
}