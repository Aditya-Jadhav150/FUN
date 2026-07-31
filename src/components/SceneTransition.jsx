import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function SceneTransition({ children, sceneKey, className = '' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sceneKey}
        className={`w-full h-full ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          mass: 1,
          opacity: { duration: 0.5 }
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
