import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/'; // चेक करता है कि क्या हम होम पेज पर हैं

  return (
    <header className="flex justify-between items-center px-8 py-6 max-w-6xl mx-auto z-50 relative">
      <div className="flex items-center gap-2 font-bold text-lg tracking-wider cursor-pointer">
        <span className="text-[#c778dd]">❖</span> Kapil Bawari
      </div>
      
      <nav className="flex items-center gap-8 text-gray-400 text-sm">
        {/* Home लिंक हमेशा दिखेगा */}
        

        {/* बाकी लिंक्स सिर्फ तब दिखेंगे अगर isHomePage true है */}
        {isHomePage && (
          <>

          <a href="/" className="text-white font-medium hover:text-[#c778dd] transition-colors">
          <span className="text-[#c778dd]">#</span>home
        </a>
            <a href="#works" className="hover:text-[#c778dd] transition-colors">
              <span className="text-[#c778dd]">#</span>works
            </a>
            <a href="#about-me" className="hover:text-[#c778dd] transition-colors">
              <span className="text-[#c778dd]">#</span>about-me
            </a>
            <a href="#contacts" className="hover:text-[#c778dd] transition-colors">
              <span className="text-[#c778dd]">#</span>contacts
            </a>
          </>
        )}

        <select className="bg-transparent border-none text-gray-400 focus:outline-none cursor-pointer">
          <option value="en" className="bg-[#282c33]">EN</option>
        </select>
      </nav>
    </header>
  );
}