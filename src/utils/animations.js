import gsap from 'gsap';

export const sceneColors = {
  scene1: { primary: '#0a0a0a', secondary: '#050505', accent: '#3b0764', glow: 'rgba(88, 28, 135, 0.4)' },
  scene2: { primary: '#1a0b2e', secondary: '#0f0518', accent: '#7c3aed', glow: 'rgba(124, 58, 237, 0.4)' },
  scene3: { primary: '#1e1b4b', secondary: '#0f172a', accent: '#4f46e5', glow: 'rgba(79, 70, 229, 0.4)' },
  scene4: { primary: '#0f172a', secondary: '#020617', accent: '#2563eb', glow: 'rgba(37, 99, 235, 0.4)' },
  scene5: { primary: '#020617', secondary: '#000000', accent: '#0369a1', glow: 'rgba(14, 165, 233, 0.4)' },
  scene6: { primary: '#2a0a18', secondary: '#15050c', accent: '#be123c', glow: 'rgba(225, 29, 72, 0.4)' },
  scene7: { primary: '#3f1a14', secondary: '#230c08', accent: '#b45309', glow: 'rgba(217, 119, 6, 0.4)' },
};

export const eases = {
  snappy: 'power3.out',
  smooth: 'power2.inOut',
  slowMotion: 'expo.inOut',
  bounce: 'back.out(1.7)'
};

/**
 * Stagger reveal animation for elements
 */
export const staggerReveal = (gsapContext, selector, options = {}) => {
  const {
    y = 30,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = eases.snappy,
    delay = 0,
    onComplete = null
  } = options;

  return gsapContext.from(selector, {
    y,
    opacity,
    duration,
    stagger,
    ease,
    delay,
    onComplete,
    clearProps: 'all' // Clean up after animation
  });
};

/**
 * Animate text letter by letter
 */
export const letterByLetter = (gsapContext, selector, options = {}) => {
  const {
    duration = 0.05,
    stagger = 0.03,
    ease = 'none',
    delay = 0
  } = options;

  return gsapContext.from(selector, {
    opacity: 0,
    y: 10,
    duration,
    stagger,
    ease,
    delay
  });
};
