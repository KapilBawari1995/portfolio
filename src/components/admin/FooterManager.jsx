import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function FooterManager() {
  const navigate = useNavigate();
  const [links, setLinks] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('profile').select('*').eq('id', 2).maybeSingle();
      if (data) setLinks(data);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <div className="text-white p-8 text-center">Loading...</div>;

  const fields = [
    { label: "Copyright Name", value: links?.copyright_name },
    { label: "GitHub URL", value: links?.github_url },
    { label: "LinkedIn URL", value: links?.linkedin_url },
    { label: "Instagram URL", value: links?.instagram_url },
    { label: "Facebook URL", value: links?.facebook_url },
  ];

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-4">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">← Back</button>
        <h2 className="text-3xl font-bold">Footer & Socials</h2>
        
  
        <button 
          onClick={() => navigate('/admin/edit-footer')} 
          className="text-[#c778dd] hover:text-white text-2xl p-2"
        >
          ✎
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((f, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-1">{f.label}</label>
            <p className="text-gray-200 truncate">{f.value || "Not set"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}