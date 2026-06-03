import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjectsRequest } from '../../Slice/projectSlice';

export default function ProjectSection() {
  const dispatch = useDispatch();
  const { data: projectsData, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjectsRequest());
  }, [dispatch]);

  if (loading) return <p className="text-gray-400">Loading projects...</p>;

  return (
    <section id="works" className="mt-28">
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-12">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold tracking-wider">
            <span className="text-[#c778dd]">#</span>projects
          </h2>
          <div className="h-[1px] bg-[#c778dd] w-32 md:w-96 hidden sm:block"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.length > 0 ? (
          projectsData.map((project) => (
            <div key={project.id} className="border border-gray-600 bg-[#282c33] flex flex-col hover:border-gray-400 transition-all">
              <div className="w-full h-48 overflow-hidden border-b border-gray-600 bg-gray-900">
                <img 
                  src={project.image_url || 'https://picsum.photos/400/300'} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="p-3 border-b border-gray-600 text-xs text-gray-400">
                {Array.isArray(project.tags) ? project.tags.join(' ') : project.tags}
              </div>
              <div className="p-4 flex flex-col flex-grow space-y-4">
                <h3 className="text-xl font-medium text-white">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
                <a 
                  href={project.livelink} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-[#c778dd] text-white text-sm px-4 py-1.5 w-fit hover:bg-[#c778dd]/10 transition-all"
                >
                  Live {'<~>'}
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No active projects found at the moment.</p>
        )}
      </div>
    </section>
  );
}