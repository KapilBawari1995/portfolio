import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function AdminBlogManager() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => { fetchBlogs(); }, []);

  async function fetchBlogs() {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
  }

  return (
    <div className="p-8 bg-[#282c33] text-white min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[#c778dd]"># Blog Manager</h2>
        <button 
          onClick={() => navigate('/admin/add-blog')} 
          className="bg-[#c778dd] px-4 py-2 rounded font-bold"
        >
          + New Blog
        </button>
      </div>

      <div className="bg-[#1e2227] rounded-lg border border-gray-700">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700 text-[#c778dd]">
              <th className="p-4">Image</th>
              <th className="p-4">Title</th>
              <th className="p-4">Description</th>
              <th className="p-4">Author</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="p-3"><img src={b.image_url} className="w-12 h-12 rounded-full object-cover" alt="blog" /></td>
                <td className="p-3 font-medium">{b.title}</td>
                <td className="p-3 max-w-xs truncate">{b.description}</td> 
                <td className="p-3">{b.author}</td>
                <td className="p-3 text-center">
                  {/* Yahan se ID bhej rahe hain */}
                  <button onClick={() => navigate(`/admin/edit-blog/${b.id}`)} className="text-[#c778dd] text-xl">✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}