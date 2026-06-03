import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { Link } from 'react-router-dom';

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchAllBlogs() {
      const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
      if (data) setBlogs(data);
    }
    fetchAllBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-[#282c33] text-white font-mono">
      {/* Header (Simplified version of your Navbar) */}
      <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-wider cursor-pointer">
        </Link>
        <Link to="/" className="text-gray-400 hover:text-[#c778dd]">← Back Home</Link>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold mb-12 border-b border-gray-700 pb-4">
          <span className="text-[#c778dd]">#</span>all-blogs
        </h1>
        
        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map(blog => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.id}`} 
              className="border border-gray-600 bg-[#1e2227] flex flex-col hover:border-[#c778dd] transition-all"
            >
              {/* Image */}
              <div className="w-full h-48 overflow-hidden border-b border-gray-600">
                <img 
                  src={blog.image_url || 'https://via.placeholder.com/400x200'} 
                  alt={blog.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[10px] text-[#c778dd] mb-2 uppercase tracking-widest font-bold">{blog.category}</div>
                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{blog.content}</p>
                <div className="text-[10px] text-gray-500 italic mt-auto border-t border-gray-700 pt-4">
                  By {blog.author_name || "Admin"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8 text-center text-gray-500 text-sm">
        © Copyright 2026. Made by Kapil Bawari
      </footer>
    </div>
  );
}