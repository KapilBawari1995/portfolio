import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function EditFooter() {
  const navigate = useNavigate();
  const [links, setLinks] = useState({ 
    copyright_name: '', github_url: '', linkedin_url: '', instagram_url: '', facebook_url: '' 
  });
  const [loading, setLoading] = useState(false);

  // Labels ताकि एडिट पेज पर नाम साफ़ दिखें
  const fieldLabels = {
    copyright_name: "Copyright Name",
    github_url: "GitHub URL",
    linkedin_url: "LinkedIn URL",
    instagram_url: "Instagram URL",
    facebook_url: "Facebook URL"
  };

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('profile').select('*').eq('id', 2).maybeSingle();
      if (data) setLinks(data);
    }
    load();
  }, []);

  async function save() {
    setLoading(true);
    const { error } = await supabase.from('profile').update(links).eq('id', 2);
    if (error) {
      alert("Error: " + error.message);
    } else {
      navigate('/admin/footer'); // सेव होने के बाद वापस व्यू पेज पर
    }
    setLoading(false);
  }

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4 border-b border-gray-600 pb-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">← Back</button>
        <h2 className="text-3xl font-bold">Edit Footer & Socials</h2>
      </div>
      
      <div className="space-y-4">
        {Object.keys(fieldLabels).map((key) => (
          <div key={key} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-2">
              {fieldLabels[key]}
            </label>
            <input 
              className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600 focus:border-[#c778dd] outline-none"
              value={links[key] || ''} 
              onChange={(e) => setLinks({...links, [key]: e.target.value})} 
              placeholder={`Enter ${fieldLabels[key]}`}
            />
          </div>
        ))}
      </div>

      <button 
        onClick={save} 
        className="w-full bg-[#c778dd] text-black font-bold py-4 rounded hover:bg-white transition-all shadow-lg"
      >
        {loading ? 'SAVING...' : 'SAVE FOOTER'}
      </button>
    </div>
  );
}