import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkillsRequest } from '../../adminSlice/adminskillsSlice';

export default function EditSkills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux से data और loading status लें
  const { data, loading } = useSelector((state) => state.skills);
  
  const [skills, setSkills] = useState({ 
    languages: '', databases: '', tools: '', frameworks: '', other: '' 
  });

  // जब Redux से डेटा आ जाए, तो फॉर्म में सेट करें
  useEffect(() => {
    if (data) setSkills(data);
  }, [data]);

  // जब सेविंग पूरी हो जाए और loading false हो जाए, तब navigate करें
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    if (isSaving && !loading) {
      navigate('/admin/skills');
    }
  }, [loading, isSaving, navigate]);

  const handleSave = () => {
    setIsSaving(true);
    dispatch(updateSkillsRequest(skills));
  };

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-600 pb-4">Edit Skills</h2>
      
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4">← Back</button>

      <div className="space-y-4">
        {Object.keys(skills).map((key) => (
          <div key={key} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-2 capitalize">{key}</label>
            <input 
              className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600 outline-none"
              value={skills[key] || ''} 
              onChange={(e) => setSkills({...skills, [key]: e.target.value})} 
              placeholder={`Enter ${key} separated by comma`}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={handleSave} 
        disabled={loading}
        className="w-full bg-[#c778dd] text-black font-bold py-4 rounded hover:bg-white transition-all disabled:opacity-50"
      >
        {loading ? 'SAVING...' : 'SAVE ALL SKILLS'}
      </button>
    </div>
  );
}