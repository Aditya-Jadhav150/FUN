import React, { useMemo } from 'react';

export default function FloatingHearts({ count = 12, colors = ['#ff4d4d', '#ff80bf', '#ff9999'] }) {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = 5 + Math.random() * 5;
      const animationDelay = Math.random() * 5;
      const fontSize = 1 + Math.random() * 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      return {
        id: i,
        left,
        animationDuration,
        animationDelay,
        fontSize,
        color
      };
    });
  }, [count, colors]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="absolute bottom-[-10%] animate-float"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.fontSize}rem`,
            color: heart.color,
            animationDuration: `${heart.animationDuration}s`,
            animationDelay: `${heart.animationDelay}s`,
            opacity: 0.6
          }}
        >
          ❤
        </span>
      ))}
      <style>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          50% {
            transform: translateY(-50vh) scale(1.2) translateX(20px);
          }
          100% {
            transform: translateY(-120vh) scale(1) translateX(-20px);
            opacity: 0;
          }
        }
        .animate-float {
          animation-name: float-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  );
}
