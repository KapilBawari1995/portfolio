import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminFetchProjectsRequest, adminDeleteProjectRequest, adminUpdateProjectRequest } from '../../adminSlice/adminprojectsSlice';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaEllipsisV, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import ConfirmModal from '../ConfirmModal';

import datanotfound from '../../assets/empty-box.png'
export default function ProjectsManager() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: projects, loading } = useSelector((state) => state.adminprojects);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => { dispatch(adminFetchProjectsRequest()); }, [dispatch]);

  const confirmDelete = () => {
    dispatch(adminDeleteProjectRequest(deleteId));
    setDeleteId(null);
    setOpenMenuId(null);
  };

  const toggleStatus = (project) => {
    dispatch(adminUpdateProjectRequest({ ...project, status: project.status === 'active' ? 'inactive' : 'active' }));
    setOpenMenuId(null);
  };

  return (
    <div className=" p-8 text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Projects Manager</h2>
        <button onClick={() => navigate('/admin/add-project')} className="flex items-center gap-2 bg-[#c778dd] px-4 py-2 rounded-lg font-bold hover:bg-[#b065c7] transition-all">
          <FaPlus /> Add New Project
        </button>
      </div>

      <div className="bg-[#282c33] rounded-xl border border-gray-700 shadow-lg overflow-x-auto min-h-[400px]">
        {loading ? (
          <div className="flex justify-center items-center h-96"><FaSpinner className="animate-spin text-4xl text-[#c778dd]" /></div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-700 text-gray-400 uppercase text-xs tracking-wider">
                <th className="px-6 py-6">Project Title</th>
                <th className="px-6 py-6">Description</th>
                <th className="px-6 py-6">Status</th>
                <th className="px-6 py-6 text-center">Actions</th>
              </tr>
            </thead>

            {projects.length > 0 ? (
              <tbody className="divide-y divide-gray-700">
                {projects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#323842] transition-all row-animate">
                    <td className="px-6 py-5 font-semibold">{p.title}</td>
                    <td className="px-6 py-5 text-gray-400 text-sm">{p.description?.substring(0, 30)}...</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${p.status === 'active' ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                        {p.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-center relative">
                      <button onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)} className="text-gray-400 hover:text-white p-2"><FaEllipsisV /></button>
                      {openMenuId === p.id && (
                        <div className="absolute right-12 top-14 bg-[#1e232a] border border-gray-700 rounded-lg shadow-2xl z-[100] w-44 py-2">
                          <button onClick={() => { navigate(`/admin/edit-project/${p.id}`); setOpenMenuId(null); }} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 w-full text-sm"><FaEdit /> Edit</button>
                          <button onClick={() => toggleStatus(p)} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700 w-full text-sm">
                            {p.status === 'active' ? <FaToggleOff className="text-yellow-500" /> : <FaToggleOn className="text-green-500" />} {p.status === 'active' ? 'Set Inactive' : 'Set Active'}
                          </button>
                          <button onClick={() => setDeleteId(p.id)} className="flex items-center gap-3 px-4 py-3 hover:bg-red-900 text-red-400 w-full text-sm"><FaTrash /> Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="4" className="py-20">
                    <div className="premium-empty-box flex flex-col items-center justify-center text-center p-8 rounded-3xl w-full max-w-lg mx-auto">
                      <div className=" flex items-center justify-center  "><span className="text-4xl">

                        <img
                          src={datanotfound}
                          alt="No Data"
                          className="w-24 h-24 mb-6 opacity-80"
                        />                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Project Not Found</h3>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </table>
        )}
      </div>

      <ConfirmModal isOpen={deleteId !== null} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} title="Kya aap sach mein ye project delete karna chahte hain?" />
    </div>
  );
}