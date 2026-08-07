import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function GameScratchCard({ onComplete }) {
  const canvasRef = useRef(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width = 320;
    const height = canvas.height = 240;

    // Fill metallic gold foil layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#fde68a');
    gradient.addColorStop(0.5, '#fb7185');
    gradient.addColorStop(1, '#fef3c7');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#0a0512';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ Scratch Here to Reveal Secret ✨', width / 2, height / 2);
  }, []);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratched percentage
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const percent = Math.round((transparent / (canvas.width * canvas.height)) * 100);
    setScratchPercent(percent);

    if (percent > 40) {
      setIsUnlocked(true);
    }
  };

  const handlePointerMove = (e) => {
    if (e.buttons !== 1 && e.type !== 'touchmove') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    scratch(x, y);
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between p-6 select-none text-center">
      {/* Header */}
      <div className="relative z-10 max-w-md w-full mt-4">
        <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">Game 3 of 5</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-rose-gradient mt-1 mb-2">
          Scratch & Reveal ✨
        </h2>
        <p className="text-sm font-light text-slate-300 mb-4">
          Rub your finger or cursor over the golden ticket to reveal the secret note!
        </p>
      </div>

      {/* Scratch Ticket Container (Uncovered & Fully Visible) */}
      <div className="relative max-w-sm w-full h-[260px] rounded-3xl glass-panel-romantic p-3 flex flex-col items-center justify-center border border-rose-300/40 shadow-2xl my-auto z-10 overflow-hidden">
        {/* Hidden Secret Message Underneath */}
        <div className="absolute inset-4 rounded-2xl bg-rose-950/90 flex flex-col items-center justify-center p-6 text-center z-0 border border-rose-400/30">
          <span className="text-3xl mb-2">📜</span>
          <h3 className="text-xl font-serif italic text-gold-gradient mb-2">
            "You are my favorite thought, every single day."
          </h3>
          <p className="text-xs text-rose-200/80 font-light">
            No matter how busy life gets, you're always the best part of it.
          </p>
        </div>

        {/* Scratch Canvas Overlay */}
        <canvas
          ref={canvasRef}
          onMouseMove={handlePointerMove}
          onTouchMove={handlePointerMove}
          className="relative z-10 rounded-2xl cursor-pointer touch-none"
        />
      </div>

      {/* Non-intrusive Action Button below the card */}
      <div className="relative z-20 pb-6 min-h-[70px] flex items-center justify-center">
        <AnimatePresence>
          {isUnlocked ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10 }}
              onClick={onComplete}
              className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Game 4 &rarr;
            </motion.button>
          ) : (
            <span className="text-xs text-rose-300/60 uppercase tracking-widest">
              {scratchPercent}% Scratched (Keep rubbing!)
            </span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
