import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const REEL1 = ['Your Smile', 'Your Laugh', 'Your Kindness', 'Your Voice', 'Your Hugs'];
const REEL2 = ['Lights Up', 'Warms', 'Brightens', 'Makes Perfect', 'Completes'];
const REEL3 = ['My Whole World 🌍', 'My Entire Day 💖', 'Every Single Moment ✨', 'My Heart Always 🌹', 'Everything 💎'];

export default function GameSlotMachine({ onComplete }) {
  const [reel1, setReel1] = useState('Your Smile');
  const [reel2, setReel2] = useState('Lights Up');
  const [reel3, setReel3] = useState('My Whole World 🌍');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    let counter = 0;
    const interval = setInterval(() => {
      setReel1(REEL1[Math.floor(Math.random() * REEL1.length)]);
      setReel2(REEL2[Math.floor(Math.random() * REEL2.length)]);
      setReel3(REEL3[Math.floor(Math.random() * REEL3.length)]);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        setIsSpinning(false);
        setSpinCount(prev => prev + 1);
      }
    }, 90);
  };

  const isWon = spinCount >= 3;

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between p-6 select-none text-center">
      {/* Header */}
      <div className="relative z-10 max-w-md w-full mt-4">
        <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">Game 4 of 5</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-rose-gradient mt-1 mb-2">
          Love Slot Machine 🎰
        </h2>
        <p className="text-sm font-light text-slate-300 mb-4">
          Spin the reels 3 times to generate endless sweet compliments!
        </p>
      </div>

      {/* Slot Reels Container */}
      <div className="relative max-w-md w-full glass-panel-romantic rounded-3xl p-6 shadow-2xl my-auto z-10 border border-rose-300/40">
        <div className="grid grid-cols-3 gap-2 bg-slate-950/80 p-4 rounded-2xl border border-rose-400/30 mb-6">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 min-h-[90px]">
            <motion.span animate={isSpinning ? { y: [-5, 5, -5] } : {}} className="text-sm md:text-base font-serif italic text-rose-200">
              {reel1}
            </motion.span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 min-h-[90px]">
            <motion.span animate={isSpinning ? { y: [-5, 5, -5] } : {}} className="text-sm md:text-base font-serif italic text-amber-200">
              {reel2}
            </motion.span>
          </div>
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 min-h-[90px]">
            <motion.span animate={isSpinning ? { y: [-5, 5, -5] } : {}} className="text-sm md:text-base font-serif italic text-pink-200">
              {reel3}
            </motion.span>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400 disabled:opacity-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {isSpinning ? "Spinning Love Reels…" : "🎰 Spin Love Machine"}
        </motion.button>
      </div>

      {/* Level Completion */}
      <AnimatePresence>
        {isWon && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-x-6 top-1/3 glass-panel-romantic rounded-3xl p-8 shadow-2xl z-30 max-w-md mx-auto"
          >
            <div className="text-6xl mb-3 animate-bounce">🎰</div>
            <h3 className="text-3xl font-serif italic text-gold-gradient mb-2">
              Stage 4 Cleared!
            </h3>
            <p className="text-sm text-rose-100 font-light mb-6">
              You unlocked all romantic slot lines! Final Us Quiz is now unlocked.
            </p>

            <motion.button
              type="button"
              onClick={onComplete}
              className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.6)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Play Final Quiz &rarr;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 text-xs text-rose-300/60 uppercase tracking-widest pb-4">
        {isWon ? "Level Complete" : `Spun ${spinCount} of 3 Times`}
      </div>
    </div>
  );
}
