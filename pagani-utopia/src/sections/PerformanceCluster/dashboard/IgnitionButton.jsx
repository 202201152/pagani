import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function IgnitionButton({ isRunning = false, onToggle }) {
  const rootRef = useRef(null);
  const glowRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    if (!glowRef.current || !dotRef.current) return;

    if (isRunning) {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.to(dotRef.current, {
        backgroundColor: '#f2ca50',
        boxShadow: '0 0 14px rgba(242,202,80,0.9)',
        duration: 0.35,
        ease: 'power2.out',
      });
    } else {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.35, ease: 'power2.out' });
      gsap.to(dotRef.current, {
        backgroundColor: '#ffb4ab',
        boxShadow: '0 0 12px rgba(255,180,171,0.9)',
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }, [isRunning]);

  return (
    <button
      type="button"
      ref={rootRef}
      className="group relative flex h-36 w-36 items-center justify-center rounded-full border border-[#4A4A4A] bg-[#231f17] transition-transform active:translate-y-1"
      style={{
        boxShadow:
          '0 20px 40px rgba(0,0,0,0.9), inset 0 2px 5px rgba(255,255,255,0.15)',
      }}
      aria-label="Engine start"
      onClick={onToggle}
    >
      <div
        className="absolute inset-2 flex flex-col items-center justify-center rounded-full border"
        style={{
          borderColor: 'rgba(61,57,47,0.5)',
          background: '#110e07',
          boxShadow: 'inset 0 6px 15px rgba(0,0,0,0.9)',
        }}
      >
        <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[#ffb4ab]">
          ENGINE
        </span>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border bg-[#16130b] transition-colors duration-300 group-hover:border-[#D4AF37]"
          style={{
            borderColor: 'rgba(61,57,47,0.9)',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.6)',
          }}
        >
          <div
            ref={dotRef}
            className="h-3 w-3 rounded-full"
            style={{
              background: '#ffb4ab',
              boxShadow: '0 0 12px rgba(255,180,171,0.9)',
            }}
          />
        </div>
        <span className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-[rgba(208,197,175,0.9)]">
          START
        </span>
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-1 rounded-full border opacity-0"
        style={{
          borderColor: 'rgba(212,175,55,0.2)',
          boxShadow: '0 0 20px rgba(212,175,55,0.15)',
        }}
      />
    </button>
  );
}

