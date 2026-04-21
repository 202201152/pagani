import { EffectComposer } from '@react-three/postprocessing';
import { Bloom, Vignette, DepthOfField, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

export function PostFX() {
  return (
    <EffectComposer
      disableNormalPass={true}
      disableSSAO={true}
      multisampling={4}
    >
      {/* Bloom on headlights and taillights */}
      <Bloom
        luminanceThreshold={0.6}
        luminanceSmoothing={0.4}
        intensity={0.8}
        mipmapBlur={true}
      />

      {/* Vignette - darkens edges, focuses attention on center */}
      <Vignette
        eskil={false}
        offset={0.3}
        darkness={0.7}
      />

      {/* Subtle depth of field - only noticeable on close-ups */}
      <DepthOfField
        focusDistance={0}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      />

      {/* Very subtle film grain for cinematic feel */}
      <Noise
        opacity={0.02}
        blendFunction={BlendFunction.OVERLAY}
      />
    </EffectComposer>
  );
}
