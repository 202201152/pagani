import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const { setPreloaded } = useAppStore();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Check if already preloaded in this session
    const hasPreloaded = sessionStorage.getItem('pagani-preloaded');
    if (hasPreloaded) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();

      // Set initial state
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          setPreloaded(true);
          sessionStorage.setItem('pagani-preloaded', 'true');

          // Reveal animation - clip upward
          gsap.to(containerRef.current, {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 0.7,
            ease: 'expo.inOut',
            onComplete,
          });
        },
      });

      // Draw the logo path
      tl.fromTo(
        path,
        { strokeDashoffset: pathLength },
        {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: 'power2.inOut',
        },
        0
      );

      // Count up animation for percentage
      tl.to(
        {},
        {
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            const progress = Math.round(tl.progress() * 100);
            setCounter(progress);
          },
        },
        0
      );

      // Pause at 100%
      tl.to({}, { duration: 0.3 }, '+=0');
    });

    return () => ctx.revert();
  }, [onComplete, setPreloaded]);

  return (
    <div ref={containerRef} className="preloader">
      {/* Pagani "P" Horseshoe Logo - Simplified SVG Path */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Stylized P logo - horseshoe shape inspired by Pagani badge */}
        <path
          ref={pathRef}
          d="M 50 10
             C 70 10, 85 25, 85 50
             C 85 75, 70 90, 50 90
             C 35 90, 22 80, 18 65
             L 35 60
             C 37 70, 42 75, 50 75
             C 62 75, 70 65, 70 50
             C 70 35, 62 25, 50 25
             C 40 25, 32 32, 30 42
             L 15 38
             C 18 22, 32 10, 50 10 Z"
          className="preloader-path"
        />
      </svg>

      {/* Counter */}
      <div ref={counterRef} className="preloader-counter">
        {String(counter).padStart(2, '0')}%
      </div>
    </div>
  );
}
