import { useEffect, useRef, useCallback } from 'react';

export function useTouchInteraction(ref, options = {}) {
  const { onTap, onDoubleTap, onLongPress, onSwipe } = options;
  
  const touchState = useRef({
    startX: 0,
    startY: 0,
    lastTapTime: 0,
    longPressTimer: null,
    isMoved: false
  });

  const handleTouchStart = useCallback((e) => {
    if (e.touches.length > 1) return; // Ignore multi-touch
    
    const touch = e.touches[0];
    touchState.current.startX = touch.clientX;
    touchState.current.startY = touch.clientY;
    touchState.current.isMoved = false;

    if (onLongPress) {
      touchState.current.longPressTimer = setTimeout(() => {
        if (!touchState.current.isMoved) {
          onLongPress(e);
        }
      }, 500); // 500ms for long press
    }
  }, [onLongPress]);

  const handleTouchMove = useCallback((e) => {
    if (!touchState.current.isMoved) {
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - touchState.current.startX);
      const dy = Math.abs(touch.clientY - touchState.current.startY);
      if (dx > 10 || dy > 10) {
        touchState.current.isMoved = true;
        if (touchState.current.longPressTimer) {
          clearTimeout(touchState.current.longPressTimer);
        }
      }
    }
  }, []);

  const handleTouchEnd = useCallback((e) => {
    if (touchState.current.longPressTimer) {
      clearTimeout(touchState.current.longPressTimer);
    }

    if (e.changedTouches.length === 0) return;

    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchState.current.startX;
    const dy = touch.clientY - touchState.current.startY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (!touchState.current.isMoved) {
      // Tap handling
      const now = Date.now();
      const timeSinceLastTap = now - touchState.current.lastTapTime;
      
      if (timeSinceLastTap < 300 && timeSinceLastTap > 0 && onDoubleTap) {
        onDoubleTap(e);
        touchState.current.lastTapTime = 0; // Reset
      } else {
        if (onTap) onTap(e);
        touchState.current.lastTapTime = now;
      }
    } else if (onSwipe) {
      // Swipe handling
      if (Math.max(absDx, absDy) > 30) {
        if (absDx > absDy) {
          onSwipe(dx > 0 ? 'right' : 'left', e);
        } else {
          onSwipe(dy > 0 ? 'down' : 'up', e);
        }
      }
    }
  }, [onTap, onDoubleTap, onSwipe]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (touchState.current.longPressTimer) {
        clearTimeout(touchState.current.longPressTimer);
      }
    };
  }, [ref, handleTouchStart, handleTouchMove, handleTouchEnd]);
}
