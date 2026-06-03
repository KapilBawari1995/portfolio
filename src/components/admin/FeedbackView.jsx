import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function FeedbackView() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) console.error("Error fetching:", error);
    else setFeedbacks(data);
    setLoading(false);
  }

  // DELETE FUNCTION
  async function deleteFeedback(id) {
    if (!window.confirm("Kya aap sach mein ye feedback delete karna chahte hain?")) return;

    const { error } = await supabase
      .from('feedbacks')
      .delete()
      .eq('id', id);

    if (error) {
      alert("Error deleting: " + error.message);
    } else {
      // Local state update karein taki page reload na karna pade
      setFeedbacks(feedbacks.filter(f => f.id !== id));
      alert("Feedback deleted successfully!");
    }
  }

  return (
    <div className="min-h-screen bg-[#282c33] p-8 text-white">
      <h1 className="text-3xl font-bold mb-8 border-b border-gray-700 pb-4">
        User Feedback View
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((f) => (
              <div key={f.id} className="bg-[#1e2227] p-6 border border-gray-700 hover:border-red-500 transition-all relative group">
                {/* Delete Button */}
                <button 
                  onClick={() => deleteFeedback(f.id)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors font-bold"
                >
                  ✕
                </button>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold">{f.name}</h2>
                    <p className="text-[#c778dd] text-sm">{f.email}</p>
                  </div>
                  <span className="text-xs bg-gray-800 px-2 py-1 mr-6">{f.type}</span>
                </div>
                <p className="text-gray-300 italic">"{f.message}"</p>
                <div className="mt-4 text-[10px] text-gray-500 text-right">
                  {new Date(f.created_at).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <p>No feedbacks found.</p>
          )}
        </div>
      )}
    </div>
  );
}