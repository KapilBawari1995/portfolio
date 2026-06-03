import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function EditContact() {
  const navigate = useNavigate();
  const [contact, setContact] = useState({ discord_tag: '', email: '', contact_desc: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchContact() {
      const { data } = await supabase.from('profile').select('*').eq('id', 2).maybeSingle();
      if (data) setContact(data);
    }
    fetchContact();
  }, []);

  async function updateContact() {
    setLoading(true);
    await supabase.from('profile').update(contact).eq('id', 2);
    navigate('/admin/contacts');
    setLoading(false);
  }

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold border-b border-gray-600 pb-4">Edit Contact</h2>
              <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">← Back</button>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <label className="text-[#c778dd] text-sm font-bold block mb-2">Contact Description</label>
          <textarea className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600" value={contact.contact_desc} onChange={(e) => setContact({...contact, contact_desc: e.target.value})} rows="3" />
        </div>
        
        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <label className="text-[#c778dd] text-sm font-bold block mb-2">Discord Tag</label>
          <input className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600" value={contact.discord_tag} onChange={(e) => setContact({...contact, discord_tag: e.target.value})} />
        </div>

        <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
          <label className="text-[#c778dd] text-sm font-bold block mb-2">Email Address</label>
          <input className="w-full bg-gray-900 p-3 rounded text-white border border-gray-600" value={contact.email} onChange={(e) => setContact({...contact, email: e.target.value})} />
        </div>
      </div>

      <button onClick={updateContact} className="w-full bg-[#c778dd] text-black font-bold py-4 rounded hover:bg-white transition-all">
        {loading ? 'SAVING...' : 'SAVE CHANGES'}
      </button>
    </div>
  );
}