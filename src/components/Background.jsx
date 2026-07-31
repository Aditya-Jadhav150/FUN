import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const ParticleField = ({ colorScheme }) => {
  const ref = useRef();
  const count = 150;
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return positions;
  }, [count]);

  const colors = useMemo(() => {
    const colorsArr = new Float32Array(count * 3);
    const color1 = new THREE.Color(colorScheme.primary || '#ffffff');
    const color2 = new THREE.Color(colorScheme.secondary || '#ffffff');
    
    for (let i = 0; i < count; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colorsArr[i * 3] = mixedColor.r;
      colorsArr[i * 3 + 1] = mixedColor.g;
      colorsArr[i * 3 + 2] = mixedColor.b;
    }
    return colorsArr;
  }, [count, colorScheme]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
      ref.current.rotation.y += 0.002;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export default function Background({ colorScheme = { primary: '#4a90e2', secondary: '#9013fe' } }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div 
        className="absolute inset-0 transition-colors duration-1000 opacity-30 mix-blend-overlay"
        style={{
          background: `radial-gradient(circle at center, ${colorScheme.primary} 0%, transparent 70%)`
        }}
      />
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <ParticleField colorScheme={colorScheme} />
        </Suspense>
      </Canvas>
    </div>
  );
}
