import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const QUESTIONS = [
  {
    id: 1,
    question: "What is my absolute favorite thing about you?",
    options: ["Your smile 💖", "Your laugh ✨", "Your kind heart 🌸", "Literally EVERYTHING! 😍"],
    correctIndex: 3,
  },
  {
    id: 2,
    question: "How much do you mean to me?",
    options: ["A lot!", "More than words can say ✨", "To the moon & back 🌙", "Infinity & beyond! 🚀"],
    correctIndex: 3,
  },
  {
    id: 3,
    question: "Will you forgive me?",
    options: ["Yes, of course! 💖", "A million times yes! 💕", "Forever & always! 🌹", "All of the above! 🥰"],
    correctIndex: 3,
  }
];

export default function GameTriviaQuiz({ onComplete }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const qData = QUESTIONS[currentQ];

  const handleSelectOption = (index) => {
    setSelectedOpt(index);
    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(prev => prev + 1);
        setSelectedOpt(null);
      } else {
        setIsCompleted(true);
      }
    }, 700);
  };

  return (
    <div className="relative w-full min-h-[100dvh] flex flex-col items-center justify-between p-6 select-none text-center">
      {/* Header */}
      <div className="relative z-10 max-w-md w-full mt-4">
        <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">Game 5 of 5</span>
        <h2 className="text-4xl md:text-5xl font-serif italic text-rose-gradient mt-1 mb-2">
          Us Trivia Quiz ❓
        </h2>
        <p className="text-sm font-light text-slate-300 mb-4">
          Answer 3 playful questions to unlock the Grand Romantic Finale!
        </p>
      </div>

      {/* Quiz Card */}
      {!isCompleted && qData && (
        <motion.div
          key={qData.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="relative max-w-md w-full glass-panel-romantic rounded-3xl p-6 shadow-2xl my-auto z-10 border border-rose-300/40"
        >
          <span className="text-xs text-rose-300/70 font-mono uppercase tracking-widest">Question {currentQ + 1} of 3</span>
          <h3 className="text-2xl md:text-3xl font-serif italic text-rose-100 mt-2 mb-6">
            {qData.question}
          </h3>

          <div className="flex flex-col gap-3">
            {qData.options.map((opt, i) => (
              <motion.button
                type="button"
                key={i}
                onClick={() => handleSelectOption(i)}
                className={`w-full py-3.5 px-4 rounded-xl font-medium text-base text-rose-100 glass-panel border transition-all focus-visible:ring-2 focus-visible:ring-rose-400 ${selectedOpt === i ? 'bg-rose-500 text-white border-rose-300 shadow-[0_0_20px_rgba(251,113,133,0.6)]' : 'border-white/10 hover:border-rose-400/40'}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Grand Completion Screen */}
      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-x-6 top-1/4 glass-panel-romantic rounded-3xl p-8 shadow-2xl z-30 max-w-md mx-auto"
          >
            <div className="text-6xl mb-3 animate-bounce">👑</div>
            <h3 className="text-3xl md:text-4xl font-serif italic text-gold-gradient mb-2">
              All 5 Games Cleared!
            </h3>
            <p className="text-sm text-rose-100 font-light mb-6">
              You passed every single stage! The Grand Romantic Sealed Letter is now unlocked.
            </p>

            <motion.button
              type="button"
              onClick={onComplete}
              className="px-10 py-4 rounded-full font-medium text-lg text-white bg-rose-500 hover:bg-rose-400 shadow-[0_0_35px_rgba(251,113,133,0.8)] transition-all focus-visible:ring-2 focus-visible:ring-rose-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Open Grand Finale &rarr;
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 text-xs text-rose-300/60 uppercase tracking-widest pb-4">
        {isCompleted ? "All Games Complete!" : `Question ${currentQ + 1} of 3`}
      </div>
    </div>
  );
}
