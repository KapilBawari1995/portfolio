import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitFeedbackRequest, resetFeedback } from '../../Slice/feedbackSlice';
import toast, { Toaster } from 'react-hot-toast';

export default function ContactSection() {
  const dispatch = useDispatch();
  
  const { loading, success, error } = useSelector((state) => state.feedback);
  const { data: profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    if (success) {
      toast.success("Message sent successfully!");
      dispatch(resetFeedback()); 
    }
    if (error) {
      toast.error(error);
      dispatch(resetFeedback());
    }
  }, [success, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const feedbackData = Object.fromEntries(formData.entries());
    
   
    dispatch(submitFeedbackRequest(feedbackData));
    e.target.reset();
  };

  return (
    <section id="contacts" className="mt-12 md:mt-28 max-w-6xl mx-auto lg:px-4 md:px-2 md:py-12">
      <Toaster position="bottom-right" />
      
      <div className="flex items-center gap-4 border-b border-gray-700 pb-4 mb-8 md:mb-12">
        <h2 className="text-xl md:text-2xl font-semibold tracking-wider text-white">
          <span className="text-[#c778dd]">#</span>contacts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Contact Info */}
        <div className="space-y-6">
          <p className="text-gray-400 leading-relaxed text-sm md:text-base">
            {profileData?.contact_desc || "I’m currently available for freelance work. If you have any questions or want to collaborate, feel free to reach out!"}
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-[#1e2227] p-6 md:p-8 border border-gray-700 w-full">
          <div className="grid grid-cols-1 gap-4">
            <input name="name" type="text" placeholder="Name" required className="bg-gray-800 p-3 text-white border border-gray-600 outline-none focus:border-[#c778dd]" />
            <input name="email" type="email" placeholder="Email" required className="bg-gray-800 p-3 text-white border border-gray-600 outline-none focus:border-[#c778dd]" />
            <select name="type" className="bg-gray-800 p-3 text-gray-400 border border-gray-600 outline-none">
              <option value="general">General Inquiry</option>
              <option value="project">Project Proposal</option>
              <option value="feedback">Website Feedback</option>
            </select>
            <textarea name="message" placeholder="Message" required className="bg-gray-800 p-3 text-white border border-gray-600 h-32 outline-none focus:border-[#c778dd]"></textarea>
            
            <button 
              type="submit" 
              disabled={loading} 
              className="bg-[#c778dd] text-white font-bold py-3 hover:bg-[#b066c6] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}