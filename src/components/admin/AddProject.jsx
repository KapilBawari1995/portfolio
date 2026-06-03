import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminAddProjectRequest, adminUpdateProjectRequest } from '../../adminSlice/adminprojectsSlice';
import { supabase } from '../../supabaseClient';

export default function AddProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [uploading, setUploading] = useState(false);

  const existingProject = useSelector((state) => 
    state.adminprojects?.data?.find(p => p.id === parseInt(id))
  );
const handleReset = () => {
  formik.resetForm(); // Formik ka standard method
};

  const handleBack = () => {
    navigate('/admin/projects');
  };
  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required('Project Title is required'),
    description: Yup.string().required('Description is required'),
    livelink: Yup.string().url('Invalid URL').required('Live link is required'),
    image_url: Yup.string().required('Image is required'),
    tags: Yup.string().required('Tags are required')
  });

  const formik = useFormik({
    initialValues: {
      title: existingProject?.title || '',
      description: existingProject?.description || '',
      livelink: existingProject?.livelink || '',
      image_url: existingProject?.image_url || '',
      tags: existingProject?.tags?.join(', ') || '',
      status: existingProject?.status || 'active'
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const payload = { ...values, tags: values.tags.split(',').map(t => t.trim()) };
      if (id) {
        dispatch(adminUpdateProjectRequest({ ...payload, id }));
      } else {
        dispatch(adminAddProjectRequest(payload));
      }
      navigate('/admin/projects');
    }
  });

  async function handleImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { data, error } = await supabase.storage.from('projects').upload(`proj_${Date.now()}.png`, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('projects').getPublicUrl(data.path);
      formik.setFieldValue('image_url', urlData.publicUrl);
    }
    setUploading(false);
  }

  return (
    <div className="bg-[#282c33] p-8 rounded-lg border border-gray-700 max-w-2xl mx-auto text-white">
<div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-bold">{id ? 'Edit Project' : 'Add New Project'}</h2>
  
  <button 
    onClick={() => navigate('/admin/projects')} 
    className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-all"
  >
    ← Back to Projects
  </button>
</div>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        
        {/* Title */}
        <div>
          <label className="text-sm">Project Title <span className="text-red-500 font-bold">*</span></label>
          <input className="w-full bg-gray-800 p-3 rounded mt-1" {...formik.getFieldProps('title')} />
          {formik.touched.title && formik.errors.title && <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-sm">Description <span className="text-red-500 font-bold">*</span></label>
          <textarea className="w-full bg-gray-800 p-3 rounded mt-1 h-24" {...formik.getFieldProps('description')} />
          {formik.touched.description && formik.errors.description && <p className="text-red-500 text-xs mt-1">{formik.errors.description}</p>}
        </div>

        {/* Live Link */}
        <div>
          <label className="text-sm">Live Link <span className="text-red-500 font-bold">*</span></label>
          <input className="w-full bg-gray-800 p-3 rounded mt-1" {...formik.getFieldProps('livelink')} />
          {formik.touched.livelink && formik.errors.livelink && <p className="text-red-500 text-xs mt-1">{formik.errors.livelink}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="text-sm">Tags <span className="text-red-500 font-bold">*</span></label>
          <input className="w-full bg-gray-800 p-3 rounded mt-1" placeholder="React, Node, etc." {...formik.getFieldProps('tags')} />
          {formik.touched.tags && formik.errors.tags && <p className="text-red-500 text-xs mt-1">{formik.errors.tags}</p>}
        </div>
        
        {/* Status */}
        <div>
          <label className="text-sm">Status</label>
          <select className="w-full bg-gray-800 p-3 rounded mt-1" {...formik.getFieldProps('status')}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="border border-dashed border-gray-600 p-4">
          <label className="text-sm block mb-2">Project Image <span className="text-red-500 font-bold">*</span></label>
          <input type="file" onChange={handleImageUpload} />
          {formik.values.image_url && <p className="text-green-500 text-xs mt-1">Image uploaded!</p>}
          {uploading && <p className="text-yellow-400 text-sm mt-2">Uploading...</p>}
          {formik.touched.image_url && formik.errors.image_url && <p className="text-red-500 text-xs mt-1">{formik.errors.image_url}</p>}
        </div>

        {/* Submit Button */}
       <div className="flex gap-4 mt-6">
  {/* Submit Button */}
  <button 
    type="submit" 
    disabled={uploading || !formik.isValid} 
    className="flex-1 bg-[#c778dd] text-white py-3 rounded font-bold hover:bg-[#b065c7] transition-all disabled:opacity-50"
  >
    {uploading ? 'UPLOADING...' : (id ? 'UPDATE PROJECT' : 'SAVE PROJECT')}
  </button>

  {/* Reset Button (Better UI) */}
  <button 
    type="button" 
    onClick={handleReset} 
    className="px-6 py-3 border border-gray-600 text-gray-300 rounded hover:bg-gray-700 transition-all"
  >
    Reset
  </button>
</div>
      </form>
    </div>
  );
}