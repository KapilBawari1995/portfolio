import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams(); 
  
  const initialData = { 
    title: '', content: '', category: '', author_name: '', image_url: '' 
  };

  const [data, setData] = useState(initialData);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Agar ID hai toh data fetch karo (Edit Mode)
  useEffect(() => {
    if (id) {
      fetchBlogById(id);
    }
  }, [id]);

  async function fetchBlogById(blogId) {
    const { data: blog, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', blogId)
      .single();
    if (blog) {
      setData(blog);
      setPreview(blog.image_url);
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setData(initialData);
    setImageFile(null);
    setPreview('');
  };

  const handleSave = async () => {
    if (!data.title || !data.content) {
      alert("Please fill Title and Content!");
      return;
    }

    setLoading(true);
    let finalUrl = data.image_url;

    try {
      if (imageFile) {
        const fileName = `${Date.now()}_${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, imageFile);
        
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);
        finalUrl = publicUrl;
      }

      if (id) {
        const { error } = await supabase.from('blogs').update({ 
          title: data.title,
          content: data.content,
          category: data.category || 'General',
          author_name: data.author_name,
          image_url: finalUrl 
        }).eq('id', id);
        if (error) throw error;
        alert("Blog Updated Successfully!");
      } else {
    
        const { error } = await supabase.from('blogs').insert([{ 
          title: data.title,
          content: data.content,
          category: data.category || 'General',
          author_name: data.author_name,
          image_url: finalUrl 
        }]);
        if (error) throw error;
        alert("Blog Added Successfully!");
      }
      
      navigate('/admin/blog');
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-white max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-[#c778dd] mb-6">
        {id ? "Edit Blog" : "Add New Blog"}
      </h2>
      
      <div className="bg-[#1e2227] p-6 rounded border border-gray-700 space-y-4">
        <div 
          onClick={() => fileInputRef.current.click()} 
          className="w-full h-40 border-2 border-dashed border-gray-500 rounded flex flex-col items-center justify-center cursor-pointer hover:border-[#c778dd] transition"
        >
          {preview ? (
            <img src={preview} alt="Preview" className="h-full object-cover" />
          ) : (
            <p className="text-gray-400">Click to upload image</p>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        <input value={data.title} onChange={(e) => setData({...data, title: e.target.value})} className="w-full p-3 bg-gray-800 rounded outline-none border border-gray-600" placeholder="Title" />
        <input value={data.author_name} onChange={(e) => setData({...data, author_name: e.target.value})} className="w-full p-3 bg-gray-800 rounded outline-none border border-gray-600" placeholder="Author Name" />
        <input value={data.category} onChange={(e) => setData({...data, category: e.target.value})} className="w-full p-3 bg-gray-800 rounded outline-none border border-gray-600" placeholder="Category" />
        <textarea value={data.content} onChange={(e) => setData({...data, content: e.target.value})} className="w-full p-3 bg-gray-800 rounded outline-none border border-gray-600 h-40" placeholder="Content" />
        
        <div className="flex gap-4">
          <button onClick={handleSave} disabled={loading} className="bg-[#c778dd] px-6 py-2 rounded font-bold hover:bg-purple-600 transition">
            {loading ? 'SAVING...' : 'SAVE BLOG'}
          </button>
          <button onClick={handleReset} className="bg-yellow-600 px-6 py-2 rounded font-bold">RESET</button>
          <button onClick={() => navigate('/admin/blog')} className="bg-gray-600 px-6 py-2 rounded">CANCEL</button>
        </div>
      </div>
    </div>
  );
}