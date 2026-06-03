import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { supabase } from '../../supabaseClient';
import { adminUpdateProfileRequest } from '../../adminSlice/adminProfileSlice';

export default function EditProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Redux से करंट डेटा लेना
  const { data: reduxData, loading } = useSelector((state) => state.adminProfile);
  
  const [data, setData] = useState({
    hero_title: '', hero_desc: '', work_status: '',
    about_p1: '', about_p2: '', quote_text: '', quote_author: '', cv_url: ''
  });
  const [uploading, setUploading] = useState(false);

  // Redux डेटा लोड होते ही स्टेट सेट करना
  useEffect(() => {
    if (reduxData) setData(reduxData);
  }, [reduxData]);

  // फाइल अपलोड फंक्शन
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const fileName = `cv_${Date.now()}.pdf`;
    
    const { error } = await supabase.storage.from('cv_bucket').upload(fileName, file);
    if (error) {
      alert("Upload Error: " + error.message);
    } else {
      const { data: urlData } = supabase.storage.from('cv_bucket').getPublicUrl(fileName);
      setData({ ...data, cv_url: urlData.publicUrl });
      alert("CV Uploaded!");
    }
    setUploading(false);
  };

  const handleSave = () => {
    // Redux-Saga को डेटा अपडेट करने के लिए भेजना
    dispatch(adminUpdateProfileRequest(data));
    navigate('/admin/about');
  };

  const fields = [
    { key: 'hero_title', label: 'Hero Title', type: 'input' },
    { key: 'hero_desc', label: 'Hero Description', type: 'textarea' },
    { key: 'work_status', label: 'Work Status', type: 'input' },
    { key: 'about_p1', label: 'About P1', type: 'textarea' },
    { key: 'about_p2', label: 'About P2', type: 'textarea' },
    { key: 'quote_text', label: 'Quote Text', type: 'textarea' },
    { key: 'quote_author', label: 'Quote Author', type: 'input' }
  ];

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-600 pb-4">Edit All Content</h2>
      
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-2">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea 
                className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600 outline-none" 
                value={data[f.key] || ''} 
                onChange={(e) => setData({...data, [f.key]: e.target.value})} 
                rows="3" 
              />
            ) : (
              <input 
                className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600 outline-none" 
                value={data[f.key] || ''} 
                onChange={(e) => setData({...data, [f.key]: e.target.value})} 
              />
            )}
          </div>
        ))}

        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <label className="text-[#c778dd] text-sm font-bold block mb-2">Upload CV (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleFileUpload} className="w-full text-gray-400" />
          {uploading && <p className="text-yellow-500 text-sm mt-2">Uploading...</p>}
        </div>
      </div>

      <button 
        onClick={handleSave} 
        disabled={loading}
        className="w-full bg-[#c778dd] text-black font-bold py-4 rounded hover:bg-white transition-all"
      >
        {loading ? 'SAVING...' : 'SAVE ALL CHANGES'}
      </button>
    </div>
  );
}