import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminUpdateExperienceRequest } from '../../adminSlice/adminExperienceSlice';

export default function EditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: allExperience, loading } = useSelector((state) => state.adminExperience);
  
  const [formData, setFormData] = useState({
    company: '', role: '', start_date: '', end_date: '',
    type: 'Job', responsibilities: '', is_currently_working: false
  });

  useEffect(() => {
    const item = allExperience.find(exp => exp.id === parseInt(id));
    if (item) {
      setFormData({
        ...item,
        is_currently_working: item.end_date === null
      });
    }
  }, [allExperience, id]);

  const handleUpdate = () => {
    const updatePayload = {
      company: formData.company,
      role: formData.role,
      start_date: formData.start_date,
      end_date: formData.is_currently_working ? null : formData.end_date,
      type: formData.type,
      responsibilities: formData.responsibilities
    };

    dispatch(adminUpdateExperienceRequest({ id, payload: updatePayload }));
    navigate('/admin/experience');
  };

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-600 pb-4">
        <button onClick={() => navigate(-1)} className="text-gray-400">← Back</button>
        <h2 className="text-3xl font-bold">Edit Experience</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="text-[#c778dd] font-bold text-sm block mb-1">Company</label>
          <input className="w-full bg-gray-900 p-3 rounded" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
        </div>
        
        <div className="col-span-2">
          <label className="text-[#c778dd] font-bold text-sm block mb-1">Role</label>
          <input className="w-full bg-gray-900 p-3 rounded" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
        </div>

        <div>
          <label className="text-[#c778dd] font-bold text-sm block mb-1">Start Date</label>
          <input type="date" className="w-full bg-gray-900 p-3 rounded" value={formData.start_date} onChange={(e) => setFormData({...formData, start_date: e.target.value})} />
        </div>

        <div>
          <label className="text-[#c778dd] font-bold text-sm block mb-1">End Date</label>
          <input 
            type="date" 
            disabled={formData.is_currently_working}
            className={`w-full bg-gray-900 p-3 rounded ${formData.is_currently_working ? 'opacity-50' : ''}`}
            value={formData.is_currently_working ? '' : formData.end_date || ''} 
            onChange={(e) => setFormData({...formData, end_date: e.target.value})} 
          />
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input 
            type="checkbox" 
            checked={formData.is_currently_working}
            onChange={(e) => setFormData({...formData, is_currently_working: e.target.checked})}
            className="w-4 h-4"
          />
          <label>I am currently working here</label>
        </div>

        <div className="col-span-2">
          <label className="text-[#c778dd] font-bold text-sm block mb-1">Responsibilities</label>
          <textarea className="w-full bg-gray-900 p-3 rounded h-24" value={formData.responsibilities} onChange={(e) => setFormData({...formData, responsibilities: e.target.value})} />
        </div>

        <button 
          onClick={handleUpdate} 
          disabled={loading}
          className="col-span-2 bg-[#c778dd] text-black font-bold py-4 rounded hover:bg-white transition-all"
        >
          {loading ? 'UPDATING...' : 'UPDATE EXPERIENCE'}
        </button>
      </div>
    </div>
  );
}