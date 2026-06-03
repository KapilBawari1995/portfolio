import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function ContactManager() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchContact() {
      const { data, error } = await supabase.from('profile').select('*').eq('id', 2).maybeSingle();
      if (data) setData(data);
      setLoading(false);
    }
    fetchContact();
  }, []);

  if (loading) return <div className="text-white p-8 text-center">Loading...</div>;

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-4">
        <h2 className="text-3xl font-bold">Contact Overview</h2>
          <button 
          onClick={() => navigate('/admin/edit-contacts')} 
          className="text-2xl text-[#c778dd] hover:text-white border-2 border-[#c778dd] p-1 rounded-md"
        >
          {/* पेंसिल वाला आइकॉन */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>

      </div>

      <div className="space-y-4">
        {[
          { label: "Description", value: data?.contact_desc },
          { label: "Discord", value: data?.discord_tag },
          { label: "Email", value: data?.email }
        ].map((f, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-1">{f.label}</label>
            <p className="text-gray-200">{f.value || "Not set"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}