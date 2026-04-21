import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Box3 } from '@react-three/drei';
import * as THREE from 'three';
import { useAppStore } from '../../store/useAppStore';
import { CAMERA_POSITIONS, MODEL_PATH, SCROLL_CONFIG, ROTATION_SECTION } from '../../lib/constants';

export function CarModel() {
  const groupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);
  const { camera, clock } = useThree();

  const {
    currentCameraPosition,
    isInRotationSection,
    rotationProgress,
    mouseX,
    mouseY,
  } = useAppStore();

  // Load model
  const { scene } = useGLTF(MODEL_PATH);

  // Clone scene to avoid mutating original
  const model = useMemo(() => scene.clone(), [scene]);

  // Center and scale model on load
  useEffect(() => {
    if (!modelRef.current) return;

    const box = new Box3().setFromObject(modelRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // Center the model
    modelRef.current.position.sub(center);

    // Scale to normalize (car should be ~4 units wide)
    const targetWidth = 4;
    const scale = targetWidth / size.x;
    modelRef.current.scale.setScalar(scale);

    // Re-center after scaling
    const newBox = new Box3().setFromObject(modelRef.current);
    const newCenter = newBox.getCenter(new THREE.Vector3());
    modelRef.current.position.sub(newCenter);
  }, [model]);

  // Target camera position based on current page
  const targetPosition = useMemo(
    () => new THREE.Vector3(...CAMERA_POSITIONS[currentCameraPosition].position),
    [currentCameraPosition]
  );

  const targetLookAt = useMemo(
    () => new THREE.Vector3(...CAMERA_POSITIONS[currentCameraPosition].lookAt),
    [currentCameraPosition]
  );

  // Animation loop
  useFrame((state, delta) => {
    if (!groupRef.current || !modelRef.current) return;

    const elapsed = clock.getElapsedTime();

    // Floating animation - always active
    const floatY = Math.sin(elapsed * SCROLL_CONFIG.floatFrequency) * SCROLL_CONFIG.floatAmplitude;
    modelRef.current.position.y = THREE.MathUtils.lerp(
      modelRef.current.position.y,
      floatY,
      0.05
    );

    // Mouse parallax (only when not in rotation section)
    if (!isInRotationSection) {
      const targetRotY = mouseX * 0.08;
      const targetRotX = mouseY * 0.08;
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotY,
        SCROLL_CONFIG.mouseLerp
      );
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        targetRotX,
        SCROLL_CONFIG.mouseLerp
      );
    }

    // Rotation section - scroll-driven rotation
    if (isInRotationSection) {
      const targetRotation = rotationProgress * ROTATION_SECTION.totalRotation;
      modelRef.current.rotation.y = THREE.MathUtils.lerp(
        modelRef.current.rotation.y,
        targetRotation,
        0.1
      );

      // Reset mouse parallax when in rotation section
      modelRef.current.rotation.x = THREE.MathUtils.lerp(
        modelRef.current.rotation.x,
        0,
        0.05
      );
    }

    // Camera transitions
    const currentPos = camera.position.clone();
    camera.position.lerp(targetPosition, delta * 1.5);
    camera.lookAt(targetLookAt);
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} ref={modelRef} />
    </group>
  );
}

useGLTF.preload('/assets/model/utopia.glb');
