import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

interface PreloaderProps {
  onComplete: () => void;
}

// ─── Critical assets that must be ready before the site is revealed ──────────
const CRITICAL_VIDEOS = [
  '/assets/video/Video%20Project.mp4', // hero video
  '/assets/video/VD_int.mp4',          // carousel 1
  '/assets/video/VD_ext.mp4',          // carousel 2
  '/assets/video/VD_eng.mp4',          // carousel 3
  '/assets/video/VD_full.mp4',         // carousel 4
];

const CRITICAL_IMAGES = [
  '/assets/img/pg_ut.jpg', // hero background image
];

const TOTAL_ASSETS = CRITICAL_VIDEOS.length + CRITICAL_IMAGES.length;

// Safety net — never hang longer than 20s regardless of network
const SAFETY_TIMEOUT_MS = 20_000;

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const { setPreloaded } = useAppStore();

  // Visible counter (0–100)
  const [counter, setCounter] = useState(0);

  // Internal refs — don't trigger re-renders
  const animDoneRef    = useRef(false);
  const assetsDoneRef  = useRef(false);
  const completedRef   = useRef(false);
  const loadedRef      = useRef(0);
  // Keeps a stable ref to the exit-animation callback
  const exitRef = useRef<(() => void) | null>(null);

  // Build exit callback once
  useEffect(() => {
    exitRef.current = () => {
      if (completedRef.current) return;
      completedRef.current = true;
      setPreloaded(true);
      sessionStorage.setItem('pagani-preloaded', 'true');
      gsap.to(containerRef.current, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.7,
        ease: 'expo.inOut',
        onComplete,
      });
    };
  }, [onComplete, setPreloaded]);

  // Try to exit — only succeeds when BOTH flags are true
  const tryExit = useCallback(() => {
    if (animDoneRef.current && assetsDoneRef.current) {
      exitRef.current?.();
    }
  }, []);

  useEffect(() => {
    // Skip on repeat visits (assets are cached, skip straight through)
    if (sessionStorage.getItem('pagani-preloaded')) {
      onComplete();
      return;
    }

    // ─── Asset preloading ─────────────────────────────────────────────────────
    // We use a hidden off-screen container to hold preload elements so the
    // browser buffers them without affecting layout.
    const hiddenEl = document.createElement('div');
    hiddenEl.setAttribute('aria-hidden', 'true');
    hiddenEl.style.cssText =
      'position:fixed;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden;top:0;left:0;z-index:-1;';
    document.body.appendChild(hiddenEl);

    const onOneAssetReady = () => {
      loadedRef.current += 1;
      const assetPct = Math.round((loadedRef.current / TOTAL_ASSETS) * 100);

      // Blend asset progress into the visible counter (never go backwards)
      setCounter((prev) => Math.max(prev, assetPct));

      if (loadedRef.current >= TOTAL_ASSETS) {
        assetsDoneRef.current = true;
        tryExit();
      }
    };

    // Preload videos — canplaythrough = enough buffered to play without pause
    const videoEls: HTMLVideoElement[] = CRITICAL_VIDEOS.map((src) => {
      const v = document.createElement('video');
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.src = src;
      // Fire on either success or error so we never hang
      const done = () => {
        v.removeEventListener('canplaythrough', done);
        v.removeEventListener('error', done);
        onOneAssetReady();
      };
      v.addEventListener('canplaythrough', done);
      v.addEventListener('error', done);
      hiddenEl.appendChild(v);
      v.load();
      return v;
    });

    // Preload images
    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload  = onOneAssetReady;
      img.onerror = onOneAssetReady;
      img.src = src;
    });

    // Safety timeout — never block the user forever on a slow connection
    const safetyTimer = window.setTimeout(() => {
      if (!assetsDoneRef.current) {
        assetsDoneRef.current = true;
        tryExit();
      }
    }, SAFETY_TIMEOUT_MS);

    // ─── Animation ────────────────────────────────────────────────────────────
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (!path) return;

      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      const tl = gsap.timeline({
        onComplete: () => {
          animDoneRef.current = true;
          tryExit();
        },
      });

      // Draw the Pagani logo path
      tl.fromTo(
        path,
        { strokeDashoffset: pathLength },
        { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' },
        0
      );

      // Counter climbs 0 → 100 over the same 1.4s (animation floor)
      tl.to(
        {},
        {
          duration: 1.4,
          ease: 'power2.inOut',
          onUpdate: function (this: gsap.core.Tween) {
            const animPct = Math.round(this.progress() * 100);
            setCounter((prev) => Math.max(prev, animPct));
          },
        },
        0
      );

      // Brief hold at 100% before exit
      tl.to({}, { duration: 0.3 });
    });

    return () => {
      ctx.revert();
      window.clearTimeout(safetyTimer);
      // Clean up hidden preload elements
      videoEls.forEach((v) => {
        v.pause();
        v.src = '';
        v.load();
      });
      document.body.removeChild(hiddenEl);
    };
  }, [onComplete, setPreloaded, tryExit]);

  return (
    <div ref={containerRef} className="preloader">
      {/* Pagani "P" Horseshoe Logo */}
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
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
      <div className="preloader-counter">
        {String(counter).padStart(2, '0')}%
      </div>
    </div>
  );
}
