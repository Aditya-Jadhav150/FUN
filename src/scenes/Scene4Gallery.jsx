import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Scene4Gallery({ content, sceneColors, onComplete }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fallback content in case props are missing
  const title = content?.title || "A Special Moment";
  const image = content?.images?.[0] || "";
  const caption = content?.caption || "A beautiful memory.";

  return (
    <div 
      className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center py-12 px-6 overflow-y-auto text-white pb-20" 
      style={{ backgroundColor: '#000' }}
    >
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => {
          const leftPos = Math.random() * 90;
          const delay = Math.random() * 5;
          const duration = Math.random() * 4 + 6;
          return (
            <motion.span
              key={i}
              initial={{ y: '100vh', opacity: 0, x: `${leftPos}vw` }}
              animate={{
                y: '-20vh',
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "linear"
              }}
              className="absolute bottom-0 text-3xl"
              style={{ x: `${leftPos}vw` }}
            >
              ❤️
            </motion.span>
          );
        })}
      </div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-3xl md:text-5xl font-bold text-center z-10"
        style={{ color: sceneColors?.accent || '#fff' }}
      >
        {title}
      </motion.h2>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full my-8 z-10">
        <motion.div
          layoutId="gallery-photo"
          className="cursor-pointer relative rounded-2xl overflow-hidden"
          style={{ 
            boxShadow: `0 0 25px ${sceneColors?.glow || sceneColors?.accent || 'rgba(255,255,255,0.5)'}` 
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.5 }}
          onClick={() => setIsExpanded(true)}
        >
          <motion.img 
            src={image} 
            alt="Gallery focus" 
            className="w-[85vw] md:w-auto max-h-[50vh] object-contain rounded-2xl block pointer-events-none"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-lg md:text-xl text-center max-w-md px-4 font-medium leading-relaxed drop-shadow-md text-white/80"
        >
          {caption}
        </motion.p>
      </div>

      {/* Continue Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        onClick={onComplete}
        className="z-10 px-8 py-3 rounded-full font-semibold text-lg tracking-wider shadow-lg mt-8"
        style={{ 
          backgroundColor: sceneColors?.accent || '#fff',
          color: '#ffffff'
        }}
        whileTap={{ scale: 0.95 }}
      >
        Continue
      </motion.button>

      {/* Expanded View Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              layoutId="gallery-photo"
              className="relative rounded-2xl overflow-hidden w-full max-w-4xl mx-auto flex items-center justify-center"
              style={{ 
                boxShadow: `0 0 50px ${sceneColors?.glow || sceneColors?.accent || 'rgba(255,255,255,0.5)'}` 
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.8}
              onDragEnd={(e, info) => {
                if (Math.abs(info.offset.y) > 100) {
                  setIsExpanded(false);
                }
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={image} 
                alt="Gallery Expanded view" 
                className="w-full h-auto max-h-[85vh] object-contain block pointer-events-none"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
                onClick={() => setIsExpanded(false)}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
