import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../../store/useAppStore';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const { isLoaded } = useAppStore();

  useEffect(() => {
    if (!isLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Title fade in
      tl.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
      });

      // Subtitle fade in
      tl.from(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

      // Gold line fade in
      tl.from(
        lineRef.current,
        {
          scaleX: 0,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Scroll indicator bounce
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        duration: 1,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <section
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '12vh',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Main Title */}
      <h1
        ref={titleRef}
        className="font-display"
        style={{
          fontSize: 'clamp(48px, 14vw, 120px)',
          fontWeight: 300,
          letterSpacing: '0.25em',
          color: 'var(--cream)',
          textTransform: 'uppercase',
          margin: 0,
          lineHeight: 1,
        }}
      >
        UTOPIA
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="font-mono"
        style={{
          fontSize: 'clamp(10px, 1.5vw, 11px)',
          letterSpacing: '0.35em',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          marginTop: '16px',
          marginBottom: 0,
        }}
      >
        PAGANI · 2023 · ONLY 99
      </p>

      {/* Gold Line */}
      <div
        ref={lineRef}
        style={{
          width: '60px',
          height: '1px',
          background: 'var(--gold)',
          marginTop: '20px',
          transformOrigin: 'center',
        }}
      />

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span>Scroll</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
