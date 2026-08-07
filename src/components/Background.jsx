import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StarParticleField = ({ colorScheme }) => {
  const ref = useRef();
  const count = 220;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;
    }
    return pos;
  }, [count]);

  const colors = useMemo(() => {
    const col = new Float32Array(count * 3);
    const primary = new THREE.Color(colorScheme.accent || '#fb7185');
    const secondary = new THREE.Color('#fef3c7');

    for (let i = 0; i < count; i++) {
      const mixed = primary.clone().lerp(secondary, Math.random() * 0.7);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return col;
  }, [count, colorScheme]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.16}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default function Background({ colorScheme = { primary: '#0a0512', secondary: '#12091f', accent: '#fb7185', glow: 'rgba(251,113,133,0.4)' } }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dynamic Romantic Radial Light Leaks */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] opacity-40 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${colorScheme.glow || 'rgba(251,113,133,0.4)'} 0%, rgba(10,5,18,0) 70%)`
        }}
      />
      <div
        className="absolute bottom-10 right-10 w-[60vw] h-[60vw] max-w-[400px] max-h-[400px] rounded-full blur-[120px] opacity-25 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${colorScheme.accent || '#fb7185'} 0%, rgba(10,5,18,0) 70%)`
        }}
      />

      {/* 3D Particle Starfield */}
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <StarParticleField colorScheme={colorScheme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
