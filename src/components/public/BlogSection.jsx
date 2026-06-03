import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogsRequest } from '../../Slice/blogSlice';

export default function BlogSection() {
  const dispatch = useDispatch();
  const { data: blogsData, loading } = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogsRequest());
  }, [dispatch]);

  if (loading) return <p className="text-gray-400 text-center">Loading blogs...</p>;

  return (
    <section id="blogs" className="mt-28 max-w-6xl mx-auto px-8">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-wider text-white">
          <span className="text-[#c778dd]">#</span>blogs
        </h2>
        <Link to="/all-blogs" className="text-white hover:text-[#c778dd] transition-all font-medium flex items-center gap-2">
          View All <span className="text-[#c778dd] text-xl">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsData.length > 0 ? (
          blogsData.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.id}`}
              className="border border-gray-600 bg-[#1e2227] flex flex-col hover:border-[#c778dd] transition-all duration-300 group"
            >
              <div className="w-full h-48 overflow-hidden border-b border-gray-600">
                <img
                  src={blog.image_url || 'https://via.placeholder.com/400x200?text=No+Image'}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-[10px] text-[#c778dd] mb-2 uppercase tracking-widest font-bold">
                  {blog.category}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{blog.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {blog.content}
                </p>
                <div className="text-[10px] text-gray-500 italic mt-auto border-t border-gray-700 pt-4">
                  By {blog.author_name || "Admin"}
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No blogs published yet.</p>
        )}
      </div>
    </section>
  );
}