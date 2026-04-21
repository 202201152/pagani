import { Environment, OrbitControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import * as THREE from 'three';

export function Lighting() {
  const { isInRotationSection, setIsInRotationSection } = useAppStore();
  const controlsRef = useRef<any>(null);

  // Handle drag interaction for rotation section
  useEffect(() => {
    const handleDragStart = () => {
      if (isInRotationSection) {
        // Temporarily disable scroll control when user drags
        if (controlsRef.current) {
          controlsRef.current.enabled = true;
        }
      }
    };

    const handleDragEnd = () => {
      // Re-enable scroll control after 3s idle
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enabled = false;
        }
      }, 3000);
    };

    window.addEventListener('pointerdown', handleDragStart);
    window.addEventListener('pointerup', handleDragEnd);

    return () => {
      window.removeEventListener('pointerdown', handleDragStart);
      window.removeEventListener('pointerup', handleDragEnd);
    };
  }, [isInRotationSection]);

  return (
    <>
      {/* Studio environment for realistic reflections on pearl paint */}
      <Environment
        preset="studio"
        background={false}
        blur={0.8}
        intensity={1}
      />

      {/* Ambient light - base illumination */}
      <ambientLight intensity={0.3} />

      {/* Key light - warm, from front-right */}
      <directionalLight
        position={[5, 8, 3]}
        intensity={1.2}
        color="#FFF8EE"
        castShadow
      />

      {/* Fill light - cool blue, from left */}
      <directionalLight
        position={[-4, 4, -2]}
        intensity={0.4}
        color="#C8D8FF"
      />

      {/* Gold underglow - accentuates the car from below */}
      <pointLight
        position={[0, -1, 0]}
        intensity={0.8}
        color="#C9A84C"
      />

      {/* Top spotlight - highlights the roof and hood */}
      <spotLight
        position={[0, 6, 0]}
        intensity={0.6}
        angle={0.3}
        penumbra={0.8}
      />

      {/* Rim lights - edge definition */}
      <pointLight position={[6, 2, -4]} intensity={0.5} color="#C9A84C" />
      <pointLight position={[-6, 2, -4]} intensity={0.5} color="#C9A84C" />

      {/* OrbitControls for manual rotation in rotation section */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        dampingFactor={0.05}
        minPolarAngle={5 * (Math.PI / 180)}
        maxPolarAngle={80 * (Math.PI / 180)}
        enabled={false}
        makeDefault={false}
      />
    </>
  );
}
