import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicNotFound() {
  const navigate = useNavigate();
  const [glitch, setGlitch] = useState(false);

  // हर 3 सेकंड में एक बार 'ग्लिच' (झटका) आएगा
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-[#c778dd] font-mono overflow-hidden cursor-crosshair">
      
      {/* Background Matrix-like Lines */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Glitch Overlay Effect */}
      {glitch && (
        <div className="absolute inset-0 bg-[#c778dd]/10 animate-pulse z-50 pointer-events-none" />
      )}

      {/* Main Content */}
      <div className="z-10 text-center">
        <motion.div 
          animate={{ x: glitch ? [-10, 10, -10, 0] : 0 }}
          transition={{ duration: 0.1 }}
          className="text-[250px] font-black leading-none drop-shadow-[0_0_15px_#c778dd]"
        >
          404
        </motion.div>

        <h1 className="text-2xl tracking-[0.5em] text-white">CONNECTION_TERMINATED</h1>
        
  

        <motion.button
          whileHover={{ backgroundColor: "#c778dd", color: "#000", scale: 1.1 }}
          onClick={() => navigate('/')}
          className="mt-10 border border-[#c778dd] px-12 py-3 font-bold hover:shadow-[0_0_20px_#c778dd] transition-all"
        >
          EXECUTE_RECOVERY_PROTOCOL
        </motion.button>
      </div>

      {/* Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.1) 50%)', backgroundSize: '100% 4px' }}>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-5 text-[8px] uppercase tracking-widest text-gray-500">
        System Status: Critical // IP Restricted // Authorized access only
      </div>
    </div>
  );
}