import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedbackRequest } from '../../Slice/feedbackSlice';

export default function ContactSection() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.feedback);
  // profile डेटा 'profile' स्लाइस से आ रहा है
  const { data: profileData } = useSelector((state) => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedbackData = Object.fromEntries(formData.entries());
    
    dispatch(submitFeedbackRequest(feedbackData));
    e.target.reset();
  };

  return (
    <section id="contacts" className="mt-28 max-w-6xl mx-auto px-8 py-12">
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-12">
        <h2 className="text-2xl font-semibold tracking-wider text-white">
          <span className="text-[#c778dd]">#</span>contacts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <p className="text-gray-400 leading-relaxed">
            {profileData?.contact_desc || "I’m currently available for freelance work..."}
          </p>
          <div className="space-y-4 pt-4 text-gray-300">
            <p>📧 {profileData?.email || "hello@kapil.dev"}</p>
            <p>💬 {profileData?.discord_tag || "@kapil_dev"}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1e2227] p-8 border border-gray-700">
          <div className="grid grid-cols-1 gap-4">
            <input name="name" type="text" placeholder="Name" className="bg-gray-800 p-3 text-white border border-gray-600 outline-none" required />
            <input name="email" type="email" placeholder="Email" className="bg-gray-800 p-3 text-white border border-gray-600 outline-none" required />
            <select name="type" className="bg-gray-800 p-3 text-gray-400 border border-gray-600 outline-none">
              <option value="general">General Inquiry</option>
              <option value="project">Project Proposal</option>
              <option value="feedback">Website Feedback</option>
            </select>
            <textarea name="message" placeholder="Message" className="bg-gray-800 p-3 text-white border border-gray-600 h-32 outline-none" required></textarea>
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#c778dd] text-white font-bold py-3 hover:bg-[#b066c6] transition-all disabled:opacity-50"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}