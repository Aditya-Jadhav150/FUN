import React from 'react';
import { motion } from 'motion/react';

export default function GlassCard({ children, className = '', sceneColors = {}, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{ 
        y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
        opacity: { duration: 0.8 }
      }}
      whileTap={{ scale: 0.98, rotateX: 5, rotateY: 5 }}
      style={{
        boxShadow: sceneColors.glow ? `0 0 20px ${sceneColors.glow}40` : undefined
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="relative z-10 p-6 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
