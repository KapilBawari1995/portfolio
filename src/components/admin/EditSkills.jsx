import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { adminUpdateSkillsRequest } from '../../adminSlice/adminSkillsSlice';

// Validation Schema: Har field required hai
const validationSchema = Yup.object({
  languages: Yup.string().required('Languages are required'),
  databases: Yup.string().required('Databases are required'),
  tools: Yup.string().required('Tools are required'),
  frameworks: Yup.string().required('Frameworks are required'),
  other: Yup.string().required('Other skills are required'),
});

export default function EditSkills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.adminSkills);

  const formik = useFormik({
    initialValues: {
      languages: data?.languages || '',
      databases: data?.databases || '',
      tools: data?.tools || '',
      frameworks: data?.frameworks || '',
      other: data?.other || '',
    },
    enableReinitialize: true, // Jab Redux se data aaye, form update ho jaye
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("DEBUG: Formik values:", values); 
  
  // Dispatch ko aise call karo
  const action = adminUpdateSkillsRequest(values);
  console.log("DEBUG: Action Object:", action); 
  
  dispatch(action);
      // dispatch(adminUpdateSkillsRequest(values));
      // navigate('/admin/skills');
    },
  });

  return (
    <div className="bg-[#282c33] p-8 text-white max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Edit Skills</h2>
      
      <form onSubmit={formik.handleSubmit}>
        {Object.keys(formik.initialValues).map((key) => (
          <div key={key} className="mb-4">
            <label className="block text-[#c778dd] capitalize mb-1">{key}</label>
            <input
              name={key}
              className={`w-full bg-gray-900 p-3 rounded border outline-none ${
                formik.touched[key] && formik.errors[key] ? 'border-red-500' : 'border-gray-600'
              }`}
              value={formik.values[key]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched[key] && formik.errors[key] ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors[key]}</div>
            ) : null}
          </div>
        ))}
        
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-[#c778dd] p-3 rounded font-bold mt-4"
        >
          {loading ? 'SAVING...' : 'SAVE & GO BACK'}
        </button>
      </form>
    </div>
  );
}