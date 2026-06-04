import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function PublicNotFound() {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-[#c778dd] font-mono overflow-hidden cursor-crosshair px-4">

      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      {glitch && (
        <div className="absolute inset-0 bg-[#c778dd]/10 animate-pulse z-50 pointer-events-none" />
      )}

      <div className="z-10 text-center w-full max-w-lg">
        <motion.div 
          animate={{ x: glitch ? [-10, 10, -10, 0] : 0 }}
          transition={{ duration: 0.1 }}
          className="text-[120px] md:text-[250px] font-black leading-none drop-shadow-[0_0_15px_#c778dd]"
        >
          404
        </motion.div>

        <h1 className="text-sm md:text-2xl tracking-[0.2em] md:tracking-[0.5em] text-white mt-4">
          CONNECTION_TERMINATED
        </h1>
        
        <motion.button
          whileHover={{ backgroundColor: "#c778dd", color: "#000", scale: 1.05 }}
          onClick={() => navigate('/')}
          className="mt-8 md:mt-10 border border-[#c778dd] px-8 md:px-12 py-3 text-sm md:text-base font-bold hover:shadow-[0_0_20px_#c778dd] transition-all"
        >
          EXECUTE_RECOVERY_PROTOCOL
        </motion.button>
      </div>
      
    
      <div className="absolute bottom-5 text-[8px] md:text-[10px] uppercase tracking-widest text-gray-500 px-2 text-center">
        System Status: Critical // IP Restricted // Authorized access only
      </div>
    </div>
  );
}