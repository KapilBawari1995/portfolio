import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { adminFetchExperienceRequest, adminDeleteExperienceRequest } from '../../adminSlice/adminExperienceSlice';

export default function ExperienceManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminExperience);

  useEffect(() => { dispatch(adminFetchExperienceRequest()); }, [dispatch]);

  return (
    <div className="p-8 bg-[#282c33] text-white max-w-7xl mx-auto rounded-lg">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Manage Experience</h2>
        <button onClick={() => navigate('/admin/add-experience')} className="bg-[#c778dd] px-4 py-2 rounded"> + Add New </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-[#c778dd]"><th>Company</th><th>Role</th><th>Location</th><th>Skills</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-3">{item.company}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">{item.location}</td>
                <td className="p-3 truncate max-w-[150px]">{item.skills}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => navigate(`/admin/edit-experience/${item.id}`)} className="text-[#c778dd]">Edit</button>
                  <button onClick={() => dispatch(adminDeleteExperienceRequest(item.id))} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}