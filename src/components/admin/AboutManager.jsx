import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminFetchProfileRequest } from '../../adminSlice/adminProfileSlice';

export default function AboutManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showCV, setShowCV] = useState(false);

  // Redux store से डेटा लेना
  const { data, loading, error } = useSelector((state) => state.adminProfile);

  useEffect(() => {
    dispatch(adminFetchProfileRequest());
  }, [dispatch]);

  if (loading) return <div className="text-white p-8 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-8 text-center">Error: {error}</div>;

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 text-white max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center border-b border-gray-600 pb-4">
        <h2 className="text-3xl font-bold">Content Overview</h2>
        <button 
          onClick={() => navigate('/admin/edit-about')} 
          className="text-2xl text-[#c778dd] hover:text-white border-2 border-[#c778dd] p-1 rounded-md"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9"></path>
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
          </svg>
        </button>
      </div>

      <div className="space-y-4">
        {data ? (
          <>
            {[
              { label: "Hero Title", value: data.hero_title },
              { label: "Hero Description", value: data.hero_desc },
              { label: "Work Status", value: data.work_status },
              { label: "About P1", value: data.about_p1 },
              { label: "About P2", value: data.about_p2 },
              { label: "Quote Text", value: data.quote_text },
              { label: "Quote Author", value: data.quote_author }
            ].map((f, i) => (
              <div key={i} className="bg-gray-800 p-4 rounded-md border border-gray-700">
                <label className="text-[#c778dd] text-sm font-bold block mb-1">{f.label}</label>
                <p className="text-gray-200">{f.value || "Empty"}</p>
              </div>
            ))}

            <div className="bg-gray-800 p-4 rounded-md border border-gray-700 flex justify-between items-center">
              <div>
                <label className="text-[#c778dd] text-sm font-bold block mb-1">Resume / CV</label>
                <p className="text-gray-400 text-sm">Click to view in modal</p>
              </div>
              {data.cv_url ? (
                <button 
                  onClick={() => setShowCV(true)} 
                  className="bg-[#c778dd] text-black px-4 py-2 rounded font-bold hover:bg-white transition-all"
                >
                  View PDF
                </button>
              ) : <span className="text-red-400">No CV Found</span>}
            </div>
          </>
        ) : (
          <p className="text-center">No data found.</p>
        )}
      </div>

      {showCV && data?.cv_url && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl h-[80vh] rounded-lg overflow-hidden relative shadow-2xl">
            <button onClick={() => setShowCV(false)} className="absolute top-2 right-2 bg-red-600 text-white px-4 py-1 rounded font-bold z-50">Close</button>
            <iframe src={data.cv_url} className="w-full h-full" title="CV" />
          </div>
        </div>
      )}
    </div>
  );
}