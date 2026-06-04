import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminFetchExperienceRequest } from '../../adminSlice/adminExperienceSlice';

export default function ExperienceManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { data, loading, error } = useSelector((state) => state.adminExperience);

  useEffect(() => {

    dispatch(adminFetchExperienceRequest());
  }, [dispatch]);

  if (loading) return <div className="text-white p-8 text-center">Loading...</div>;
  if (error) return <div className="text-red-500 p-8 text-center">Error: {error}</div>;

  return (
    <div className="p-8 bg-[#282c33] text-white max-w-5xl mx-auto rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Manage Experience</h2>
        <button 
          onClick={() => navigate('/admin/add-experience')} 
          className="bg-[#c778dd] px-4 py-2 rounded font-bold hover:bg-white hover:text-black transition-all"
        >
          + Add New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-600 text-[#c778dd]">
              <th className="p-3">Company</th>
              <th className="p-3">Role</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="p-3 font-bold">{item.company}</td>
                  <td className="p-3">{item.role}</td>
                  <td className="p-3 text-sm">{item.start_date} - {item.end_date || 'Present'}</td>
                  <td className="p-3">{item.type}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => navigate(`/admin/edit-experience/${item.id}`)}
                      className="text-2xl text-[#c778dd] hover:text-white border-2 border-[#c778dd] p-1 rounded-md transition-all"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path>
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No experience records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}