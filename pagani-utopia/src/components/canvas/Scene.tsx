import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { CarModel } from './CarModel';
import { Lighting } from './Lighting';
import { PostFX } from './PostFX';

export function Scene() {
  return (
    <Canvas
      id="canvas-container"
      camera={{ fov: 45, near: 0.1, far: 100, position: [2, 1.5, 5] }}
      dpr={[1, 2]}
      frameloop="demand"
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <CarModel />
        <Lighting />
        <PostFX />
      </Suspense>
    </Canvas>
  );
}
