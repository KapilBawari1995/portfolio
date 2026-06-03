import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSkillsRequest } from '../../adminSlice/adminskillsSlice';

export default function SkillsManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.skills);

  useEffect(() => {
    dispatch(fetchSkillsRequest());
  }, [dispatch]);

  if (loading) return <div className="text-white p-8 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-8 text-center">Error: {error}</div>;

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-4">
        <h2 className="text-3xl font-bold">Skills Overview</h2>
        <button 
          onClick={() => navigate('/admin/eite-skils')} 
          className="text-2xl text-[#c778dd] hover:text-white border-2 border-[#c778dd] p-1 rounded-md"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {data ? Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-gray-800 p-4 rounded-md border border-gray-700">
            <label className="text-[#c778dd] text-sm font-bold block mb-1 capitalize">{key.replace('_', ' ')}</label>
            <p className="text-gray-200">{value || "No skills added"}</p>
          </div>
        )) : <p className="text-center">No data found.</p>}
      </div>
    </div>
  );
}