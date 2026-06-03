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
    <section className="max-w-2xl mx-auto my-24 relative px-6">
      <div className="border border-gray-600 p-8 relative">
        <span className="absolute -top-4 left-6 bg-[#282c33] px-2 text-4xl text-gray-500 select-none">“</span>
        <p className="text-lg md:text-xl font-medium text-center tracking-wide text-gray-200">
          {quote?.quote_text || "Code is like humor. When you have to explain it, it's bad."}
        </p>
        <span className="absolute -bottom-8 right-6 bg-[#282c33] px-2 text-4xl text-gray-500 select-none">”</span>
      </div>
      
      <div className="flex justify-end">
        <div className="border border-t-0 border-gray-600 p-4 min-w-[200px] text-sm text-gray-400 bg-[#282c33] flex justify-center items-center">
          <span className="text-white font-bold tracking-wider">
            - {quote?.quote_author || "Elias"}
          </span>
        </div>
      </div>
    </section>
  );
}