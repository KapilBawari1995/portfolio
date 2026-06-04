import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuoteRequest } from '../../Slice/quoteSlice';

export default function QuoteSection() {
  const dispatch = useDispatch();
  const { data: quote, loading } = useSelector((state) => state.quote);

  useEffect(() => {
    dispatch(fetchQuoteRequest());
  }, [dispatch]);

  if (loading) return null; 

  return (
  
    <section className="max-w-2xl mx-auto my-12 md:my-24 relative lg:px-6">
      
      {/* Quote Box */}
      <div className="border border-gray-600 lg:p-6 p-6 relative">
        <span className="absolute -top-4 left-4 md:left-6 bg-[#282c33] px-2 text-3xl md:text-4xl text-gray-500 select-none">“</span>
     
        <p className="text-base md:text-xl font-medium text-center tracking-wide text-gray-200">
          {quote?.quote_text || "Code is like humor. When you have to explain it, it's bad."}
        </p>
        
        <span className="absolute -bottom-6 md:-bottom-8 right-4 md:right-6 bg-[#282c33] px-2 text-3xl md:text-4xl text-gray-500 select-none">”</span>
      </div>
      
    
      <div className="flex justify-end">
        <div className="border border-t-0 border-gray-600 p-3 md:p-4 min-w-[150px] md:min-w-[200px] text-xs md:text-sm text-gray-400 bg-[#282c33] flex justify-center items-center">
          <span className="text-white font-bold tracking-wider">
            - {quote?.quote_author || "kapil"}
          </span>
        </div>
      </div>
      
    </section>
  );
}