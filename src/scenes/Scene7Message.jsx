import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene7Message({ content, sceneColors }) {
  const { message = "Sorry, Manjusha", subtext = "I promise to be better, because you deserve the best", emoji = "💖" } = content || {};
  const [isUnsealed, setIsUnsealed] = useState(false);
  const [tapPetals, setTapPetals] = useState([]);

  const handleTapScreen = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTapPetals(prev => [...prev, { id: Date.now(), x, y }]);
  };

  return (
    <div
      onClick={handleTapScreen}
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-6 text-center select-none cursor-pointer overflow-hidden"
    >
      {/* Tap Heart Bursts */}
      {tapPetals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 1.5, y: -40 }}
          transition={{ duration: 1 }}
          className="absolute text-2xl pointer-events-none z-30"
          style={{ left: petal.x, top: petal.y }}
        >
          🌸
        </motion.div>
      ))}

      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/40 via-slate-950 to-rose-950/50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full blur-[140px] bg-rose-500/20 pointer-events-none animate-romantic-pulse" />

      <div className="relative z-10 max-w-lg w-full">
        {!isUnsealed ? (
          /* Sealed Wax Envelope Interaction */
          <motion.div
            onClick={(e) => {
              e.stopPropagation();
              setIsUnsealed(true);
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel-romantic p-10 rounded-3xl cursor-pointer flex flex-col items-center shadow-[0_20px_60px_rgba(0,0,0,0.6)] group border border-rose-300/30"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <div className="w-16 h-16 rounded-full bg-rose-500/30 border border-rose-400/50 flex items-center justify-center text-3xl shadow-inner mb-4 group-hover:scale-110 transition-transform">
              💌
            </div>
            <h2 className="text-2xl md:text-3xl font-serif italic text-rose-gradient mb-2">
              For Manjusha
            </h2>
            <p className="text-xs text-rose-300/70 uppercase tracking-widest mt-2 animate-pulse">
              Tap wax seal to open letter
            </p>
          </motion.div>
        ) : (
          /* Unsealed Elegant Letter Reveal */
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel-romantic p-8 md:p-10 rounded-3xl border border-rose-300/30 shadow-[0_25px_70px_rgba(0,0,0,0.7)] flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl mb-6 drop-shadow-[0_0_20px_rgba(251,113,133,0.6)]"
            >
              {emoji}
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-serif italic text-gold-gradient mb-6 leading-tight">
              {message}
            </h2>

            <p className="text-base md:text-xl font-light text-rose-100 leading-relaxed max-w-md">
              "{subtext}"
            </p>

            <span className="text-xs text-rose-300/60 uppercase tracking-widest mt-8">
              Tap anywhere for petals ✨
            </span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
