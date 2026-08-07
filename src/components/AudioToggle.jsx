import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

export default function AudioToggle({ audioSrc = '/audio/music.mp3' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    // Check if audio file exists
    fetch(audioSrc, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          setHasAudio(true);
        }
      })
      .catch(() => setHasAudio(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  const toggleAudio = () => {
    if (!audioRef.current || !hasAudio) {
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.warn("Autoplay blocked or audio unavailable:", err);
        setIsPlaying(false);
      });
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggleAudio}
      aria-label={isPlaying ? "Mute audio" : "Unmute audio"}
      className="fixed top-6 right-6 z-50 p-3.5 rounded-full glass-panel-romantic text-white shadow-xl hover:scale-105 transition-transform flex items-center justify-center focus-visible:ring-2 focus-visible:ring-rose-400"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? (
        <span className="flex items-center gap-1.5 px-1">
          <span className="w-1 h-3.5 bg-rose-400 rounded-full animate-pulse" />
          <span className="w-1 h-5 bg-pink-300 rounded-full animate-pulse delay-75" />
          <span className="w-1 h-2.5 bg-rose-400 rounded-full animate-pulse delay-150" />
        </span>
      ) : (
        <svg className="w-5 h-5 text-rose-300/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
        </svg>
      )}
    </motion.button>
  );
}
