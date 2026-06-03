import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

export default function SingleBlogPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single();
      setBlog(data);
    }
    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-white p-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#282c33] text-white p-8 font-mono">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-[#c778dd] mb-8">← Back to Home</button>
      
      <div className="max-w-4xl mx-auto">
        <img src={blog.image_url} alt={blog.title} className="w-full h-80 object-cover border border-gray-600 mb-6" />
        
        <span className="text-[#c778dd] border border-[#c778dd] px-3 py-1 text-xs uppercase">{blog.category}</span>
        <h1 className="text-4xl font-bold mt-4 mb-6">{blog.title}</h1>
        
        <div className="text-gray-400 leading-relaxed text-lg border-t border-gray-700 pt-6">
          {blog.content}
        </div>

        <div className="mt-12 text-sm text-gray-500">
          Published on: {new Date(blog.created_at).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}