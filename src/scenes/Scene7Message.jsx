import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Scene7Message({ content, sceneColors, onComplete }) {
  const [messageComplete, setMessageComplete] = useState(false);
  const [tapBursts, setTapBursts] = useState([]);
  
  // Background floating hearts
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    // Generate static random positions for floating hearts once on mount
    const hearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 4 + 4}s`,
      animationDelay: `${Math.random() * 4}s`,
      fontSize: `${Math.random() * 1.5 + 1}rem`,
    }));
    setFloatingHearts(hearts);
  }, []);

  const handleTap = (e) => {
    // Get tap coordinates relative to viewport
    const x = e.clientX;
    const y = e.clientY;
    
    const burstId = Date.now();
    const burstHearts = Array.from({ length: 6 }).map((_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const distance = 60 + Math.random() * 40;
      return {
        id: `${burstId}-${i}`,
        x,
        y,
        targetX: x + Math.cos(angle) * distance,
        targetY: y + Math.sin(angle) * distance,
        rotation: Math.random() * 360,
      };
    });

    setTapBursts((prev) => [...prev, { id: burstId, hearts: burstHearts }]);

    // Cleanup bursts after animation
    setTimeout(() => {
      setTapBursts((prev) => prev.filter(burst => burst.id !== burstId));
    }, 1000);
  };

  const messageLetters = content.message?.split("") || [];

  return (
    <div 
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center p-8 overflow-y-auto pb-20 font-serif bg-black"
      style={{
        background: `radial-gradient(circle at center, ${sceneColors?.primary || '#ffb6c1'}40, #000000)`,
      }}
      onClick={handleTap}
    >
      {/* CSS Keyframes injected for floating hearts */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatUp {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-20vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}} />

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-0 text-rose-300 opacity-50"
            style={{
              left: heart.left,
              fontSize: heart.fontSize,
              animation: `floatUp ${heart.animationDuration} linear infinite`,
              animationDelay: heart.animationDelay,
            }}
          >
            {content.emoji || "💖"}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center justify-center pointer-events-none text-center gap-8">
        
        {/* Main Message */}
        <div className="text-4xl md:text-6xl font-bold leading-tight tracking-wide text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          {messageLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              onAnimationComplete={() => {
                if (i === messageLetters.length - 1) {
                  setMessageComplete(true);
                }
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        {/* Pulsing Emoji */}
        <AnimatePresence>
          {messageComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: 1, 
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                opacity: { duration: 1 },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-6xl md:text-8xl mt-4"
            >
              {content.emoji}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtext */}
        <AnimatePresence>
          {messageComplete && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-xl md:text-3xl text-white/80 font-light mt-8 tracking-wider"
            >
              {content.subtext}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Tap Burst Animations */}
      {tapBursts.map((burst) => (
        <React.Fragment key={burst.id}>
          {burst.hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, scale: 0.5, x: heart.x, y: heart.y }}
              animate={{ 
                opacity: 0, 
                scale: 1.5, 
                x: heart.targetX, 
                y: heart.targetY,
                rotate: heart.rotation
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="fixed text-2xl pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
            >
              {content.emoji || "💖"}
            </motion.div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
