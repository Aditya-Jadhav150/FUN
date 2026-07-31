import React, { useState, useCallback, useEffect } from 'react';

export default function TouchRipple() {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((event) => {
    const isTouchEvent = event.type === 'touchstart';
    const clientX = isTouchEvent ? event.touches[0].clientX : event.clientX;
    const clientY = isTouchEvent ? event.touches[0].clientY : event.clientY;

    const newRipple = {
      x: clientX,
      y: clientY,
      id: Date.now(),
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);
  }, []);

  useEffect(() => {
    window.addEventListener('mousedown', addRipple);
    window.addEventListener('touchstart', addRipple, { passive: true });
    
    return () => {
      window.removeEventListener('mousedown', addRipple);
      window.removeEventListener('touchstart', addRipple);
    };
  }, [addRipple]);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
      {ripples.map((ripple) => (
        <Ripple 
          key={ripple.id} 
          x={ripple.x} 
          y={ripple.y} 
          onComplete={() => {
            setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
          }}
        />
      ))}
      <style>{`
        @keyframes ripple-effect {
          0% {
            transform: scale(0);
            opacity: 0.3;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple-effect 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
}

function Ripple({ x, y, onComplete }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className="absolute bg-white rounded-full animate-ripple pointer-events-none"
      style={{
        left: x - 20,
        top: y - 20,
        width: 40,
        height: 40,
        transformOrigin: 'center center',
      }}
    />
  );
}
