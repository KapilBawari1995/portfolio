import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import  weblogo from '../../assets/weblogo.svg';
export default function Navbar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isOpen, setIsOpen] = useState(false); 
  

  return (
    <header className="flex justify-between items-center px-6 py-6 max-w-6xl mx-auto z-50 relative">
      <div className="flex items-center gap-2 font-bold text-lg tracking-wider cursor-pointer">
       <span className="text-[#c778dd] flex items-center gap-2">
  <img 
    className="w-[25px] h-[25px] object-contain" 
    src={weblogo} 
    alt="Logo" 
  /> 
  <span className="text-white font-bold">Kapil Bawari</span>
</span>
      </div>

      <button 
        className="md:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

   
      <nav className={`${
          isOpen ? "flex flex-col absolute top-20 left-0 w-full bg-[#1a1c22] p-8 gap-6 border-b border-gray-700" : "hidden md:flex"
        } md:flex-row md:static md:w-auto md:bg-transparent md:p-0 items-center gap-8 text-gray-400 text-sm`}
      >
        {isHomePage && (
          <>
            <a href="/" onClick={() => setIsOpen(false)} className="text-white font-medium hover:text-[#c778dd]">
              <span className="text-[#c778dd]">#</span>home
            </a>
            <a href="#works" onClick={() => setIsOpen(false)} className="hover:text-[#c778dd]">
              <span className="text-[#c778dd]">#</span>works
            </a>
            <a href="#about-me" onClick={() => setIsOpen(false)} className="hover:text-[#c778dd]">
              <span className="text-[#c778dd]">#</span>about-me
            </a>
            <a href="#contacts" onClick={() => setIsOpen(false)} className="hover:text-[#c778dd]">
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